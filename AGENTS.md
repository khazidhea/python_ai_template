# Engineering instructions

Read CONTEXT.md for product vocabulary and relevant records in docs/adr/ before
changing architecture. Read a document once per task unless it changes.

Explain unfamiliar project identifiers when first mentioning them to the user.
Keep changes within the requested scope and preserve unrelated work.
Prefer a working vertical slice and existing tools over speculative abstractions.
Code, checks, and the documentation describing changed behavior travel together.

## Read according to the task

- Business operations, adapters, or integrations: [backend](docs/agents/backend.md).
- Python implementation and dependencies: [Python](docs/agents/python.md).
- Tests and verification: [testing](docs/agents/testing.md).
- Installing or updating skills: [skill management](docs/agents/skills.md).
- Unfamiliar libraries or uncertain APIs: [local library sources](docs/agents/library-sources.md).
- Working with tickets: [ticket tracker](docs/agents/ticket-tracker.md) and [states](docs/agents/triage-labels.md).
- Machine-specific command setup: untracked AGENTS.local.md, if present.

## Documentation

Keep shared working rules and task links here; substantial task-specific guidance
belongs in `docs/agents/`. `CLAUDE.md` is a relative symlink to this file.

- `CONTEXT.md`: product purpose, users, vocabulary, workflows and invariants.
- `README.md`: installation and runnable entrypoints.
- `docs/adr/NNNN-slug.md`: Status / Context / Decision / Consequences for meaningful
  architectural choices. New decisions preserve earlier records; small fixes need no ADR.

Version `.project-kit/state.json`; update its template baselines through Project Kit.
Application source, product context, ADRs and skills belong to the project after creation.

## Skills

Before writing code, read `.agents/skills/ponytail/SKILL.md`.
For features, fixes, or observable behavior changes, read `.agents/skills/tdd/SKILL.md`.
Load codebase-design and domain-modeling when a skill or the user calls for them.
Project skills are invoked deliberately through these conditions or by user request;
preserve their Claude and Codex invocation switches when updating them.

Tickets are local Markdown files under `docs/tickets/`. When changing ticket state,
update its file in the same pass, preferably with `node scripts/tickets.mjs`.

Prompt wording is not unit-tested. Test structural contracts that code reads and
use evaluations for model behavior. Paid/network evaluations require the user's
authorization and remain separate from the unit-test gate.

Run `uv run check_quality` after changing code or tool configuration.
Use focused checks while iterating. Keep paid/network evaluations separate from unit tests.
