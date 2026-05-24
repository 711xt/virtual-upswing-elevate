import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import AutonomousOps from "@/components/AutonomousOps";
import HowItWorks from "@/components/HowItWorks";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Virtual Upswing — AI Automations That Run Your Business" },
      {
        name: "description",
        content:
          "Virtual Upswing builds custom AI workflows and agents that replace the busywork eating your team's day. Outcomes only.",
      },
      { property: "og:title", content: "Virtual Upswing — AI Automations Agency" },
      {
        property: "og:description",
        content: "Custom AI workflows and agents, built and operated end-to-end.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen bg-black text-foreground">
      <Nav />
      <Hero />
      <Services />
      <Industries />
      <HowItWorks />
      <Footer />
    </main>
  );
}
