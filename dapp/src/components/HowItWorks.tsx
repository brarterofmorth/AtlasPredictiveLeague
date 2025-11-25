import { Lock, Weight, TrendingUp, Trophy } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: TrendingUp,
      title: "Choose a Market",
      description: "Browse active prediction markets and select events you want to predict",
    },
    {
      icon: Weight,
      title: "Allocate Weight",
      description: "Assign 1-100 weight units to your prediction instead of fixed amounts",
    },
    {
      icon: Lock,
      title: "Encrypted Privacy",
      description: "Your prediction is encrypted with FHE, preventing front-running and manipulation",
    },
    {
      icon: Trophy,
      title: "Earn Rewards",
      description: "When markets resolve, rewards are distributed proportionally based on prediction weights",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participate in encrypted prediction markets with our simple four-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
                )}

                <div className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-card transition-all">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground text-center mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
