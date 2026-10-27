"""Erzeugt Makro-Platzhalterbilder (Sand, Muschel, Strick …) in den wohlii-Farben.

Die Bilder sind bewusst als PLATZHALTER gedacht und werden durch echte
Makro-Fotografien ersetzt. Aufruf:  python3 tools/make_placeholders.py
Benötigt: pip install pillow numpy
"""
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1200, 900
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img", "macro")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def dof(img, focus_y=0.55, spread=0.28, radius=14):
    """Makro-Tiefenschärfe: scharfer Streifen, oben/unten weich."""
    blurred = img.filter(ImageFilter.GaussianBlur(radius))
    y = np.linspace(0, 1, img.height)[:, None]
    m = np.clip(np.abs(y - focus_y) / spread, 0, 1) ** 1.6
    mask = Image.fromarray((np.repeat(m, img.width, axis=1) * 255).astype("uint8"))
    return Image.composite(blurred, img, mask)


def vignette(img, strength=0.35, tint=(40, 38, 34)):
    y, x = np.mgrid[0:img.height, 0:img.width]
    d = np.sqrt(((x - img.width / 2) / (img.width / 2)) ** 2 + ((y - img.height / 2) / (img.height / 2)) ** 2)
    m = np.clip((d - 0.55) / 0.9, 0, 1) * strength
    arr = np.asarray(img).astype(float)
    arr = arr * (1 - m[..., None]) + np.array(tint) * m[..., None]
    return Image.fromarray(arr.clip(0, 255).astype("uint8"))


def grain(img, amount=6):
    arr = np.asarray(img).astype(float)
    arr += rng.normal(0, amount, arr.shape[:2])[..., None]
    return Image.fromarray(arr.clip(0, 255).astype("uint8"))


def save(img, name):
    img.convert("RGB").save(os.path.join(OUT, name + ".jpg"), quality=78, optimize=True, progressive=True)


def sand():
    base = np.array(hex2rgb("#E6D3AE"), float)
    arr = np.ones((H, W, 3)) * base
    n = rng.normal(0, 1, (H, W))
    arr += n[..., None] * np.array([22, 20, 16])
    img = Image.fromarray(arr.clip(0, 255).astype("uint8"))
    d = ImageDraw.Draw(img)
    for _ in range(2600):
        x, y = rng.integers(0, W), rng.integers(0, H)
        r = rng.integers(2, 7)
        c = tuple(int(v) for v in base + rng.normal(0, 22) + rng.normal(0, 4, 3))
        d.ellipse([x - r, y - r, x + r, y + r], fill=c)
    for _ in range(40):  # Glitzernde Quarzkörner
        x, y = rng.integers(0, W), rng.integers(0, H)
        d.ellipse([x - 3, y - 3, x + 3, y + 3], fill=(255, 250, 235))
    img = img.filter(ImageFilter.GaussianBlur(0.8))
    return grain(vignette(dof(img, 0.6, 0.3, 10)), 4)


def shell():
    img = Image.new("RGB", (W, H), hex2rgb("#F3E6DA"))
    d = ImageDraw.Draw(img)
    cx, cy = W * 0.5, H * 1.05
    for i in range(34):
        a0 = math.radians(200 + i * 4.2)
        a1 = a0 + math.radians(3.4)
        col = [hex2rgb("#D9857A"), hex2rgb("#EBB7A6"), hex2rgb("#F6DCCD")][i % 3]
        pts = [(cx, cy)]
        for t in np.linspace(a0, a1, 8):
            pts.append((cx + math.cos(t) * 1150, cy + math.sin(t) * 1150))
        d.polygon(pts, fill=col)
    for r in range(120, 1150, 46):  # Wachstumsringe
        d.arc([cx - r, cy - r, cx + r, cy + r], 190, 350, fill=(250, 240, 232), width=3)
    img = img.filter(ImageFilter.GaussianBlur(1.6))
    return grain(vignette(dof(img, 0.45, 0.3, 16), 0.3), 5)


