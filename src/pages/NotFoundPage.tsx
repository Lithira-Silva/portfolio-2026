import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/Button";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Not found");
  return (
    <>
      <PageTitle title="404" intro="This koi swam off. The page you wanted is not here." />
      <div className="wrap notfound">
        <Button to="/">Back to the pond</Button>
      </div>
    </>
  );
}
