import { MarketCard } from "@/components/MarketCard";
import { useListLeagues, useGetLeague, useGetOptions, useGetPickCounts } from "@/hooks/useAtlasContract";
import { formatEther } from "viem";

export const MarketList = () => {
  const { data: leagueIds, isLoading } = useListLeagues();

  if (isLoading) {
    return (
      <section id="markets" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Active Prediction Markets</h2>
              <p className="text-lg text-muted-foreground">Choose a market and allocate your prediction weight</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card/60 border border-border rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!leagueIds || leagueIds.length === 0) {
    return (
      <section id="markets" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Active Prediction Markets</h2>
              <p className="text-lg text-muted-foreground">Choose a market and allocate your prediction weight</p>
            </div>
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No active markets yet. Check back soon!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="markets" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Active Prediction Markets</h2>
            <p className="text-lg text-muted-foreground">Choose a market and allocate your prediction weight</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leagueIds.map((leagueId) => (
              <LeagueCard key={leagueId} leagueId={leagueId} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual league card component
const LeagueCard = ({ leagueId }: { leagueId: string }) => {
  const { data: league } = useGetLeague(leagueId);
  const { data: options } = useGetOptions(leagueId);
  const { data: pickCounts } = useGetPickCounts(leagueId);

  if (!league) return null;

  const [title, entryFee, lockTime, prizePool, cancelled, settled] = league;

  if (cancelled || settled) return null;

  const optionLabels = options ?? [];
  const pickCountNumbers =
    pickCounts?.map((count) => Number(count)) ?? Array(optionLabels.length).fill(0);
  const totalParticipants = pickCountNumbers.reduce((sum, count) => sum + count, 0);
  const deadline = new Date(Number(lockTime) * 1000).toLocaleDateString();
  const description =
    optionLabels.length >= 2 ? `${optionLabels[0]} vs ${optionLabels[1]}` : optionLabels.join(", ");

  const market = {
    leagueId,
    title,
    description,
    deadline,
    totalPool: formatEther(prizePool),
    entryFeeFormatted: formatEther(entryFee),
    entryFeeWei: entryFee,
    participants: totalParticipants,
    options: optionLabels,
    pickCounts: pickCountNumbers,
    category: "Prediction"
  };

  return <MarketCard market={market} />;
};
