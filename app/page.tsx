import type { Metadata } from "next";
import Link from "next/link";
import { VersionLabel } from "@/components/deployments/version-label";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NavigationalTabs } from "@/components/ui/navigational-tabs";
import { PageHeader } from "@/components/ui/page-header";
import { listServices } from "@/lib/db/queries";
import { environments } from "@/lib/db/schema";
import { dateFormat, stateLabels } from "@/lib/deployments/presentation";

export const metadata: Metadata = {
  title: "Services | Deploy Board",
  description: "Service health, current versions, and deployment history by environment.",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const environment = params.environment === "staging" ? "staging" : "production";
  const services = listServices(environment);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
      <p className="mb-12 text-sm font-semibold tracking-tight">Deploy Board <span className="ml-2 font-normal text-muted-foreground">/ Local demo</span></p>
      <div className="mb-8">
        <PageHeader
          title="Services"
          description={`Service health and the latest deployment in ${environment}.`}
          controls={
            <NavigationalTabs
              label="Environment"
              currentHref={`/?environment=${environment}`}
              items={environments.map((value) => ({ href: `/?environment=${value}`, label: value }))}
            />
          }
        />
      </div>
      {services.length === 0 ? (
        <section className="rounded-lg border bg-card px-6 py-16 text-center text-card-foreground">
          <h2 className="text-lg font-semibold">No services yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Services will appear here when they are added.</p>
        </section>
      ) : (
        <Table aria-label={`Services in ${environment}`}>
          <TableCaption className="sr-only">{`Services in ${environment}`}</TableCaption>
          <TableHeader><TableRow>
            <TableHead scope="col">Service</TableHead>
            <TableHead scope="col">Service state</TableHead>
            <TableHead scope="col">Current version</TableHead>
            <TableHead scope="col">Last deployment</TableHead>
            <TableHead scope="col">Completed at <span className="font-normal">(UTC)</span></TableHead>
          </TableRow></TableHeader>
          <TableBody>{services.map((service) => (
            <TableRow key={service.id}>
              <TableHead scope="row"><Link href={`/services/${encodeURIComponent(service.slug)}?environment=${environment}`} className="font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{service.name}</Link></TableHead>
              <TableCell>{service.state ? stateLabels[service.state] : "Not configured"}</TableCell>
              <TableCell>{service.currentVersion ? <VersionLabel version={service.currentVersion} /> : <span className="text-muted-foreground">No version</span>}</TableCell>
              <TableCell>{service.lastResult ? <DeploymentResult result={service.lastResult} /> : <span className="text-muted-foreground">No deployments</span>}</TableCell>
              <TableCell><span className="whitespace-nowrap text-nowrap text-muted-foreground">{service.lastCompletedAt ? <time dateTime={service.lastCompletedAt.toISOString()}>{dateFormat.format(service.lastCompletedAt)}</time> : "—"}</span></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      )}
      <p className="mt-4 text-xs text-muted-foreground">A failed deployment can leave the previous working version healthy.</p>
    </main>
  );
}
