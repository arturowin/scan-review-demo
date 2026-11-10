# scan-review-demo

> [!WARNING]
> **Do not run `npm install` in this repository.** It is a test fixture: the lockfile deliberately pins
> known-vulnerable package versions and one **known-malicious** package (`flatmap-stream@0.1.1`, the
> 2018 event-stream incident). That version was removed from npm, so install would fail anyway, and
> `.npmrc` disables install scripts, but nothing here is meant to run.

Fixture repository for **AI Scan Review**. Only `package.json` and `package-lock.json` (v3) matter;
there is no application code. Each dependency was chosen from real OSV data to exercise one case:

| Case | Entry | Expected in the report |
|---|---|---|
| Malicious package | `flatmap-stream@0.1.1` (direct) | Ranked first. Action: remove, check how it got in, rotate secrets. No upgrade suggested. Lockfile entry has no `resolved`/`integrity` (real values unknown, never invented). |
| Direct vulnerable dependency with a fix | `lodash@4.17.20` | Candidate `4.17.21` |
| Transitive vulnerable dependency | `qs@6.7.0` via `express@4.17.1` and `body-parser` | Names `express` as the direct dependency that pulls it in |
| Several advisories, one needs a major jump | `postcss@7.0.35` | `7.0.36` addresses some advisories; others need `8.x` (flagged as a major jump) |
| Advisory with no fix | `request@2.88.2` (`last_affected`) | "No fixed version published" guidance |
| Dev dependency | `minimist@1.2.0` (devDependencies) | Critical advisory, ranked after runtime findings of the same severity |
| Workspace package | `packages/internal-utils` (`link: true`) | Skipped: not counted as checked or unchecked |
| Git dependency | `slash` from `github:sindresorhus/slash#v5.1.0` | Listed as unchecked: `unsupported_source` |

Advisory data changes over time, so exact counts in a report will drift.
