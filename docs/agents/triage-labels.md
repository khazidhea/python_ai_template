# Triage labels

Every triaged ticket has exactly one category and one state. There are no project labels — the `Labels` line is always `None`.

## Categories

| Category | Meaning |
| --- | --- |
| `bug` | Existing behavior is broken or violates an established requirement |
| `enhancement` | New behavior or an improvement to existing behavior |

## States

| State | Meaning |
| --- | --- |
| `needs-triage` | A maintainer needs to evaluate the ticket |
| `needs-info` | More information or a product decision is required |
| `ready-for-agent` | Fully specified and ready for an agent |
| `ready-for-human` | Requires human judgment, access, or implementation |
| `wontfix` | Deliberately will not be actioned |
| `in-progress` | Implementation is actively underway |
| `blocked` | Work started but cannot proceed until a recorded blocker is resolved |
| `done` | Acceptance criteria are met and verification is recorded |

The canonical triage flow is:

`needs-triage` → `needs-info` | `ready-for-agent` | `ready-for-human` | `wontfix`

Execution adds:

`ready-for-agent` → `in-progress` → `blocked` | `done`

When a state changes, update the ticket's `State` field and append the transition with its reason to `History`. `node scripts/tickets.mjs set-state <id> <state> --note "<reason>"` does both in one step.

## Who applies them

Category and the first state are applied by the `triage` skill when a ticket is triaged, or by `to-tickets` when it slices a spec into tickets — tickets it writes are agent-grabbable by construction, so they land in `ready-for-agent`. Later states are applied by whoever moves the work: the implementing thread sets `in-progress` when it picks a ticket up and `blocked` when it cannot finish; `done` is set after the work is merged and verified.

`done` and `wontfix` are the closed states; every other state is open. Which field each label is written to, and where triage's briefs and notes go, is in `docs/agents/ticket-tracker.md` under "Where triage output goes".
