"use client";

import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Indonesian DePIN Hackathon 2025
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
            Real-Time Traffic Intelligence on{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Decentralized Infrastructure
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Report parking and traffic congestion with AI-powered
            classification. Every report is immutably recorded on TON blockchain
            for complete transparency and trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2 group">
              Launch App
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-4 bg-background border border-border text-foreground rounded-lg font-semibold hover:bg-border/50 transition">
              View Docs
            </button>
          </div>
        </div>

        <div className="mt-20 relative">
          {/*<div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border overflow-hidden backdrop-blur-sm">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                <p className="text-sm">Interactive Dashboard Preview</p>
              </div>
            </div>
          </div>*/}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
