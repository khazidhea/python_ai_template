# python-ai-template

```sh
uv sync
uv run python-ai-template
uv run check_quality
```

Commit the generated `uv.lock`; subsequent environments and CI use `uv sync --locked`.
AGENTS.md routes coding instructions; CONTEXT.md describes the product.
Installed starter modules and their update baselines are in `.project-kit/state.json`.
When the aiogram module is present, see `docs/agents/aiogram.md` for its entrypoint.
