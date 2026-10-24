import re
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Falta o Pillow. Instala com:  pip3 install pillow")

RAIZ = Path(__file__).resolve().parent.parent
ORIGINAIS = RAIZ / "fotos-originais"
DESTINO = RAIZ / "materials" / "images" / "countries"
GALERIA = RAIZ / "galerie.html"
LADO_MAXIMO = 900
EXTENSOES = {".jpg", ".jpeg", ".png", ".webp"}


def otimizar(origem, destino):
    imagem = ImageOps.exif_transpose(Image.open(origem)).convert("RGB")
    imagem.thumbnail((LADO_MAXIMO, LADO_MAXIMO))
    imagem.save(destino, quality=78, optimize=True, progressive=True)


def processar_originais():
    if not ORIGINAIS.is_dir():
        return
    for pasta in sorted(p for p in ORIGINAIS.iterdir() if p.is_dir() and not p.name.startswith("_")):
        fotos = sorted(f for f in pasta.iterdir() if f.suffix.lower() in EXTENSOES)
        if not fotos:
            continue
        saida = DESTINO / pasta.name
        if saida.exists():
            shutil.rmtree(saida)
        saida.mkdir(parents=True)
        for numero, foto in enumerate(fotos, start=1):
            otimizar(foto, saida / f"{numero:02d}.jpg")
        print(f"{pasta.name}: {len(fotos)} fotografias")


def imagens_html(destino, nome):
    fotos = sorted((DESTINO / destino).glob("*.jpg"))
    linhas = []
    for numero, foto in enumerate(fotos, start=1):
        largura, altura = Image.open(foto).size
        linhas.append(
            f'          <img class="galerie-photo" src="materials/images/countries/{destino}/{foto.name}" '
            f'alt="{nome} — fotografia {numero} de {len(fotos)}" '
            f'width="{largura}" height="{altura}" loading="lazy" decoding="async">'
        )
    return "\n" + "\n".join(linhas) + "\n        "


def atualizar_galeria():
    html = GALERIA.read_text(encoding="utf-8")

    def substituir(m):
        destino = m.group(1)
        titulo = re.search(rf'id="titulo-{destino}">([^<]+)<', html)
        nome = titulo.group(1).capitalize() if titulo else destino
        return f'<div class="photos-container" data-fotos="{destino}">{imagens_html(destino, nome)}</div>'

    novo = re.sub(r'<div class="photos-container" data-fotos="(\w+)">.*?</div>', substituir, html, flags=re.S)
    GALERIA.write_text(novo, encoding="utf-8")


processar_originais()
atualizar_galeria()
print("galerie.html atualizada.")
