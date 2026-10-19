import { useState } from "react"

/* ──────────────────────────────────────────────────────────
   Real product screenshots
   ────────────────────────────────────────────────────────── */

function LMSScreenshot() {
  return (
    <img
      src="/images/lms-screenshot.png"
      alt="Foundation LMS Dashboard"
      className="w-full h-full object-cover object-top"
    />
  )
}

function HubScreenshot() {
  return (
    <img
      src="/images/hub-screenshot.png"
      alt="Foundation Hub Dashboard"
      className="w-full h-full object-cover object-top"
    />
  )
}

function FuelScreenshot() {
  return (
    <img
      src="/images/fuel-screenshot.png"
      alt="Foundation Fuel Dashboard"
      className="w-full h-full object-cover object-top"
    />
  )
}

/* ──────────────────────────────────────────────────────────
   Device Frame Component — wraps screenshots in a laptop
   ────────────────────────────────────────────────────────── */

function DeviceMockup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Laptop body */}
      <div className="relative bg-gradient-to-br from-[#1e1e2e] to-[#2d2d3f] rounded-t-xl p-3 pb-0 shadow-2xl">
        {/* Camera notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-600" />
        {/* Screen */}
        <div className="w-full aspect-[16/10] rounded-t-md overflow-hidden bg-white">
          {children}
        </div>
      </div>
      {/* Laptop base */}
      <div className="relative">
        <div className="w-[108%] -ml-[4%] h-3 bg-gradient-to-b from-[#4B5563] to-[#374151] rounded-b-lg" />
        <div className="w-[90%] mx-auto h-1 bg-gradient-to-b from-[#374151] to-[#1F2937] rounded-b" />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Product data
   ────────────────────────────────────────────────────────── */

const products = [
  {
    id: "lms",
    name: "Foundation LMS",
    tagline: "Corporate Learning, Reimagined",
    description:
      "Empower your workforce with personalized learning paths, interactive courses, and real-time progress tracking. Foundation LMS transforms corporate training from a chore into a competitive advantage.",
    features: ["AI-Powered Learning Paths", "Interactive Assessments", "Progress Analytics", "Certification Management", "SCORM & xAPI Support", "Mobile Learning"],
    gradient: "from-indigo-600 to-purple-600",
    glowClass: "glow-primary",
    accentColor: "#4F46E5",
    lightBg: "bg-indigo-50",
    badge: "Most Popular",
    screenshot: <LMSScreenshot />,
  },
  {
    id: "hub",
    name: "Foundation Hub",
    tagline: "Your People, Connected",
    description:
      "Streamline every aspect of employee management — from onboarding to performance reviews, attendance tracking to payroll. Hub is the single platform that keeps your entire organization in sync.",
    features: ["Employee Directory", "Attendance & Leave", "Performance Reviews", "Payroll Integration", "Recruitment Pipeline", "Org Chart & Reporting"],
    gradient: "from-teal-500 to-emerald-600",
    glowClass: "glow-teal",
    accentColor: "#14B8A6",
    lightBg: "bg-teal-50",
    badge: "Enterprise Ready",
    screenshot: <HubScreenshot />,
  },
  {
    id: "fuel",
    name: "Foundation Fuel",
    tagline: "Where Capital Meets Vision",
    description:
      "The all-in-one platform for founders raising capital and investors managing deal flow. Fuel connects startups with the right investors through smart matching, secure data rooms, and transparent pipeline management.",
    features: ["Deal Flow Pipeline", "Investor Matching", "Secure Data Room", "Cap Table Management", "Portfolio Analytics", "Fundraising Tracker"],
    gradient: "from-amber-500 to-orange-600",
    glowClass: "glow-amber",
    accentColor: "#F59E0B",
    lightBg: "bg-amber-50",
    badge: "New Launch",
    screenshot: <FuelScreenshot />,
  },
]

