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
        <DialogContent className="glass max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border-border bg-[#080808]/[0.97] p-6 sm:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-brand-teal/20 blur-3xl" />
          <div className="relative">
            <DialogTitle className="text-center font-body text-3xl font-bold md:text-4xl">
              Let's <span className="text-gradient">Connect</span>
            </DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground md:text-base">
              Where digital inventory meets global advertising demand and strategic monetisation partnerships.
            </DialogDescription>
            <ConnectForm onClose={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