def knit():
    img = Image.new("RGB", (W, H), hex2rgb("#B8862A"))
    sw, sh = 64, 56
    for row in range(-1, H // sh + 2):
        for col in range(-1, W // sw + 2):
            x, y = col * sw, row * sh
            for side, ang in ((0, 28), (1, -28)):
                tile = Image.new("RGBA", (60, 90), (0, 0, 0, 0))
                td = ImageDraw.Draw(tile)
                c = tuple(int(v) for v in np.array(hex2rgb("#E3B24F")) + rng.normal(0, 9) + side * 14)
                td.ellipse([12, 4, 48, 86], fill=c + (255,))
                td.ellipse([22, 14, 34, 70], fill=tuple(min(255, v + 22) for v in c) + (180,))
                tile = tile.rotate(ang, expand=True, resample=Image.BICUBIC)
                img.paste(tile, (int(x + side * sw / 2 - 18), int(y - 20)), tile)
    img = img.filter(ImageFilter.GaussianBlur(1.3))
    return grain(vignette(dof(img, 0.5, 0.28, 14), 0.4), 6)


def leaf():
    img = Image.new("RGB", (W, H), hex2rgb("#4E7F68"))
    arr = np.asarray(img).astype(float)
    y, x = np.mgrid[0:H, 0:W]
    arr += (np.sin(x / 90) * 8)[..., None]
    img = Image.fromarray(arr.clip(0, 255).astype("uint8"))
    d = ImageDraw.Draw(img)
    d.line([(-50, H * 0.85), (W + 50, H * 0.25)], fill=hex2rgb("#A9C7AE"), width=16)
    for i in range(14):
        t = i / 13
        sx, sy = -50 + t * (W + 100), H * 0.85 - t * H * 0.6
        for s in (-1, 1):
            ex, ey = sx + 260, sy + s * 300 - 120
            d.line([(sx, sy), (ex, ey)], fill=hex2rgb("#86AE93"), width=6)
            for j in range(5):
                u = (j + 1) / 6
                px, py = sx + (ex - sx) * u, sy + (ey - sy) * u
                d.line([(px, py), (px + 70, py + s * 30)], fill=hex2rgb("#6E9A80"), width=2)
    img = img.filter(ImageFilter.GaussianBlur(1.4))
    return grain(vignette(dof(img, 0.5, 0.25, 18), 0.4, (20, 40, 30)), 5)


def bokeh(bg, cols, name_count=70, blur=10):
    """Weiches Makro-Bokeh: zwei Ebenen, hinten sehr unscharf, vorn einzelne Lichtscheiben."""
    img = Image.new("RGB", (W, H), hex2rgb(bg))
    for count, rmin, rmax, bl, amin, amax in ((name_count, 60, 220, blur * 3, 50, 120), (name_count // 3, 25, 70, max(3, blur // 3), 90, 170)):
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        for _ in range(count):
            x, y = rng.integers(-60, W + 60), rng.integers(-60, H + 60)
            r = int(rng.integers(rmin, rmax))
            c = hex2rgb(cols[rng.integers(0, len(cols))])
            d.ellipse([x - r, y - r, x + r, y + r], fill=c + (int(rng.integers(amin, amax)),))
        layer = layer.filter(ImageFilter.GaussianBlur(bl))
        img.paste(layer, (0, 0), layer)
    return grain(vignette(img, 0.25), 3)


def wood():
    y, x = np.mgrid[0:H, 0:W].astype(float)
    n = np.cumsum(rng.normal(0, 1, W)) * 0.8
    rings = np.sin((y + n[None, :] * 3 + np.sin(x / 140) * 30) / 9)
    base = np.array(hex2rgb("#B7B0A4"), float)
    arr = base + rings[..., None] * np.array([18, 17, 15]) + rng.normal(0, 4, (H, W))[..., None]
    img = Image.fromarray(arr.clip(0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1))
    return grain(vignette(dof(img, 0.5, 0.3, 12), 0.35), 4)


def grass():
    img = Image.new("RGB", (W, H), hex2rgb("#EFE9D6"))
    d = ImageDraw.Draw(img)
    for _ in range(90):
        x = rng.integers(0, W)
        bend = rng.normal(0, 80)
        c = [hex2rgb("#A9B98C"), hex2rgb("#C9C08A"), hex2rgb("#8FA27A")][rng.integers(0, 3)]
        pts = [(x + bend * (t ** 2), H - t * rng.integers(400, 900)) for t in np.linspace(0, 1, 10)]
        d.line(pts, fill=c, width=int(rng.integers(3, 8)))
    img = img.filter(ImageFilter.GaussianBlur(2))
    fore = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fore)
    fd.line([(W * 0.62, H), (W * 0.58, H * 0.35), (W * 0.52, 0)], fill=hex2rgb("#6F8E62") + (255,), width=10)
    for k in range(12):  # Samenrispe
        yy = H * 0.1 + k * 26
        fd.ellipse([W * 0.53 + k * 2 - 14, yy, W * 0.53 + k * 2 + 14, yy + 34], fill=hex2rgb("#D9C58A") + (255,))
    img.paste(fore.filter(ImageFilter.GaussianBlur(1)), (0, 0), fore.filter(ImageFilter.GaussianBlur(1)))
    return grain(vignette(img, 0.25), 4)


def pebbles():
    img = Image.new("RGB", (W, H), hex2rgb("#9C968C"))
    d = ImageDraw.Draw(img)
    for _ in range(160):
        x, y = rng.integers(-40, W + 40), rng.integers(-40, H + 40)
        rx, ry = rng.integers(40, 110), rng.integers(30, 80)
        g = int(rng.integers(150, 225))
        c = (g, g - 4, g - 10)
        d.ellipse([x - rx, y - ry, x + rx, y + ry], fill=c, outline=(120, 116, 108), width=4)
        d.ellipse([x - rx * 0.5, y - ry * 0.7, x, y - ry * 0.2], fill=(min(g + 18, 255),) * 3)
    img = img.filter(ImageFilter.GaussianBlur(2.2))
    return grain(vignette(dof(img, 0.55, 0.3, 12), 0.4), 5)


def linen():
    y, x = np.mgrid[0:H, 0:W].astype(float)
    warp = np.sin(x / 2.6) * 0.5 + 0.5
    weft = np.sin(y / 2.6) * 0.5 + 0.5
    irregular = np.cumsum(rng.normal(0, 1, W))[None, :] * 0.2
    base = np.array(hex2rgb("#E4E0D6"), float)
    arr = base + ((warp * weft) - 0.25)[..., None] * 30 + (irregular % 6)[..., None] - 3
    img = Image.fromarray(arr.clip(0, 255).astype("uint8"))
    return grain(vignette(dof(img, 0.5, 0.3, 8), 0.3), 3)


MOTIFS = {
    "sand": sand,
    "muschel": shell,
    "strick": knit,
    "blatt": leaf,
    "gischt": lambda: bokeh("#DCE6E3", ["#FFFFFF", "#BCD3CC", "#E8D58C"], 80, 9),
    "seeglas": lambda: bokeh("#4E7F68", ["#A9C7AE", "#E8D58C", "#F5EFD8"], 60, 12),
    "treibholz": wood,
    "duenengras": grass,
    "kiesel": pebbles,
    "leinen": linen,
    "abendlicht": lambda: bokeh("#E3B24F", ["#F6DFA0", "#D9857A", "#FFF5DA"], 70, 14),
    "koralle": lambda: bokeh("#EBC2B6", ["#D9857A", "#FFFFFF", "#E8D58C"], 70, 11),
}

if __name__ == "__main__":
    for name, fn in MOTIFS.items():
        save(fn(), name)
        print("ok", name)
