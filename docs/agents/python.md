# Python

Use uv for the interpreter and dependencies. The requested interpreter is in
`.python-version`, supported versions in `pyproject.toml`, resolved packages in `uv.lock`.
After dependency changes run `uv lock`, `uv sync --locked`, and the quality gate.

Keep application code under `src/python_ai_template/`. Use typed public interfaces and
explicit errors. Add configuration validation at startup when configuration exists.
Ruff handles formatting, imports, and general lint rules. Flake8 uses the shared
Biohayat/Oljas profile in `setup.cfg`, including WPS limits and explicit test exceptions.
ty checks production code. Fix causes before
adding suppressions; explain necessary exceptions beside the affected code.

Use `uv run check_quality` for the complete gate. The application and gate
use Python; Node/npm is used by skill management and the optional local ticket CLI.
Add async tools, providers, and database libraries only with their feature.
