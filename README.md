# mTravel

O mTravel é o meu diário de viagens: reúne num só lugar as fotografias, as datas e a música (playlist) de cada destino.
HTML, SCSS e JavaScript, sem bibliotecas. **Cada página é um ficheiro HTML.**

Site: https://markmusl.github.io/mTravel/

## Estrutura

```
mTravel/
├── index.html           página inicial: apresentação, "sobre" e lista de destinos
├── galerie.html         galeria: uma secção por destino (texto, fonte, playlist, fotografias)
├── mapa.html            mapa-múndi clicável e tabela das viagens
├── registration.html    entrar / criar conta (simulação, sem servidor)
├── styles/scss/         estilos em SCSS (abstracts, base, components, layout, main)
│   └── main/styles.css  CSS compilado, usado pelas páginas
├── scripts/
│   ├── playlist.js      abre e fecha o leitor da playlist
│   └── registration.js  os três passos do formulário
├── materials/           fonte, ícones, imagens e fotografias
└── tools/               atualizar-fotos.py (ferramenta opcional)
```

Abre-se com duplo clique em `index.html` ou com Live Server.

## SCSS

`styles/scss/main/styles.scss` é compilado para `styles.css` (extensão Live Sass Compiler).
Há dois tipos de botão: `.button` (preto) e `.liquid-button` (vidro).

## Adicionar fotografias

1. `pip3 install pillow` (uma vez)
2. Pôr os originais em `fotos-originais/<destino>/` (o nome da pasta é o `id` da secção em `galerie.html`)
3. `python3 tools/atualizar-fotos.py`

As fotografias ficam com 900 px, sem metadados (incluindo GPS), e as linhas `<img>` são escritas dentro de
`<div class="photos-container" data-fotos="destino">`. A pasta `fotos-originais/` não vai para o GitHub.

## Funcionalidades HTML aplicadas

| Tema | Onde |
|---|---|
| Estrutura da página, `lang`, `meta`, `title` | todas as páginas |
| Ligações relativas, âncoras (`#id`) e externas | navbar, botões dos destinos, fontes, rodapé |
| Listas | lista de destinos em `index.html` |
| Imagens (`alt`, `width`, `height`, `loading`) | galeria, logótipo |
| Imagem de fundo e cores | cartão da página inicial, degradados |
| Tabelas (`caption`, `thead`, `tbody`, `tfoot`, `th scope`, `colspan`) | `mapa.html` |
| Mapa de imagem (`<map>`, `<area>`, `usemap`) | `mapa.html` |
| Frames (`<iframe>`) | leitor de playlist (Apple Music) |
| Formulários | `registration.html` |

## Fontes e referências

Cada secção da galeria tem a ligação "fonte" (Wikipédia).
Mapa-múndi: Al MacDonald, Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) (cores e pontos adicionados).
Fotografias e design: Mark Muslimov. Fonte tipográfica: ABC Favorit (versão trial).

## Validação

O HTML foi validado com o Nu Html Checker do W3C, sem erros. O CSS usa `@view-transition` (mudança suave entre páginas),
que o validador de CSS ainda não conhece.