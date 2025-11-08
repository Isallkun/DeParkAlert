import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { PlatformDashboard } from "@/components/platform-dashboard";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PlatformDashboard />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
