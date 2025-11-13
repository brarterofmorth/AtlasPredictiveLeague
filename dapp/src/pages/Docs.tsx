import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, Lock, Zap, Users, Award, BookOpen, Play, Map } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn about AtlasPredictive League, how it works, and our vision for the future
            </p>
          </div>

          {/* Demo Video - First Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Demo Video</h2>
            </div>
            <Card className="bg-card/60 backdrop-blur-sm border-border p-8">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full"
                  poster="/placeholder.svg"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Watch a walkthrough of creating markets, making predictions with encrypted weights, and claiming rewards
              </p>
            </Card>
          </section>

          {/* Project Overview */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Project Overview</h2>
            </div>
            <Card className="bg-card/60 backdrop-blur-sm border-border p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">What is AtlasPredictive League?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    AtlasPredictive League is a decentralized prediction market platform powered by
                    Fully Homomorphic Encryption (FHE). Unlike traditional prediction markets,
                    we use encrypted weight-based betting where your predictions remain completely
                    private until the market closes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">FHE Privacy</h4>
                        <p className="text-sm text-muted-foreground">
                          All predictions are encrypted on-chain using Zama's fhEVM technology
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Weight-Based</h4>
                        <p className="text-sm text-muted-foreground">
                          Allocate 1-100 weight to express confidence in your prediction
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Challenge Period</h4>
                        <p className="text-sm text-muted-foreground">
                          24-hour challenge mechanism prevents result manipulation
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Fair Rewards</h4>
                        <p className="text-sm text-muted-foreground">
                          Prize pool distributed proportionally by prediction weight
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Technology Stack</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Smart Contracts:</span> Solidity 0.8.24 with Zama fhEVM 0.8.0</p>
                    <p><span className="font-semibold text-foreground">Frontend:</span> React + TypeScript + Vite</p>
                    <p><span className="font-semibold text-foreground">Encryption:</span> Zama RelayerSDK 0.3.0-5</p>
                    <p><span className="font-semibold text-foreground">Network:</span> Ethereum Sepolia Testnet</p>
                    <p><span className="font-semibold text-foreground">Wallet:</span> RainbowKit + Wagmi</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            </div>
            <Card className="bg-card/60 backdrop-blur-sm border-border p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Create or Join a Market</h4>
                    <p className="text-muted-foreground">
                      Anyone can create a prediction market with custom options and entry fee.
                      Markets have a lock time (1 hour to 30 days) after which betting closes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Make Encrypted Predictions</h4>
                    <p className="text-muted-foreground">
                      Select an outcome and allocate your weight (1-100). Your weight is encrypted
                      using FHE before being submitted to the blockchain. Pay the entry fee to join.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Wait for Lock Time</h4>
                    <p className="text-muted-foreground">
                      Before lock time, you can edit your prediction. After lock time,
                      betting closes and the market waits for result submission.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Propose & Challenge Result</h4>
                    <p className="text-muted-foreground">
                      Anyone can propose the winning outcome with a 0.1 ETH bond. Others can
                      challenge within 24 hours if they disagree. After 24h without challenges,
                      the result is finalized.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Claim Rewards</h4>
                    <p className="text-muted-foreground">
                      Winners claim their share of the prize pool proportional to their encrypted
                      weight. If the market is cancelled or ends in a push, everyone gets refunded.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Roadmap */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Roadmap</h2>
            </div>
            <Card className="bg-card/60 backdrop-blur-sm border-border p-8">
              <div className="space-y-8">
                {/* Phase 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-foreground">Phase 1: Foundation (Completed)</h3>
                  </div>
                  <ul className="space-y-2 ml-6 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Core smart contracts with FHE weight encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Challenge-based result verification system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Frontend with wallet integration and FHE SDK</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Sepolia testnet deployment</span>
                    </li>
                  </ul>
                </div>

                {/* Phase 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-semibold text-foreground">Phase 2: Enhancement (In Progress)</h3>
                  </div>
                  <ul className="space-y-2 ml-6 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Oracle integration for automated result verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Advanced market categories (Sports, Crypto, Politics, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>User reputation system based on prediction accuracy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Mobile-responsive UI improvements</span>
                    </li>
                  </ul>
                </div>

                {/* Phase 3 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                    <h3 className="text-xl font-semibold text-foreground">Phase 3: Mainnet & Governance (Planned)</h3>
                  </div>
                  <ul className="space-y-2 ml-6 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">○</span>
                      <span>Mainnet deployment on Zama fhEVM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">○</span>
                      <span>DAO governance for market moderation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">○</span>
                      <span>Liquidity pools and market maker incentives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">○</span>
                      <span>Cross-chain prediction markets</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Contract Addresses */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Contract Information</h2>
            </div>
            <Card className="bg-card/60 backdrop-blur-sm border-border p-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Network</p>
                  <p className="font-mono text-foreground">Ethereum Sepolia Testnet</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Contract Address</p>
                  <a
                    href="https://sepolia.etherscan.io/address/0xcE54867466234CFc066341AC323De0B89bdF8aad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary hover:underline break-all"
                  >
                    0xcE54867466234CFc066341AC323De0B89bdF8aad
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Source Code</p>
                  <p className="text-muted-foreground">Available on GitHub (coming soon)</p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;
