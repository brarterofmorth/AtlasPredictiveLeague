import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useCreateLeague } from "@/hooks/useAtlasContract";
import { parseEther } from "ethers";

interface CreateLeagueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateLeagueDialog = ({ open, onOpenChange }: CreateLeagueDialogProps) => {
  const [leagueId, setLeagueId] = useState("");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [entryFee, setEntryFee] = useState("0.01");
  const [durationDays, setDurationDays] = useState("30");
  const { isConnected } = useAccount();
  const { createLeague, isPending, isConfirming, isSuccess } = useCreateLeague();

  useEffect(() => {
    if (!open) {
      // Reset form
      setLeagueId("");
      setTitle("");
      setOptions(["", ""]);
      setEntryFee("0.01");
      setDurationDays("30");
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    } else {
      toast.error("Maximum 10 options allowed");
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      toast.error("Minimum 2 options required");
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    // Validation
    if (!leagueId.trim()) {
      toast.error("Please enter a League ID");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (options.some(opt => !opt.trim())) {
      toast.error("All options must have text");
      return;
    }
    if (parseFloat(entryFee) < 0.001) {
      toast.error("Entry fee must be at least 0.001 ETH");
      return;
    }
    if (parseInt(durationDays) < 1 || parseInt(durationDays) > 30) {
      toast.error("Duration must be between 1 and 30 days");
      return;
    }

    try {
      const entryFeeWei = parseEther(entryFee);
      const durationSeconds = BigInt(parseInt(durationDays) * 24 * 60 * 60);

      await createLeague(
        leagueId.trim(),
        title.trim(),
        options.map(opt => opt.trim()),
        entryFeeWei,
        durationSeconds
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create league";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Prediction Market</DialogTitle>
          <DialogDescription>
            Set up a new prediction league with custom options and entry fee
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* League ID */}
          <div className="space-y-2">
            <Label htmlFor="leagueId">League ID (Unique Identifier)</Label>
            <Input
              id="leagueId"
              placeholder="e.g., crypto-btc-price-2025"
              value={leagueId}
              onChange={(e) => setLeagueId(e.target.value)}
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              Use lowercase letters, numbers, and hyphens only
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Will Bitcoin reach $100K in 2025?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Prediction Options ({options.length}/10)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={options.length >= 10}
                className="h-8"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Option
              </Button>
            </div>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="bg-secondary border-border flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 2}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Minimum 2 options, maximum 10 options
            </p>
          </div>

          {/* Entry Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entryFee">Entry Fee (ETH)</Label>
              <Input
                id="entryFee"
                type="number"
                step="0.001"
                min="0.001"
                placeholder="0.01"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                className="bg-secondary border-border"
              />
              <p className="text-xs text-muted-foreground">
                Minimum: 0.001 ETH
              </p>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                placeholder="30"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="bg-secondary border-border"
              />
              <p className="text-xs text-muted-foreground">
                1-30 days
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Button
              onClick={handleSubmit}
              disabled={isPending || isConfirming}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {(isPending || isConfirming) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isPending || isConfirming ? "Creating League..." : "Create League"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Creating a league is free. You only pay gas fees.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
