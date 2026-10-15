import { PageTitle } from "@/components/layout/PageTitle";
import { Certificates } from "@/sections/Certificates";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function CertificatesPage() {
  usePageTitle("Certificates");
  return (
    <>
      <PageTitle title="Certified" intro="Courses and programmes I have completed, with the certificates to show it." />
      <Certificates withIndex />
    </>
  );
}
