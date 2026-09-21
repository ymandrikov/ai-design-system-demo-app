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
    <section className="rounded-m border-(length:--border-width) bg-card px-2xl py-6xl text-center text-card-foreground">
      <Heading className="text-l font-semibold">{title}</Heading>
      <p className="mt-m text-s text-muted-foreground">{description}</p>
    </section>
  );
}
