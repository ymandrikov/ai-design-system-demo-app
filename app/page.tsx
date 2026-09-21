import { PageContent } from "@/components/layouts/page-content";
import { AppIdentity } from "@/components/ui/app-identity";
import { Time } from "@/components/ui/time";
import { TextLink } from "@/components/ui/text-link";
import { PageContainer } from "@/components/layouts/page-container";
import type { Metadata } from "next";
import { VersionLabel } from "@/components/deployments/version-label";
import { DeploymentResult } from "@/components/deployments/deployment-result";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NavigationalTabs } from "@/components/ui/navigational-tabs";
import { PageHeader } from "@/components/ui/page-header";
import { DatasetEmptyState } from "@/components/ui/dataset-empty-state";
import { listServices } from "@/lib/db/queries";
import { environments } from "@/lib/db/schema";
import { environmentLabels, stateLabels } from "@/lib/deployments/presentation";
import { AddServiceDialog } from "./add-service-dialog";
import { DeleteServiceDialog } from "./delete-service-dialog";

export const metadata: Metadata = {
  title: "Services | Deploy Board",
  description: "Service health, current versions, and deployment history by environment.",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const environment = params.environment === "staging" ? "staging" : "production";
  const services = listServices(environment);

  return (
    <PageContainer>
      <div className="mb-5xl">
        <AppIdentity />
      </div>
      <PageContent>
        <PageHeader
          title="Services"
          description={`Service health and the latest deployment in ${environment}.`}
          controls={
            <div className="flex flex-wrap items-center gap-lg">
              <NavigationalTabs
                label="Environment"
                currentHref={`/?environment=${environment}`}
                items={environments.map((value) => ({
                  href: `/?environment=${value}`,
                  label: environmentLabels[value],
                }))}
              />
              <AddServiceDialog environment={environment} />
            </div>
          }
        />
        <PageContent.Section aria-label={`Services in ${environment}`}>
          <PageContent.SectionContent>
            {services.length === 0 ? (
              <DatasetEmptyState
                headingLevel="h2"
                title="No services yet"
                description="Services will appear here when they are added."
              />
            ) : (
              <Table aria-label={`Services in ${environment}`}>
                <TableCaption className="sr-only">{`Services in ${environment}`}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Service</TableHead>
                    <TableHead scope="col">Service state</TableHead>
                    <TableHead scope="col">Current version</TableHead>
                    <TableHead scope="col">Last deployment</TableHead>
                    <TableHead scope="col">
                      Completed at <span className="font-normal">(UTC)</span>
                    </TableHead>
                    <TableHead scope="col" className="w-6xl">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableHead scope="row">
                        <TextLink
                          href={`/services/${encodeURIComponent(service.slug)}?environment=${environment}`}
                          variant="title"
                        >
                          {service.name}
                        </TextLink>
                      </TableHead>
                      <TableCell>{service.state ? stateLabels[service.state] : "Not configured"}</TableCell>
                      <TableCell>
                        {service.currentVersion ? (
                          <VersionLabel version={service.currentVersion} />
                        ) : (
                          <span className="text-content-subtle">No version</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {service.lastResult ? (
                          <DeploymentResult result={service.lastResult} />
                        ) : (
                          <span className="text-content-subtle">No deployments</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="whitespace-nowrap text-nowrap text-content-subtle">
                          {service.lastCompletedAt ? (
                            <Time value={service.lastCompletedAt} format="dateTime" showTimeZone={false} />
                          ) : (
                            "—"
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DeleteServiceDialog id={service.id} name={service.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <p className="mt-xl text-xs text-content-subtle">
              A failed deployment can leave the previous working version healthy.
            </p>
          </PageContent.SectionContent>
        </PageContent.Section>
      </PageContent>
    </PageContainer>
  );
}
