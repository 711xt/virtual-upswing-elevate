import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import ConnectForm from "@/components/ConnectForm";

export const Route = createFileRoute("/connect")({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: "Connect | Virtual Upswing" },
      { name: "description", content: "Get in touch with Virtual Upswing about publisher monetisation, demand and partnerships." },
      { property: "og:title", content: "Connect | Virtual Upswing" },
      { property: "og:description", content: "Start a conversation with the Virtual Upswing team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ConnectPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-black px-4 pb-20 pt-8 text-foreground sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <img src={logo} alt="Virtual Upswing logo" className="h-7 w-7 rounded-full" />
          <span className="font-display text-sm text-foreground" style={{ fontWeight: 400, letterSpacing: "0.04em" }}>Virtual Upswing</span>
        </Link>
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-brand-teal/30 bg-[#080808] p-6 shadow-[0_0_60px_-20px_var(--brand-teal)] sm:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative">
            <h1 className="text-center font-body text-3xl font-bold md:text-4xl">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground md:text-base">
              Where digital inventory meets global advertising demand and strategic monetisation partnerships.
            </p>
            <ConnectForm onClose={() => navigate({ to: "/" })} />
          </div>
        </div>
      </div>
    </main>
  );
}
