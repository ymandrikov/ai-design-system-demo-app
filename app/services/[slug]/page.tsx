import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RefreshActiveDeployment } from "@/components/deployments/refresh-active-deployment";
import { VersionLabel } from "@/components/deployments/version-label";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { NavigationalTabs } from "@/components/ui/navigational-tabs";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
          <div className="flex flex-wrap items-center gap-4">
            <NavigationalTabs label="Environment" currentHref={`${pathname}?environment=${environment}`} items={environments.map((value) => ({ href: `${pathname}?environment=${value}`, label: value }))} />
            {service.state && <Link href={`${pathname}/deploy?environment=${environment}`} className={buttonVariants()}>Deploy</Link>}
          </div>
        } />
      </div>
      <section aria-label="Service summary" className="mb-10 rounded-lg border bg-card p-6 text-card-foreground">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div><dt className="text-sm text-muted-foreground">Service state</dt><dd className="mt-2 font-medium">{service.state ? stateLabels[service.state] : "Not configured"}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Current version</dt><dd className="mt-2">{service.currentVersion ? <VersionLabel version={service.currentVersion} /> : <span className="text-muted-foreground">No version</span>}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Last deployment</dt><dd className="mt-2">{service.lastResult ? <DeploymentResult result={service.lastResult} /> : <span className="text-muted-foreground">No deployments</span>}</dd></div>
        </dl>
        <p className="mt-6 text-xs text-muted-foreground">A failed deployment can leave the previous working version healthy.</p>
      </section>
      <RefreshActiveDeployment key={`${service.id}-${environment}`} active={service.history.some((deployment) => !deployment.result)} />
      <h2 className="mb-4 text-lg font-semibold">Deployment history</h2>
      {service.history.length === 0 ? (
        <section className="rounded-lg border bg-card px-6 py-16 text-center text-card-foreground">
          <h3 className="text-lg font-semibold">No deployments yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">There is no deployment history for {service.name} in {environment}.</p>
        </section>
      ) : (
        <Table aria-label={`Deployment history for ${service.name} in ${environment}`}>
          <TableCaption className="sr-only">{`Deployment history for ${service.name} in ${environment}`}</TableCaption>
          <TableHeader><TableRow>
            <TableHead scope="col">Deployment</TableHead><TableHead scope="col">Version</TableHead><TableHead scope="col">Commit</TableHead><TableHead scope="col">Result</TableHead><TableHead scope="col">Completed at <span className="font-normal">(UTC)</span></TableHead>
          </TableRow></TableHeader>
          <TableBody>{service.history.map((deployment) => (
            <TableRow key={deployment.id}>
              <TableHead scope="row">#{deployment.id}</TableHead>
              <TableCell><VersionLabel version={deployment.version} /></TableCell>
              <TableCell>{deployment.commit ? <code>{deployment.commit}</code> : <span className="text-muted-foreground">Not recorded</span>}</TableCell>
              <TableCell>{deployment.result ? <DeploymentResult result={deployment.result} /> : <span className="font-medium">{deployment.progress.stage} · {deployment.progress.percent}%</span>}</TableCell>
              <TableCell>{deployment.completedAt ? <time className="whitespace-nowrap text-muted-foreground" dateTime={deployment.completedAt.toISOString()}>{dateFormat.format(deployment.completedAt)}</time> : <span className="text-muted-foreground">In progress</span>}</TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      )}
    </main>
  );
}
