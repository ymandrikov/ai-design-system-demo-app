import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

export default function NotFound() {
  return <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
    <PageHeader title="Deployment not found" description="This deployment does not exist. Open a deployment from service history." />
    <Link href="/" className="mt-6 inline-block text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Services</Link>
  </main>;
}
