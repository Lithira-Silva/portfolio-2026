import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "@/app/routes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TransitionProvider } from "@/components/layout/Transition";
import { useLenis } from "@/hooks/useLenis";

function Shell() {
  const element = useRoutes(routes);
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" key={pathname}>
        {element}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  useLenis();
  return (
    <TransitionProvider>
      <Shell />
    </TransitionProvider>
  );
}
