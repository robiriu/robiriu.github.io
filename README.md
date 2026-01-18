# Robiriu Labs Portfolio

Professional portfolio website built with MkDocs Material theme, showcasing AI research, projects, and publications.

## Local Development

### Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install mkdocs mkdocs-material
```

3. Serve locally:
```bash
mkdocs serve
```

Visit `http://127.0.0.1:8000` in your browser.

## Deployment

Automatically deploys to GitHub Pages on push to `main` branch.

Manual deployment:
```bash
mkdocs gh-deploy
```

## Adding Content

- Projects: `docs/projects/`
- Blog posts: `docs/blog/`
- Update navigation in `mkdocs.yml`

© 2022-2026 Robi Dany Riupassa
