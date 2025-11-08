"use client"

import { MapPin, AlertCircle, CheckCircle, Zap, TrendingUp } from "lucide-react"

export function DashboardPreview() {
  const recentReports = [
    { id: 1, location: "Downtown Core", type: "Traffic Jam", severity: "high", verified: true },
    { id: 2, location: "Harbor District", type: "Parking Full", severity: "medium", verified: true },
    { id: 3, location: "Tech Hub", type: "Congestion", severity: "high", verified: false },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Platform Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring of parking and traffic incidents with AI-powered insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Stat Cards */}
          <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-muted-foreground text-sm font-semibold">Active Reports</h3>
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">247</div>
            <p className="text-xs text-muted-foreground mt-2">Last 24 hours</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-muted-foreground text-sm font-semibold">Verified Records</h3>
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground">1,823</div>
            <p className="text-xs text-muted-foreground mt-2">On TON Blockchain</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-muted-foreground text-sm font-semibold">Network Nodes</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">512</div>
            <p className="text-xs text-muted-foreground mt-2">Active validators</p>
          </div>
        </div>

        {/* Main Dashboard Card */}
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Recent Incident Reports</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>

          <div className="divide-y divide-border">
            {recentReports.map((report) => (
              <div key={report.id} className="px-6 py-4 hover:bg-card/50 transition flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-foreground">{report.location}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        report.severity === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {report.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  {report.verified && (
                    <div className="flex items-center gap-1 text-xs text-accent">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Map Preview */}
          <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-t border-border p-6 min-h-64 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/10 animate-pulse">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">Interactive Map View</p>
              <p className="text-xs text-muted-foreground mt-1">Real-time incident mapping</p>
            </div>

            {/* Floating indicators */}
            <div className="absolute top-12 left-12 w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="absolute bottom-12 left-1/4 w-3 h-3 rounded-full bg-accent animate-pulse"></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Detection Accuracy", value: "98.5%" },
            { label: "Avg Response Time", value: "2.3s" },
            { label: "Block Confirmations", value: "~5min" },
            { label: "Network Uptime", value: "99.9%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-lg border border-border bg-card/30 backdrop-blur-sm text-center"
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