/* ──────────────────────────────────────────────────────────
   Section Components
   ────────────────────────────────────────────────────────── */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Foundation</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Products</a>
          <a href="#flagship" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
          <a href="#stats" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <a href="#cta" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Sign In
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-indigo-200 transition-all">
            Get Started Free
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <a href="#products" className="block text-sm font-medium text-gray-600">Products</a>
          <a href="#flagship" className="block text-sm font-medium text-gray-600">Solutions</a>
          <a href="#stats" className="block text-sm font-medium text-gray-600">About</a>
          <a href="#cta" className="block text-sm font-medium text-gray-600">Contact</a>
          <button className="w-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-purple-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-sm font-medium text-indigo-700">Trusted by 2,000+ companies worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Build Better
            <br />
            <span className="gradient-text">Business Foundations</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Three powerful platforms. One unified ecosystem. Foundation gives your business the tools to learn, manage, and grow — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5">
              Start Free Trial →
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero product previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <a
              key={product.id}
              href={`#${product.id}`}
              className={`group ${index === 0 ? "animate-float" : index === 1 ? "animate-float-delayed" : "animate-float-delayed-2"}`}
            >
              <div className={`relative rounded-2xl overflow-hidden ${product.glowClass} transition-all duration-500 group-hover:scale-105`}>
                <DeviceMockup>
                  {product.screenshot}
                </DeviceMockup>
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${product.gradient} p-4 pt-8`}>
                  <p className="text-white font-bold text-lg">{product.name}</p>
                  <p className="text-white/80 text-sm">{product.tagline}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductsOverview() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-4">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Three Products.{" "}
            <span className="gradient-text">One Mission.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Each platform is powerful on its own. Together, they create an unstoppable ecosystem for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-2"
            >
              {product.badge && (
                <span
                  className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.gradient}`}
                >
                  {product.badge}
                </span>
              )}

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {product.id === "lms" && (
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
                {product.id === "hub" && (
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
                {product.id === "fuel" && (
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm font-semibold mb-3" style={{ color: product.accentColor }}>
                {product.tagline}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: product.accentColor }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={`mt-8 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${product.gradient} hover:shadow-lg transition-all`}
              >
                Explore {product.name.split(" ")[1]} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlagshipProducts() {
  return (
    <section id="flagship" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold mb-4">Flagship Products</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            See Them in{" "}
            <span className="gradient-text">Action</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Dive deeper into each platform with realistic previews of the dashboards your team will use every day.
          </p>
        </div>

        {products.map((product, index) => (
          <div
            key={product.id}
            id={product.id}
            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20 mb-32 last:mb-0`}
          >
            {/* Product info */}
            <div className="flex-1 max-w-xl">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.gradient} mb-4`}>
                {product.badge}
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h3>
              <p className="text-lg font-semibold mb-4" style={{ color: product.accentColor }}>
                {product.tagline}
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${product.lightBg} flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-4 h-4" style={{ color: product.accentColor }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button className={`px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r ${product.gradient} rounded-xl hover:shadow-lg transition-all`}>
                  Try {product.name.split(" ")[1]} Free →
                </button>
                <button className="px-6 py-3 text-sm font-semibold text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all">
                  Learn More
                </button>
              </div>
            </div>

            {/* Product mockup */}
            <div className="flex-1 w-full max-w-2xl">
              <div className={`${product.glowClass} rounded-2xl`}>
                <DeviceMockup>
                  {product.screenshot}
                </DeviceMockup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: "2,000+", label: "Companies Trust Us", icon: "🏢" },
    { value: "500K+", label: "Active Users", icon: "👥" },
    { value: "99.9%", label: "Uptime SLA", icon: "⚡" },
    { value: "4.9/5", label: "Customer Rating", icon: "⭐" },
  ]

  return (
    <section id="stats" className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="cta" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Ready to Build Your{" "}
          <span className="gradient-text">Foundation?</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Join thousands of companies using Foundation to transform their business operations. Start free, scale when you are ready.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5">
            Start Free Trial →
          </button>
          <button className="w-full sm:w-auto px-10 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            Talk to Sales
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">No credit card required · 14-day free trial · Cancel anytime</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-lg font-bold text-white">Foundation</span>
            </div>
            <p className="text-sm leading-relaxed">Building the future of business operations, one platform at a time.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#lms" className="hover:text-white transition-colors">LMS</a></li>
              <li><a href="#hub" className="hover:text-white transition-colors">Hub</a></li>
              <li><a href="#fuel" className="hover:text-white transition-colors">Fuel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          © 2026 Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

/* ──────────────────────────────────────────────────────────
   Main App
   ────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ProductsOverview />
      <FlagshipProducts />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
