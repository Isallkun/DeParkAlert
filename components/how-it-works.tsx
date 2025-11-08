import { Camera, Brain, Lock, TrendingUp } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Camera,
      title: "Capture & Report",
      description: "Users upload photos or report traffic conditions directly from the app",
      number: "01",
    },
    {
      icon: Brain,
      title: "AI Classification",
      description: "Advanced models analyze images to classify severity and type of incident",
      number: "02",
    },
    {
      icon: Lock,
      title: "Blockchain Record",
      description: "Report hash is immutably recorded on TON blockchain for verification",
      number: "03",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Feed",
      description: "Reports aggregated into real-time traffic intelligence for all users",
      number: "04",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple workflow that combines community intelligence with decentralized verification
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="relative">
                <div className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-background">
                    {step.number}
                  </div>
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
