import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Home } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CreateLeagueDialog } from "@/components/CreateLeagueDialog";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <span className="text-lg font-bold text-foreground hidden sm:inline">
                AtlasPredictive League
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-3">
              <Button
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate('/')}
                className={location.pathname === '/' ? 'bg-gradient-primary' : ''}
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>

              <Button
                variant={location.pathname === '/docs' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate('/docs')}
                className={location.pathname === '/docs' ? 'bg-gradient-primary' : ''}
              >
                <FileText className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Docs</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCreateDialogOpen(true)}
                className="border-primary/50 hover:bg-primary/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Create</span>
              </Button>

              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      <CreateLeagueDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </>
  );
};
