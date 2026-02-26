"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, Clock, Shield, Phone, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🦝</span>
            </div>
            <span className="font-bold text-xl">Critter On Call</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/request" className="text-muted-foreground hover:text-foreground transition">
              Get Help
            </Link>
            <Link href="/operator/login" className="text-muted-foreground hover:text-foreground transition">
              For Operators
            </Link>
            <Link href="/request">
              <Button className="bg-orange hover:bg-orange-hover">Get Help Now</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-orange-light text-orange border-orange/20 mb-6">
                24/7 Emergency Dispatch
              </Badge>
              <h1 className="font-[var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Wildlife emergency?<br />
                <span className="text-orange">Help is 12 minutes away.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Instant dispatch to operators near you. Real-time tracking. Transparent pricing. 
                Like Uber, but for critters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/request">
                  <Button size="lg" className="btn-primary w-full sm:w-auto text-lg">
                    Get Help Now →
                  </Button>
                </Link>
                <Link href="/operator/signup">
                  <Button size="lg" variant="outline" className="btn-secondary w-full sm:w-auto text-lg">
                    I&apos;m an Operator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-orange/20 via-blue/10 to-orange/5 rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🦝</div>
                    <div className="eta-countdown">12:00</div>
                    <p className="text-muted-foreground mt-2">minutes away</p>
                  </div>
                </div>
                {/* Animated dispatch lines */}
                <div className="absolute -inset-4 border-2 border-dashed border-orange/30 rounded-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            From emergency to resolution in three simple steps. No callbacks, no waiting.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Submit Request</h3>
              <p className="text-muted-foreground">
                Share your location, animal type, and photos. Takes 30 seconds.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Instant Match</h3>
              <p className="text-muted-foreground">
                SMS blast to 5 operators within 25 miles. First to accept wins.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Track in Real-Time</h3>
              <p className="text-muted-foreground">
                See your operator&apos;s ETA countdown. Know exactly when help arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Homeowners */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-orange-light text-orange border-orange/20 mb-4">
                For Homeowners
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Critter On Call beats calling around
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success">✓</span>
                  </div>
                  <div>
                    <strong>INSTANT dispatch</strong>
                    <span className="text-muted-foreground"> — not &quot;we&apos;ll call you back&quot;</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success">✓</span>
                  </div>
                  <div>
                    <strong>Real-time tracking</strong>
                    <span className="text-muted-foreground"> — like Uber, see ETA countdown</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success">✓</span>
                  </div>
                  <div>
                    <strong>Transparent pricing</strong>
                    <span className="text-muted-foreground"> — no surprise fees</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success">✓</span>
                  </div>
                  <div>
                    <strong>24/7 availability</strong>
                    <span className="text-muted-foreground"> — especially after-hours</span>
                  </div>
                </li>
              </ul>
              <Link href="/request" className="inline-block mt-8">
                <Button size="lg" className="btn-primary">
                  Submit Emergency Request →
                </Button>
              </Link>
            </div>
            <div className="card-urgent">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="badge-urgent">URGENT</Badge>
                <span className="text-sm text-muted-foreground">Submitted 2 min ago</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Raccoon in chimney</h3>
              <p className="text-muted-foreground mb-4">1234 Main St, Columbus OH</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue">Estimated: $350-500</span>
                <span className="badge-accepted">Operator Assigned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Operators */}
      <section className="py-20 px-4 bg-[#0A0F1C] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Incoming Requests</h3>
                  <Badge className="bg-orange text-white">3 New</Badge>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Bat in attic</span>
                      <span className="text-orange font-bold">$400-600</span>
                    </div>
                    <p className="text-sm text-white/70">2.3 miles • 5 min ago</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Squirrel nest removal</span>
                      <span className="text-orange font-bold">$200-350</span>
                    </div>
                    <p className="text-sm text-white/70">4.1 miles • 12 min ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="bg-blue text-white mb-4">
                For Operators
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get consistent leads without marketing
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-orange flex-shrink-0" />
                  <span>SMS alerts for jobs in your service area</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-orange flex-shrink-0" />
                  <span>Accept or decline in seconds from your phone</span>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-orange flex-shrink-0" />
                  <span>Payments processed automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-orange flex-shrink-0" />
                  <span>Build your reputation with ratings</span>
                </li>
              </ul>
              <Link href="/operator/signup" className="inline-block mt-8">
                <Button size="lg" className="bg-white text-[#0A0F1C] hover:bg-white/90">
                  Sign Up as Operator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange mb-2">12 min</div>
              <p className="text-muted-foreground">Average Response</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue mb-2">24/7</div>
              <p className="text-muted-foreground">Dispatch Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">$0</div>
              <p className="text-muted-foreground">Hidden Fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-orange text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t wait in the dark.
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get help now — average response time is 12 minutes.
          </p>
          <Link href="/request">
            <Button size="lg" className="bg-white text-orange hover:bg-white/90 text-lg px-12">
              Get Help Now →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0F1C] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🦝</span>
              </div>
              <span className="font-bold text-xl">Critter On Call</span>
            </div>
            <nav className="flex gap-6 text-white/70">
              <Link href="/request" className="hover:text-white transition">Get Help</Link>
              <Link href="/operator/signup" className="hover:text-white transition">For Operators</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
            </nav>
            <p className="text-white/50 text-sm">
              © 2026 Critter On Call. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
