# 0001: Python foundation

## Status
Accepted

## Context
The project needs reproducible Python tooling and concise instructions for coding agents.

## Decision
Use Python 3.14.7 with uv, a src package, Ruff, wemake-python-styleguide,
ty, and pytest. Keep product context separate from engineering instructions.
The initial application has no frontend, persistence, deployment, or LLM dependency.

## Consequences
Commit uv.lock after resolving dependencies. New integrations bring their own
configuration, verification, and documentation. Infrastructure is chosen when required.
