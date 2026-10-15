import { PageTitle } from "@/components/layout/PageTitle";
import { Contact } from "@/sections/Contact";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact");
  return (
    <>
      <PageTitle title="Contact" intro="Internships, collaborations, or a question about the koi." />
      <Contact />
    </>
  );
}
