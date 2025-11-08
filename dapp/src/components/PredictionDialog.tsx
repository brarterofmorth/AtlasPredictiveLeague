import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Lock, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useEnterLeague } from "@/hooks/useAtlasContract";
import { encryptWeight, initializeFHE, useFheStore } from "@/lib/fhe";
import { ATLAS_PREDICTIVE_LEAGUE_ADDRESS } from "@/config/contracts";
import type { Market } from "@/components/MarketCard";

interface PredictionDialogProps {
  market: Market;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PredictionDialog = ({ market, open, onOpenChange }: PredictionDialogProps) => {
  const [weight, setWeight] = useState([50]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [encrypting, setEncrypting] = useState(false);
  const { address, isConnected } = useAccount();
  const { enterLeague, isPending, isConfirming, isSuccess } = useEnterLeague();
  const { ready, initializing, error: fheError } = useFheStore();

  const optionButtons = useMemo(() => market.options ?? [], [market.options]);

  useEffect(() => {
    if (open && isConnected && !ready && !initializing) {
      initializeFHE().catch((error) => {
        console.error("FHE initialization failed:", error);
      });
    }
  }, [open, isConnected, ready, initializing]);

  useEffect(() => {
    if (!open) {
      setWeight([50]);
      setSelectedOption(null);
      setEncrypting(false);
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  const handleSubmit = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (selectedOption === null) {
      toast.error("Please pick an outcome.");
      return;
    }
    if (!ready) {
      try {
        await initializeFHE();
      } catch (error) {
        toast.error("Failed to initialize FHE.");
        return;
      }
    }

    try {
      setEncrypting(true);
      const payload = await encryptWeight(
        BigInt(weight[0]),
        ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        address
      );

      await enterLeague(
        market.leagueId,
        selectedOption,
        payload.handle,
        payload.proof,
        market.entryFeeWei
      );
      toast.success("Transaction submitted.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Prediction failed.";
      toast.error(message);
    } finally {
      setEncrypting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{market.title}</DialogTitle>
          <DialogDescription>{market.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Options */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Select Outcome</p>
            <div className="grid grid-cols-2 gap-3">
              {optionButtons.map((label, index) => (
                <Button
                  key={`${market.leagueId}-${label}-${index}`}
                  variant={selectedOption === index ? "default" : "outline"}
                  onClick={() => setSelectedOption(index)}
                  className={
                    selectedOption === index
                      ? "bg-primary text-primary-foreground border-0"
                      : "border-border hover:border-primary/60"
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Weight Allocation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Allocate Weight</p>
              <span className="text-2xl font-bold text-primary">{weight[0]}</span>
            </div>
            <Slider
              value={weight}
              onValueChange={setWeight}
              min={1}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-secondary/50 border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  FHE Privacy Protection
                </p>
                <p className="text-xs text-muted-foreground">
                  Your prediction weight is fully encrypted. No one can see your allocation until the market closes.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Entry Fee: <span className="font-semibold text-foreground">{market.entryFeeFormatted} ETH</span>
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-2">
            {!ready && (
              <p className="text-xs text-muted-foreground">
                {initializing ? "Initializing FHE…" : fheError || "FHE is not ready yet."}
              </p>
            )}
            <Button
              onClick={handleSubmit}
              disabled={selectedOption === null || encrypting || !ready || isPending || isConfirming}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {(encrypting || isPending || isConfirming) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {encrypting ? "Encrypting…" : isPending || isConfirming ? "Submitting…" : "Submit Encrypted Prediction"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
