# AI design system demo open gaps

Keep unresolved system gaps here. Move closed entries in full to
[the archive](gaps-archive.md), including disposition, closure date and evidence
demonstrating the original expected result.

## Open gaps

### Tabs panel focus is invisible

- Status: Open; recorded 2026-09-16.
- Request: document and verify the newly installed Tabs component for design-system use.
- Source: `components/ui/tabs.tsx`, `TabsContent`; [contract](components/tabs.md).
- Expected: keyboard users can see focus when Tab moves from a trigger into its
  active panel; Tabs can become discoverable after its admission checks pass.
- Actual: the active panel receives focus (`role="tabpanel"`, `tabIndex=0`), but
  `outline-none` removes the indicator and no box shadow replaces it.
- Evidence: local Next.js preview, Chromium, horizontal default variant. Select
  a panel containing plain text with Enter, then press Tab. `document.activeElement`
  is that panel; computed outline style is `none` and box shadow is `none`.
  The rendered screenshot also shows no focus marker. The same shared class applies
  to both orientations and themes. The temporary preview was removed after checks.
- Assessment: C — requires a shared focus-style change in TabsContent; source
  inspection and a reproducible keyboard preview establish the required change.
- Owner decision (2026-09-16): explicitly requested `discoverable` despite this
  reported defect. Admission is granted; the original focus expectation remains
  unmet and this gap stays open.
- Next: authorised craft repair of panel focus, repeat the keyboard check in both
  themes and complete remaining checks in [adoption progress](adoption.md).
