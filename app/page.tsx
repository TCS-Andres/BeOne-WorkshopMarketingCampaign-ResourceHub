import { MODULES } from "./lib/content";
import { Hero } from "./components/Hero";
import { StickyNav } from "./components/StickyNav";
import { ModuleSection } from "./components/ModuleSection";
import { ToolsGrid } from "./components/ToolsGrid";
import { WebinarCTA } from "./components/WebinarCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StickyNav />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 sm:py-16">
        <div className="space-y-10 sm:space-y-14">
          {MODULES.map((module) => (
            <ModuleSection key={module.id} module={module} />
          ))}

          <ToolsGrid />

          <WebinarCTA />
        </div>
      </main>

      <Footer />
    </>
  );
}
