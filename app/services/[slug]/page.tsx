import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { NavigationalTabs } from "@/components/ui/navigational-tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Table } from "@/components/ui/table";
import { getServiceDetails } from "@/lib/db/queries";
import { environments } from "@/lib/db/schema";
import { dateFormat, stateLabels } from "@/lib/deployments/presentation";

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} | Deploy Board`, description: "Service health, current version, and deployment history." };
}

export default async function ServicePage({ params, searchParams }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const environment = query.environment === "staging" ? "staging" : "production";
  const service = getServiceDetails(slug, environment);
  if (!service) notFound();
  const pathname = `/services/${encodeURIComponent(service.slug)}`;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
      <p className="mb-12 text-sm font-semibold tracking-tight">Deploy Board <span className="ml-2 font-normal text-muted-foreground">/ Local demo</span></p>
      <nav aria-label="Back to services" className="mb-6 text-sm">
        <Link href={`/?environment=${environment}`} className="text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">← Services</Link>
      </nav>
      <div className="mb-8">
        <PageHeader title={service.name} description={`Service health and deployment history in ${environment}.`} controls={
          <NavigationalTabs label="Environment" currentHref={`${pathname}?environment=${environment}`} items={environments.map((value) => ({ href: `${pathname}?environment=${value}`, label: value }))} />
        } />
      </div>
      <section aria-label="Service summary" className="mb-10 rounded-lg border bg-card p-6 text-card-foreground">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div><dt className="text-sm text-muted-foreground">Service state</dt><dd className="mt-2 font-medium">{service.state ? stateLabels[service.state] : "Not configured"}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Current version</dt><dd className="mt-2">{service.currentVersion ? <code className="rounded-md bg-muted px-2 py-1 text-xs">v{service.currentVersion}</code> : <span className="text-muted-foreground">No version</span>}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Last deployment</dt><dd className="mt-2">{service.lastResult ? <DeploymentResult result={service.lastResult} /> : <span className="text-muted-foreground">No deployments</span>}</dd></div>
        </dl>
        <p className="mt-6 text-xs text-muted-foreground">A failed deployment can leave the previous working version healthy.</p>
      </section>
      <h2 className="mb-4 text-lg font-semibold">Deployment history</h2>
      {service.history.length === 0 ? (
        <section className="rounded-lg border bg-card px-6 py-16 text-center text-card-foreground">
          <h3 className="text-lg font-semibold">No deployments yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">There is no deployment history for {service.name} in {environment}.</p>
        </section>
      ) : (
        <Table caption={`Deployment history for ${service.name} in ${environment}`}>
          <thead><tr>
            <th scope="col">Deployment</th><th scope="col">Version</th><th scope="col">Commit</th><th scope="col">Result</th><th scope="col">Completed at <span className="font-normal">(UTC)</span></th>
          </tr></thead>
          <tbody>{service.history.map((deployment) => (
            <tr key={deployment.id}>
              <th scope="row">#{deployment.id}</th>
              <td><code className="rounded-md bg-muted px-2 py-1 text-xs">v{deployment.version}</code></td>
              <td>{deployment.commit ? <code>{deployment.commit}</code> : <span className="text-muted-foreground">Not recorded</span>}</td>
              <td><DeploymentResult result={deployment.result} /></td>
              <td><time className="whitespace-nowrap text-muted-foreground" dateTime={deployment.completedAt.toISOString()}>{dateFormat.format(deployment.completedAt)}</time></td>
            </tr>
          ))}</tbody>
        </Table>
      )}
    </main>
  );
}
