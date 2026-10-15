import { PageTitle } from "@/components/layout/PageTitle";
import { Certificates } from "@/sections/Certificates";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function CertificatesPage() {
  usePageTitle("Certificates");
  return (
    <>
      <PageTitle title="Certified" intro="Credentials I have earned, each with a link you can verify." />
      <Certificates withIndex />
    </>
  );
}
