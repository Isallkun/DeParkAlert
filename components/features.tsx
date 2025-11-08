import { Shield, Zap, Users, Database } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every report is cryptographically verified and immutably stored on TON blockchain",
    },
    {
      icon: Zap,
      title: "AI-Powered Classification",
      description: "Advanced ML models instantly classify parking and traffic severity in real-time",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Incentivized reporting system rewards contributors for accurate traffic intelligence",
    },
    {
      icon: Database,
      title: "Decentralized Network",
      description: "No central authority - data flows through a distributed peer-to-peer network",
    },
  ]

  return (
    <section id="features" className="py-20 px-6 relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powered by Decentralization</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combine real-time traffic reporting with blockchain transparency and AI intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
