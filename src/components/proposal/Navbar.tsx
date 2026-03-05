import { Link, useLocation } from "react-router-dom";
import { FolderOpen, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProposal } from "@/hooks/useProposal";

const Navbar = () => {
  const location = useLocation();
  const isSubPage = location.pathname !== "/";
  const { proposal, isLoading } = useProposal();

  const isAccepted = proposal?.status === "aceptada";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/uvicuo-wordmark.png" alt="Uvicuo" className="h-7" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Status badge */}
          {!isLoading && proposal && (
            <div
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                isAccepted
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {isAccepted ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Aceptada por {proposal.accepted_by}</span>
                  <span className="sm:hidden">Aceptada</span>
                </>
              ) : (
                <>
                  <Clock className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">En Revisión</span>
                  <span className="sm:hidden">Revisión</span>
                </>
              )}
            </div>
          )}

          <Button variant="ghost" size="sm" asChild>
            <Link to="/?step=dataroom" className="gap-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Data Room</span>
            </Link>
          </Button>

          {isSubPage && (
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              ← Volver a la propuesta
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
