"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Target, 
  Megaphone, 
  Palette, 
  Presentation,
  ExternalLink,
  Github,
  Menu,
  X,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  MapPin,
  MessageSquare,
  Zap,
  Shield,
  Phone,
  Star
} from "lucide-react";

const sections = [
  { id: "research", label: "Research", icon: BarChart3 },
  { id: "gtm", label: "GTM Plan", icon: Target },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "brand", label: "Brand", icon: Palette },
  { id: "pitch", label: "Pitch Deck", icon: Presentation, external: "/pitch" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("research");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.filter(s => !s.external).map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-orange-hover flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="font-semibold text-white">Docs</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-[#1A1F2E] border-b border-white/10 py-2">
            {sections.map((section) => (
              section.external ? (
                <Link
                  key={section.id}
                  href={section.external}
                  className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5"
                >
                  <section.icon size={18} />
                  <span>{section.label}</span>
                  <ExternalLink size={14} className="ml-auto" />
                </Link>
              ) : (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                    activeSection === section.id 
                      ? "text-orange bg-orange/10" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <section.icon size={18} />
                  <span>{section.label}</span>
                </button>
              )
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-[#1A1F2E] border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange to-orange-hover flex items-center justify-center">
              <span className="text-white font-bold">CC</span>
            </div>
            <div>
              <h1 className="font-semibold text-white">Critter On Call</h1>
              <p className="text-xs text-white/50">Documentation</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {sections.map((section) => (
            section.external ? (
              <Link
                key={section.id}
                href={section.external}
                className="flex items-center gap-3 px-6 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <section.icon size={18} />
                <span className="text-sm font-medium">{section.label}</span>
                <ExternalLink size={14} className="ml-auto opacity-50" />
              </Link>
            ) : (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                  activeSection === section.id
                    ? "text-orange bg-orange/10 border-r-2 border-orange"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <section.icon size={18} />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            )
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="space-y-2">
            <Link 
              href="https://critteroncall.ashketing.com" 
              target="_blank"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              Live Site
            </Link>
            <Link 
              href="https://github.com/ashtalksai/critter-on-call" 
              target="_blank"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <Github size={14} />
              GitHub
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {/* Research Section */}
        <section id="research" className="min-h-screen p-6 lg:p-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-orange/20 via-orange/10 to-blue/20 p-8 lg:p-12 mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/20 text-orange text-sm font-medium mb-4">
                  <BarChart3 size={14} />
                  Market Research
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Emergency Wildlife Dispatch Platform
                </h2>
                <p className="text-white/70 text-lg max-w-2xl">
                  Homeowners can&apos;t find wildlife removal pros after-hours. Operators want consistent leads. 
                  Both sides in the same zip code, invisible to each other.
                </p>
              </div>
            </div>

            {/* Opportunity Score */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Opportunity", value: "9/10", color: "from-green-500 to-emerald-600" },
                { label: "Problem", value: "9/10", color: "from-orange to-orange-hover" },
                { label: "Feasibility", value: "6/10", color: "from-blue to-blue-hover" },
                { label: "Why Now", value: "9/10", color: "from-purple-500 to-purple-600" },
              ].map((score) => (
                <div key={score.label} className="bg-[#1A1F2E] rounded-2xl p-5 border border-white/5">
                  <p className="text-white/50 text-sm mb-2">{score.label}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${score.color} bg-clip-text text-transparent`}>
                    {score.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {/* Market Size - Large Card */}
              <div className="lg:col-span-2 bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="text-orange" size={20} />
                  Market Opportunity
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange to-orange-hover rounded-xl p-4 text-white">
                    <p className="text-xs opacity-80 font-mono">ARR POTENTIAL</p>
                    <p className="text-2xl font-bold mt-1">$1M-$10M</p>
                  </div>
                  <div className="bg-[#0A0F1C] rounded-xl p-4">
                    <p className="text-xs text-white/50 font-mono">KEYWORD VOLUME</p>
                    <p className="text-2xl font-bold text-white mt-1">14K</p>
                    <p className="text-xs text-white/40">monthly searches</p>
                  </div>
                  <div className="bg-[#0A0F1C] rounded-xl p-4">
                    <p className="text-xs text-white/50 font-mono">AVG JOB VALUE</p>
                    <p className="text-2xl font-bold text-white mt-1">$250-500</p>
                    <p className="text-xs text-white/40">per emergency call</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-[#0A0F1C] rounded-xl">
                  <p className="text-white/70 text-sm">
                    <span className="text-orange font-semibold">&quot;wildlife removal near me&quot;</span> — 14K monthly searches, 
                    zero marketplace results. Highly fragmented market with local operators, no centralized platform.
                  </p>
                </div>
              </div>

              {/* Execution */}
              <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="text-blue" size={20} />
                  Execution
                </h3>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-blue">3</p>
                    <p className="text-white/50 text-sm">/10 difficulty</p>
                    <p className="text-white/30 text-xs mt-2">1-2 week MVP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Signals */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="text-orange" size={20} />
                Validation Signals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { source: "r/Rochester", quote: "Try calling The Bat-Man Wildlife... open 24 hours", date: "March 2025" },
                  { source: "r/Columbus", quote: "24-hour raccoon removal?", date: "Feb 2023" },
                  { source: "r/philadelphia", quote: "is there anything I can do about an animal in my ceiling?", date: "Jan 2023" },
                ].map((signal, i) => (
                  <div key={i} className="bg-[#0A0F1C] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-orange/20 flex items-center justify-center">
                        <span className="text-orange text-xs font-bold">R</span>
                      </div>
                      <span className="text-white/70 text-sm font-medium">{signal.source}</span>
                    </div>
                    <p className="text-white/50 text-sm italic">&quot;{signal.quote}&quot;</p>
                    <p className="text-white/30 text-xs mt-2">{signal.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competition */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="text-blue" size={20} />
                Competitive Landscape
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Company</th>
                      <th className="text-center py-3 px-4 text-white/50 text-sm font-medium">Real-time</th>
                      <th className="text-center py-3 px-4 text-white/50 text-sm font-medium">Dispatch</th>
                      <th className="text-center py-3 px-4 text-white/50 text-sm font-medium">Transparent</th>
                      <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Weakness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 bg-orange/5">
                      <td className="py-3 px-4 text-white font-medium flex items-center gap-2">
                        <Star size={14} className="text-orange" />
                        Critter On Call
                      </td>
                      <td className="py-3 px-4 text-center"><CheckCircle2 size={18} className="text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><CheckCircle2 size={18} className="text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><CheckCircle2 size={18} className="text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-white/50 text-sm">New entrant</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70">Critter Control</td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-white/50 text-sm">Phone-only, slow response</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70">Thumbtack</td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><CheckCircle2 size={18} className="text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-white/50 text-sm">Directory, not dispatch</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white/70">Yelp/HomeGuide</td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-center"><XCircle size={18} className="text-red-500/50 mx-auto" /></td>
                      <td className="py-3 px-4 text-white/50 text-sm">Generic listings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* GTM Section */}
        <section id="gtm" className="min-h-screen p-6 lg:p-12 bg-[#0D1117]">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-blue/20 via-blue/10 to-orange/20 p-8 lg:p-12 mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/20 text-blue-light text-sm font-medium mb-4">
                  <Target size={14} />
                  Go-to-Market Plan
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Launch Strategy
                </h2>
                <p className="text-white/70 text-lg max-w-2xl">
                  Soft launch in 3 test markets, prove lead quality, then geographic expansion based on operator demand.
                </p>
              </div>
            </div>

            {/* Target Audience */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {[
                { 
                  type: "Primary", 
                  audience: "Homeowners",
                  desc: "Suburban/rural areas experiencing wildlife emergencies",
                  color: "from-orange to-orange-hover"
                },
                { 
                  type: "Secondary", 
                  audience: "Property Managers",
                  desc: "Multi-unit portfolios needing consistent coverage",
                  color: "from-blue to-blue-hover"
                },
                { 
                  type: "Tertiary", 
                  audience: "Insurance Companies",
                  desc: "Referring policyholders for covered incidents",
                  color: "from-purple-500 to-purple-600"
                },
              ].map((target) => (
                <div key={target.type} className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
                  <div className={`inline-flex px-2 py-1 rounded text-xs font-bold bg-gradient-to-r ${target.color} text-white mb-3`}>
                    {target.type}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{target.audience}</h4>
                  <p className="text-white/50 text-sm">{target.desc}</p>
                </div>
              ))}
            </div>

            {/* Distribution Channels */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Megaphone className="text-orange" size={20} />
                Distribution Channels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    channel: "SEO",
                    strategy: "Optimize for \"wildlife removal near me\" (14K monthly) + local variations",
                    priority: "High"
                  },
                  { 
                    channel: "Google Local Services",
                    strategy: "Target emergency keywords after-hours when competition sleeps",
                    priority: "High"
                  },
                  { 
                    channel: "Operator Partnerships",
                    strategy: "Revenue share for overflow leads they can't handle",
                    priority: "Medium"
                  },
                  { 
                    channel: "Community",
                    strategy: "Nextdoor + local Facebook groups for trust building",
                    priority: "Medium"
                  },
                ].map((item) => (
                  <div key={item.channel} className="bg-[#0A0F1C] rounded-xl p-5 flex gap-4">
                    <div className={`w-2 rounded-full ${item.priority === "High" ? "bg-orange" : "bg-blue"}`} />
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.channel}</h4>
                      <p className="text-white/50 text-sm">{item.strategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Phases */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Zap className="text-blue" size={20} />
                Launch Timeline
              </h3>
              <div className="space-y-6">
                <div className="relative pl-8 pb-8 border-l-2 border-orange">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-orange" />
                  <div className="bg-[#0A0F1C] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-orange font-mono text-sm font-bold">PHASE 1</span>
                      <span className="text-white/40 text-sm">Weeks 1-4</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">Soft Launch — 3 Test Markets</h4>
                    <ul className="text-white/50 text-sm space-y-1">
                      <li>• Partner with 10-15 operators per market</li>
                      <li>• Free tier for homeowners, prove lead quality</li>
                      <li>• Collect testimonials from both sides</li>
                    </ul>
                  </div>
                </div>
                <div className="relative pl-8 border-l-2 border-blue">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue" />
                  <div className="bg-[#0A0F1C] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-blue font-mono text-sm font-bold">PHASE 2</span>
                      <span className="text-white/40 text-sm">Months 2-3</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">Geographic Expansion</h4>
                    <ul className="text-white/50 text-sm space-y-1">
                      <li>• Launch in 10 new markets based on demand</li>
                      <li>• Introduce $9.99/mo priority tier</li>
                      <li>• Property manager outreach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Strategy */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <DollarSign className="text-orange" size={20} />
                Pricing Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0A0F1C] rounded-xl p-5 border border-white/5">
                  <p className="text-white/40 text-sm mb-2">FREE</p>
                  <p className="text-2xl font-bold text-white mb-3">$0</p>
                  <p className="text-white/50 text-sm">Basic connection — no priority dispatch</p>
                </div>
                <div className="bg-gradient-to-br from-orange/20 to-orange/5 rounded-xl p-5 border border-orange/30">
                  <p className="text-orange text-sm mb-2">PRIORITY</p>
                  <p className="text-2xl font-bold text-white mb-3">$9.99<span className="text-lg text-white/50">/mo</span></p>
                  <p className="text-white/50 text-sm">After-hours priority dispatch + status updates</p>
                </div>
                <div className="bg-[#0A0F1C] rounded-xl p-5 border border-white/5">
                  <p className="text-blue-light text-sm mb-2">PROPERTY MANAGER</p>
                  <p className="text-2xl font-bold text-white mb-3">$49<span className="text-lg text-white/50">/mo</span></p>
                  <p className="text-white/50 text-sm">Portfolio coverage for multiple properties</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-gradient-to-br from-orange/10 to-blue/10 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="text-white" size={20} />
                Success Metrics
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { metric: "North Star", value: "Connections", desc: "Successful help delivered" },
                  { metric: "CAC Target", value: "<$50", desc: "Cost per operator signup" },
                  { metric: "Retention", value: ">60%", desc: "Operator 30-day active" },
                  { metric: "Month 6", value: "500", desc: "Connections/month" },
                ].map((item) => (
                  <div key={item.metric} className="text-center">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.metric}</p>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Section */}
        <section id="marketing" className="min-h-screen p-6 lg:p-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-500/20 via-orange/10 to-blue/20 p-8 lg:p-12 mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                  <Megaphone size={14} />
                  Marketing Strategy
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Positioning & Messaging
                </h2>
                <p className="text-white/70 text-lg max-w-2xl">
                  Calm, confident dispatch operator — not a scared homeowner. Uber for emergencies.
                </p>
              </div>
            </div>

            {/* Positioning Statement */}
            <div className="bg-[#1A1F2E] rounded-2xl p-8 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">Positioning Statement</h3>
              <div className="space-y-4 text-lg">
                <p><span className="text-white/40">For</span> <span className="text-white font-medium">homeowners with sudden wildlife emergencies</span></p>
                <p><span className="text-white/40">Who</span> <span className="text-white font-medium">can&apos;t find help after-hours and hate waiting</span></p>
                <p><span className="text-white/40">Critter On Call is a</span> <span className="text-orange font-medium">real-time dispatch platform</span></p>
                <p><span className="text-white/40">That</span> <span className="text-white font-medium">connects you with operators in minutes, not hours</span></p>
                <p><span className="text-white/40">Unlike</span> <span className="text-white/50">directories that make you call around</span></p>
                <p><span className="text-white/40">We</span> <span className="text-blue-light font-medium">dispatch instantly with live ETA tracking like Uber</span></p>
              </div>
            </div>

            {/* Messaging Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange to-orange-hover rounded-2xl p-6 text-white">
                <Zap size={32} className="mb-4 opacity-80" />
                <h4 className="text-xl font-bold mb-2">Speed</h4>
                <p className="text-white/80">&quot;Help is 12 minutes away&quot;</p>
                <p className="text-white/60 text-sm mt-2">Not &quot;we&apos;ll call you back&quot;</p>
              </div>
              <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
                <MapPin size={32} className="mb-4 text-blue" />
                <h4 className="text-xl font-bold text-white mb-2">Tracking</h4>
                <p className="text-white/70">&quot;See your operator on the map&quot;</p>
                <p className="text-white/40 text-sm mt-2">Real-time ETA like Uber</p>
              </div>
              <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
                <Shield size={32} className="mb-4 text-green-500" />
                <h4 className="text-xl font-bold text-white mb-2">Trust</h4>
                <p className="text-white/70">&quot;Transparent pricing upfront&quot;</p>
                <p className="text-white/40 text-sm mt-2">No surprise fees in panic</p>
              </div>
            </div>

            {/* Target User */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="text-orange" size={20} />
                Target User Profile
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <h4 className="text-white font-medium mb-3">Demographics</h4>
                  <ul className="text-white/50 text-sm space-y-2">
                    <li>• <span className="text-white/70">Age:</span> 30-65 years old</li>
                    <li>• <span className="text-white/70">Location:</span> Suburban/rural areas</li>
                    <li>• <span className="text-white/70">Income:</span> Middle-class+</li>
                    <li>• <span className="text-white/70">Tech:</span> Not tech-savvy in panic mode</li>
                  </ul>
                </div>
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <h4 className="text-white font-medium mb-3">Psychographics</h4>
                  <ul className="text-white/50 text-sm space-y-2">
                    <li>• Want immediate help, not research</li>
                    <li>• &quot;Just fix this NOW&quot; mentality</li>
                    <li>• Prefer texting over calling</li>
                    <li>• Priority: <span className="text-orange">Speed</span> &gt; Price &gt; Credentials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Anti-Patterns */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="text-warning" size={20} />
                What We Won&apos;t Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { dont: "Fear-based imagery", why: "No scary raccoons/bats with fangs" },
                  { dont: "Green/brown earth tones", why: "Screams 'pest control exterminator'" },
                  { dont: "\"Call us\" CTAs", why: "Too much friction in emergency" },
                  { dont: "Hidden pricing", why: "Breaks trust in panic moment" },
                  { dont: "Multi-step forms", why: "3+ pages loses panicked users" },
                  { dont: "Traditional layout", why: "No about → services → contact maze" },
                ].map((item) => (
                  <div key={item.dont} className="flex items-start gap-3 bg-[#0A0F1C] rounded-xl p-4">
                    <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-white font-medium">{item.dont}</p>
                      <p className="text-white/40 text-sm">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand Section */}
        <section id="brand" className="min-h-screen p-6 lg:p-12 bg-[#0D1117]">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-orange/30 via-orange/20 to-blue/30 p-8 lg:p-12 mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
                  <Palette size={14} />
                  Brand System
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Visual Identity
                </h2>
                <p className="text-white/70 text-lg max-w-2xl">
                  Urgent orange for action. Calm blue for reassurance. Tech product aesthetic, not pest control.
                </p>
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">Color Palette</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl overflow-hidden">
                  <div className="h-24 bg-[#FF6B35]" />
                  <div className="bg-[#0A0F1C] p-4">
                    <p className="text-white font-medium">Urgent Orange</p>
                    <p className="text-white/40 font-mono text-sm">#FF6B35</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <div className="h-24 bg-[#004E89]" />
                  <div className="bg-[#0A0F1C] p-4">
                    <p className="text-white font-medium">Calm Blue</p>
                    <p className="text-white/40 font-mono text-sm">#004E89</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <div className="h-24 bg-[#10B981]" />
                  <div className="bg-[#0A0F1C] p-4">
                    <p className="text-white font-medium">Success</p>
                    <p className="text-white/40 font-mono text-sm">#10B981</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <div className="h-24 bg-[#F59E0B]" />
                  <div className="bg-[#0A0F1C] p-4">
                    <p className="text-white font-medium">Warning</p>
                    <p className="text-white/40 font-mono text-sm">#F59E0B</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">Typography</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Display</p>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>Space Grotesk</p>
                  <p className="text-white/40 text-sm mt-2">Hero headlines only</p>
                </div>
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Body/UI</p>
                  <p className="text-3xl font-medium text-white">Instrument Sans</p>
                  <p className="text-white/40 text-sm mt-2">Paragraphs, buttons, UI</p>
                </div>
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Mono</p>
                  <p className="text-3xl text-white font-mono">JetBrains Mono</p>
                  <p className="text-white/40 text-sm mt-2">ETA countdown, data</p>
                </div>
              </div>
            </div>

            {/* Components */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">Components</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Buttons */}
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Buttons</p>
                  <div className="space-y-4">
                    <button className="w-full bg-[#FF6B35] hover:bg-[#E5572C] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-orange/25">
                      Get Help Now
                    </button>
                    <button className="w-full bg-transparent text-white border-2 border-[#004E89] hover:bg-[#004E89]/20 px-6 py-3 rounded-lg font-semibold transition-all">
                      I&apos;m an Operator
                    </button>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="bg-[#0A0F1C] rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Status Badges</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-[#F59E0B] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">Pending</span>
                    <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">Accepted</span>
                    <span className="bg-[#004E89] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase animate-pulse">En Route</span>
                    <span className="bg-[#FF6B35] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">Urgent</span>
                  </div>
                </div>

                {/* ETA Countdown */}
                <div className="bg-[#0A0F1C] rounded-xl p-5 lg:col-span-2">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-4">ETA Countdown</p>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <p className="text-5xl font-mono font-bold text-[#004E89]">12</p>
                      <p className="text-white/40 text-sm">Normal state</p>
                    </div>
                    <div className="text-center">
                      <p className="text-5xl font-mono font-bold text-[#FF6B35] animate-pulse">3</p>
                      <p className="text-white/40 text-sm">Imminent (&lt;5 min)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-6">Card Styles</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border-l-4 border-l-[#FF6B35] shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Urgent</span>
                    </div>
                    <span className="text-gray-400 text-sm">3 min ago</span>
                  </div>
                  <h4 className="text-gray-900 font-semibold text-lg mb-2">Raccoon in chimney</h4>
                  <p className="text-gray-500 text-sm mb-4">1234 Main St, Columbus OH • 2.3 miles</p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#FF6B35] text-white py-2 rounded-lg font-semibold text-sm">Accept Job</button>
                    <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-semibold text-sm">Decline</button>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm mb-2">Operator En Route</p>
                    <p className="text-5xl font-mono font-bold text-[#004E89]">12</p>
                    <p className="text-gray-400 text-sm">minutes</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#004E89] flex items-center justify-center">
                        <span className="text-white font-bold">WP</span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">Wildlife Pros</p>
                        <p className="text-gray-400 text-sm">⭐ 4.9 (127 jobs)</p>
                      </div>
                      <Phone className="ml-auto text-[#004E89]" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-6 lg:p-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-white/40 text-sm">
              Critter On Call — Emergency Wildlife Removal Dispatch
            </p>
            <p className="text-white/20 text-xs mt-2">
              Part of the ChimeStream Portfolio
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
