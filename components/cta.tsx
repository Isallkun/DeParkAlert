import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          Join the Decentralized Traffic Revolution
        </h2>
        <p className="text-lg text-muted-foreground mb-10 text-balance max-w-2xl mx-auto">
          Start reporting today and earn rewards for contributing to the network. Be part of building transparent,
          AI-powered urban intelligence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dapp-simple">
            <button className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 group">
              Launch App
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </Link>
          <button className="px-10 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition">
            Read Whitepaper
          </button>
        </div>

        <div className="mt-12 pt-12 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-6">Built for</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">TON Blockchain</div>
              <div className="text-sm text-muted-foreground">Powered by</div>
            </div>
            <div className="w-px h-10 bg-border"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">DePIN Ecosystem</div>
              <div className="text-sm text-muted-foreground">On-Chain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
