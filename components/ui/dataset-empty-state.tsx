export function DatasetEmptyState({ title, description, headingLevel: Heading }: {
  title: string;
  description: string;
  headingLevel: "h2" | "h3";
}) {
  return (
    <section className="rounded-lg border bg-card px-6 py-16 text-center text-card-foreground">
      <Heading className="text-lg font-semibold">{title}</Heading>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </section>
  );
}
