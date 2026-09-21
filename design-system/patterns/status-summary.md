---
id: status-summary
description: Understand a service's current condition or a deployment's recorded status before inspecting its supporting metadata and consequences.
status: discoverable
sources: []
---

# Status summary

## When to use

All criteria must hold:

- The user inspects one service in one environment or one deployment before consulting its detailed history or stages.
- Status and version answer the primary question; metadata provides supporting context rather than equally important metrics.

## When not to use

- Comparing multiple services or deployments: use [Table](../components/table.md).
- Selecting a version or confirming an action: use the form or [modal confirmation](modal-confirmation.md) rather than a read-only summary.

## Structure

Inside a named [PageContent section](../layouts/page-content.md), use
[StatusSummaryLayout](../layouts/status-summary-layout.md) for one neutral surface
with two levels in source order:

1. Primary description list: status first, version second. Use
   [DescriptionItem](../components/description-item.md), plain text for service state
   or active stage, [DeploymentResult](../components/deployment-result.md) for a
   completed outcome and [VersionLabel](../components/version-label.md) for a version.
2. Supporting region, separated by a top border: metadata and contextual links.
   Use a native inline `dt`/`dd` pair for the service's last completed deployment;
   its value groups the result, timestamp and link. Deployment metadata reuses
   DescriptionItem. An optional consequence sentence follows the metadata it explains.

Service recipe: `Service state / Healthy` and `Current version / v1.1.0`, then
`Last completed deployment / Failed / completion time / View deployment #42`.
Deployment recipe: `Deployment status / Failed` and `Version / v1.2.0`, then commit,
duration, start/completion times, version description and an optional source link.
Use [TextLink](../components/text-link.md) in its default role for contextual navigation.

## Composition

### Required

- StatusSummaryLayout owns the surface, primary dl, region padding and divider.
  Pass primary DescriptionItem siblings through `primary` and supporting content
  through `children`. Pages own data and the contents of both regions; the layout
  performs no status inference. Keep existing semantic colours.
- Primary fields use a wrapping flex row with `gap-4xl`; retain the label
  styling and label/value spacing owned by DescriptionItem. Emphasise plain primary
  values with `text-l font-semibold`. Keep composed badges' own typography.
- Supporting text is `text-s`; supporting labels and timestamps use
  `text-muted-foreground`. Keep linked text readable and preserve visible focus.
  Use wrapping metadata rows, `gap-x-xl gap-y-m` for inline context and
  `gap-4xl` for description lists. Long commits wrap; do not truncate values.
- Identify service health separately from deployment outcome. An error badge must
  not colour the entire surface or imply that the service is unavailable.
- Service summaries show the last **completed** deployment, even while another is
  active. Its result, completion time and destination must refer to the same record.
  Active progress stays in history. Missing history displays `No completed deployments`.
- Show an explanation in the service summary only for a failed last attempt:
  `Deployment failed. Current version unchanged.` when a current version exists;
  `Deployment failed. No version is deployed.` when none exists. Never equate the
  presence of a version with service health.
- Deployment details describe that attempt's historical effect: failure did not
  change the environment's current version; success updated it when the attempt
  completed. Do not infer the version at failure from today's environment state.
- Preserve explicit empty states, sentence case, native description-list semantics
  and DOM reading order. Only the deployment status has a polite live region;
  do not announce ticking duration or the whole summary.
- Keep page-level actions in PageHeader. On narrow screens, wrap in source order
  without horizontal page overflow; all context stays visible.

### Recommendations

Prefer absolute UTC timestamps with native `time` elements for reproducible event
identification. Remove redundant explanatory text before shrinking type or spacing.

The hierarchy is a design hypothesis informed by
[perceptual grouping research](https://pubmed.ncbi.nlm.nih.gov/1516361/) and
[NN/G's eye-tracking observations](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/).
These sources support grouping and scanning, not the superiority of this specific
composition or an optimal pixel size.

### Exceptions

None. Forms, tables and confirmation dialogs retain their own composition rules.

## Verification

Check a healthy service after failure, a successful last attempt, no history, failure
before a first successful deployment and an active attempt following failure.
For deployment details check active, succeeded and failed attempts, including an old
failed attempt after a later success. Confirm link, timestamp and result identity.
Reject a summary that presents `Failed` as service health, labels an attempted version
as current, or claims a working version existed without evidence.

Inspect both themes at desktop and narrow widths: text wraps, primary data comes
first, labels remain associated with values, focus is visible and no summary content
overflows the page. Run the project's lint, type and build checks.
For a human comparison against the previous design, measure answer correctness and
time to identify service health, current version, failed attempt and its details link.
Do not claim improved usability from code or browser checks alone.
