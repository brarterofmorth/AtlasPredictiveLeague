import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Users, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { PredictionDialog } from "@/components/PredictionDialog";

export interface Market {
  leagueId: string;
  title: string;
  description: string;
  deadline: string;
  totalPool: string;
  entryFeeFormatted: string;
  entryFeeWei: bigint;
  participants: number;
  options: string[];
  pickCounts: number[];
  category: string;
}

interface MarketCardProps {
  market: Market;
}

export const MarketCard = ({ market }: MarketCardProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const { upPercentage, downPercentage } = useMemo(() => {
    const upWeight = market.pickCounts[0] ?? 0;
    const downWeight = market.pickCounts[1] ?? 0;
    const totalWeight = upWeight + downWeight;
    if (totalWeight === 0) {
      return { upPercentage: 50, downPercentage: 50 };
    }
    const upPct = Math.round((upWeight / totalWeight) * 100);
    return { upPercentage: upPct, downPercentage: 100 - upPct };
  }, [market.pickCounts]);

  const formatDeadline = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = d.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days left`;
  };

  return (
    <>
      <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card transition-all group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {market.category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>{formatDeadline(market.deadline)}</span>
            </div>
          </div>

          {/* Title & Description */}
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {market.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
              {market.description}
            </p>

          {/* Weight Distribution */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-1 text-success">
                <ArrowUp className="w-4 h-4" />
                <span className="font-medium">{upPercentage}%</span>
              </div>
              <div className="flex items-center gap-1 text-destructive">
                <span className="font-medium">{downPercentage}%</span>
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden flex">
              <div
                className="bg-success transition-all"
                style={{ width: `${upPercentage}%` }}
              />
              <div
                className="bg-destructive transition-all"
                style={{ width: `${downPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <div>
              <p className="text-muted-foreground">Total Pool</p>
              <p className="font-bold text-foreground">{market.totalPool} units</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{market.participants.toLocaleString()}</span>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => setShowDialog(true)}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Make Prediction
          </Button>
        </div>
      </div>

      <PredictionDialog
        market={market}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};
