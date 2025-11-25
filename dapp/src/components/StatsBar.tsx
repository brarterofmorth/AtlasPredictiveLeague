import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export const StatsBar = () => {
  const stats = [
    { icon: DollarSign, label: "Total Volume", value: "$12.4M", trend: "+23%" },
    { icon: Users, label: "Active Predictors", value: "8,924", trend: "+12%" },
    { icon: Activity, label: "Live Markets", value: "42", trend: "+5%" },
    { icon: TrendingUp, label: "24h Predictions", value: "2,341", trend: "+18%" },
  ];

  return (
    <section className="relative -mt-16 z-20">
      <div className="container mx-auto px-4">
        <div className="bg-card border border-border rounded-3xl shadow-card p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="flex items-baseline justify-center lg:justify-start gap-2">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <span className="text-sm text-success font-medium">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
