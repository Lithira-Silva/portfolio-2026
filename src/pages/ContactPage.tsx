import { PageTitle } from "@/components/layout/PageTitle";
import { Contact } from "@/sections/Contact";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact");
  return (
    <>
      <PageTitle title="Contact" intro="Freelance, full-time or just a question about the koi. I reply within a day." />
      <Contact withComposer />
    </>
  );
}
