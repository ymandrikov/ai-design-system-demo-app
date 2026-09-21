export function DatasetEmptyState({
  title,
  description,
  headingLevel: Heading,
}: {
  title: string;
  description: string;
  headingLevel: "h2" | "h3";
}) {
  return (
    <section className="rounded-md border bg-canvas-card px-2xl py-6xl text-center text-content-card">
      <Heading className="text-md font-semibold">{title}</Heading>
      <p className="mt-md text-sm text-content-subtle">{description}</p>
    </section>
  );
}
