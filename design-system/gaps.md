# AI design system demo open gaps

Keep unresolved system gaps here. Move closed entries in full to
[the archive](gaps-archive.md), including disposition, closure date and evidence
demonstrating the original expected result.

## Open gaps

### G-01 Deployment outcome text uses a raw colour

- Status: Open; recorded 2026-09-21 at the owner's request.
- Source: `app/deployments/[id]/page.tsx`, the conditional outcome explanation.
- User need: keep the historical outcome explanation visually secondary to the
  deployment's status and version. The reason for choosing exactly `#777` is not
  recorded in the diff.
- Actual result: `text-content-subtle` is replaced with `text-[#777]`, suppressing
  `design/no-raw-color` for that paragraph. The fixed value applies in both themes.
- Expected result: express the intended secondary text treatment through an agreed
  semantic colour role, with readable light/dark values and no rule suppression.
- Affected rules: DESIGN.md requires semantic colour utilities and both themes;
  [status summary](patterns/status-summary.md) prescribes `content-subtle` for
  supporting text. This local override is not a new shared colour rule.
- Evidence: the git diff replaces the existing semantic utility; the
  [token source](tokens/semantic.css) already defines `--color-content-subtle`
  with `light-dark()`. The suppression bypasses literal-colour enforcement.
- Assessment: C — evidence does not establish whether the intended result is the
  existing subtle role, a change to that role, or a distinct semantic role. A shared
  colour decision requires craft scope; recording does not settle it.
- Authority and next step: the owner supplied the override and requested its gap
  record. Clarify the intended role and theme behaviour before changing tokens or
  removing the override. Visual/contrast verification remains part of that repair.

### G-02 VersionLabel overrides Badge background

- Status: Open; recorded 2026-09-21 at the owner's request.
- Source: `components/deployments/version-label.tsx`, the nested secondary Badge.
- User need: display a recorded version as a compact code annotation. The diff
  selects a muted background; its intended distinction from other secondary badges
  is not documented.
- Actual result: `className="bg-container-muted"` overrides Badge's `bg-container`
  while suppressing `design/no-component-color-override`. This affects every
  VersionLabel consumer, including summaries, tables and deployment dialogs.
- Expected result: express the intended version-label treatment through the
  component's agreed styling responsibilities and public API, without suppressing
  component colour ownership.
- Affected rules: [Badge](components/badge.md) owns its colours and limits consumer
  classes to layout; [VersionLabel](components/version-label.md) promises Badge's
  secondary surface. Its current source no longer matches that contract snapshot.
- Evidence: Badge's secondary variant uses `bg-container text-content-secondary`;
  `bg-container-muted` is an existing semantic token, so the issue is the component
  override, not a missing token or raw colour. Both tokens already have theme values.
- Assessment: C — retaining a distinct version background requires a shared styling
  or contract decision; the diff alone does not establish that all secondary badges
  should change or that Badge needs another variant.
- Authority and next step: the owner supplied the override and requested its gap
  record. Decide which component owns the desired treatment before a craft repair;
  retain the unresolved contract drift rather than refreshing its source hash.

## Active exceptions

### E-01 Deployment supporting typography

- Source: `app/deployments/[id]/page.tsx`, supporting `BorderedCard.Section`.
- Need and expected result: keep metadata and explanations visually secondary at
  14px while removing the typography-only wrapper.
- Actual result: Section uses `designSystemException.className: "text-sm"` and
  retains its own 16px padding and gap.
- Affected rule: Section inherits typography by default; local styling overrides
  require its named escape hatch, a meaningful reason and this journal entry.
- Reason: preserve the existing summary hierarchy directly on the section.
- Approval: explicitly requested by the owner on 2026-09-21 for this deployment use.
- Evidence: the consumer supplies `text-sm` through `withDesignSystemException`;
  the helper adds no wrapper, and Section merges classes after its defaults.
