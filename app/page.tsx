import type { Metadata } from "next";
import { Table } from "@/components/ui/table";
import { listServices } from "@/lib/db/queries";
import { environments } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Services | Deploy Board",
  description: "Service health, current versions, and deployment history by environment.",
};

const stateLabels = { healthy: "Healthy", unavailable: "Unavailable", not_deployed: "Not deployed" };
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC",
});

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const environment = params.environment === "staging" ? "staging" : "production";
  const services = listServices(environment);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
      <p className="mb-12 text-sm font-semibold tracking-tight">Deploy Board <span className="ml-2 font-normal text-muted-foreground">/ Local demo</span></p>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
          <p className="mt-2 text-sm text-muted-foreground">Service health and the latest deployment in {environment}.</p>
        </div>
        <nav aria-label="Environment" className="flex gap-1 rounded-lg border p-1">
          {environments.map((value) => (
            <a key={value} href={`/?environment=${value}`} aria-current={environment === value ? "page" : undefined}
              className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-[current=page]:bg-primary aria-[current=page]:font-medium aria-[current=page]:text-primary-foreground">
              {value}
            </a>
          ))}
        </nav>
      </header>
      {services.length === 0 ? (
        <section className="rounded-lg border bg-card px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No services yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Services will appear here when they are added.</p>
        </section>
      ) : (
        <Table caption={`Services in ${environment}`}>
          <thead><tr>
            <th scope="col">Service</th>
            <th scope="col">Service state</th>
            <th scope="col">Current version</th>
            <th scope="col">Last deployment</th>
            <th scope="col">Completed at <span className="font-normal">(UTC)</span></th>
          </tr></thead>
          <tbody>{services.map((service) => (
            <tr key={service.id}>
              <th scope="row"><span className="font-semibold">{service.name}</span></th>
              <td>{service.state ? stateLabels[service.state] : "Not configured"}</td>
              <td>{service.currentVersion ? <code className="rounded-md bg-muted px-2 py-1 text-xs">v{service.currentVersion}</code> : <span className="text-muted-foreground">No version</span>}</td>
              <td>{service.lastResult ? <span className={service.lastResult === "failed" ? "font-medium text-destructive" : "font-medium"}>{service.lastResult === "failed" ? "Failed" : "Succeeded"}</span> : <span className="text-muted-foreground">No deployments</span>}</td>
              <td className="whitespace-nowrap text-muted-foreground">{service.lastCompletedAt ? <time dateTime={service.lastCompletedAt.toISOString()}>{dateFormat.format(service.lastCompletedAt)}</time> : "—"}</td>
            </tr>
          ))}</tbody>
        </Table>
      )}
      <p className="mt-4 text-xs text-muted-foreground">A failed deployment can leave the previous working version healthy.</p>
    </main>
  );
}
