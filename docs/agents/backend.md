# Backend

Read for business operations, external integrations, and transport adapters.

Keep business rules independent of transport and persistence. Handlers parse input,
call an operation, and map the result. Introduce a separate domain module when there
is business behavior to put there; an empty layer is not required.

Validate external inputs at boundaries. Keep expected failures distinguishable from
unexpected errors. Do not report a failed operation as success or expose secrets in
errors. Make time and external services controllable when tests need them.

Use the language conventions linked from AGENTS.md and [testing guidance](testing.md).
The active storage and runtime choices belong in ADRs. No database, event journal,
LLM provider, or deployment service is assumed by this base profile.
