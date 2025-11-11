import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Lock } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* Gradient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full mb-6 shadow-sm">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">FHE-Powered Privacy Protection</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            AtlasPredictive
            <br />
            League
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Encrypted prediction markets with weighted betting.
            Predict future events, allocate your weight, and earn rewards—all with complete privacy.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow text-lg px-8 py-6" onClick={() => {
              document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Predicting
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted/50 text-lg px-8 py-6" onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-card transition-all">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fully Encrypted</h3>
              <p className="text-sm text-muted-foreground">All predictions are encrypted using FHE technology</p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-card transition-all">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Weight-Based Betting</h3>
              <p className="text-sm text-muted-foreground">Allocate 1-100 weight instead of fixed amounts</p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-card transition-all">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Dynamic Rewards</h3>
              <p className="text-sm text-muted-foreground">Pool rewards distributed by prediction weight</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
