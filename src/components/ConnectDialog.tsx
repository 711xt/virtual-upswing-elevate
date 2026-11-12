import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ConnectForm from "./ConnectForm";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useConnect = () => useContext(Ctx);

export function ConnectProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="glass max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border-border bg-background/90 p-6 sm:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-brand-teal/20 blur-3xl" />
          <div className="relative">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Connect</p>
            <DialogTitle className="font-body text-3xl font-bold md:text-4xl">
              Let's <span className="text-gradient">Connect</span>
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Where digital inventory meets global advertising demand and strategic monetisation partnerships.
            </DialogDescription>
            <ConnectForm onClose={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
