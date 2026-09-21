# AI design system demo open gaps

Keep unresolved system gaps here. Move closed entries in full to
[the archive](gaps-archive.md), including disposition, closure date and evidence
demonstrating the original expected result.

## Open gaps

None.

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
