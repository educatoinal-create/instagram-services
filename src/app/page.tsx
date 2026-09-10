"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  {
    icon: "👥",
    title: "Instagram Followers",
    description: "Choose a follower package for your Instagram account.",
    slug: "followers",
    price: "From ₹199",
  },
  {
    icon: "❤️",
    title: "Instagram Likes",
    description: "Choose a likes package for your Instagram post.",
    slug: "likes",
    price: "From ₹59",
  },
  {
    icon: "▶",
    title: "Instagram Views",
    description: "Choose a views package for your Instagram content.",
    slug: "views",
    price: "From ₹79",
  },
  {
    icon: "💬",
    title: "Instagram Comments",
    description: "Choose a comments package for your Instagram post.",
    slug: "comments",
    price: "From ₹149",
  },
];

const features = [
  {
    icon: "₹",
    title: "Indian Pricing",
    text: "Simple pricing displayed in Indian Rupees.",
  },
  {
    icon: "⚡",
    title: "Simple Ordering",
    text: "Select a service and place your order in a few steps.",
  },
  {
    icon: "🔒",
    title: "Secure Checkout",
    text: "Checkout flow designed with payment security in mind.",
  },
  {
    icon: "📦",
    title: "Order Tracking",
    text: "Check your order status using your order ID.",
  },
];

const steps = [
  {
    number: "01",
    title: "Select a service",
    text: "Choose followers, likes, views or another available service.",
  },
  {
    number: "02",
    title: "Enter your details",
    text: "Provide the required Instagram username or content link.",
  },
  {
    number: "03",
    title: "Checkout",
    text: "Review your order and continue to the payment step.",
  },
];

export default function Home() {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#070708] text-white">
      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-soft-pulse absolute left-1/2 top-[-220px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[110px] sm:top-[-300px] sm:h-[550px] sm:w-[550px] sm:blur-[140px] lg:h-[650px] lg:w-[650px]" />

        <div className="absolute right-[-180px] top-[35%] h-[320px] w-[320px] rounded-full bg-pink-600/[0.07] blur-[110px] sm:h-[450px] sm:w-[450px] sm:blur-[130px]" />

        <div className="absolute bottom-[10%] left-[-180px] h-[280px] w-[280px] rounded-full bg-purple-600/[0.05] blur-[100px]" />
      </div>

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between px-4 sm:min-h-[72px] sm:px-6 lg:px-8">
          {/* LOGO */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-lg shadow-lg shadow-purple-500/20 sm:h-10 sm:w-10 sm:text-xl">
              ◎
            </div>

            <div className="min-w-0">
              <div className="truncate text-[15px] font-bold tracking-tight sm:text-[17px]">
                InstaBoost
              </div>

              <div className="text-[9px] text-zinc-500 sm:text-[11px]">
                Instagram Services
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm text-white transition-colors hover:text-purple-300"
            >
              Home
            </Link>

            <Link
              href="/services"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Services
            </Link>

            <Link
              href="/track-order"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Track Order
            </Link>

            <Link
              href="/faq"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              FAQ
            </Link>

            <Link
              href="/services"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 active:scale-95"
            >
              Order Now
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:bg-white/[0.08] md:hidden"
          >
            <span className="text-xl leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        {/* MOBILE MENU */}

        <div
          className={`overflow-hidden border-t border-white/[0.07] bg-[#09090a] transition-all duration-300 md:hidden ${
            menuOpen
              ? "max-h-[360px] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-white/[0.05]"
            >
              Home
            </Link>

            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/[0.05] hover:text-white"
            >
              Services
            </Link>

            <Link
              href="/track-order"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/[0.05] hover:text-white"
            >
              Track Order
            </Link>

            <Link
              href="/faq"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/[0.05] hover:text-white"
            >
              FAQ
            </Link>

            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-black"
            >
              Order Now →
            </Link>
          </nav>
        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* BADGE */}

            <div className="animate-fade-up mx-auto mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[10px] text-zinc-300 backdrop-blur sm:mb-7 sm:px-4 sm:text-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>

              <span>Instagram Services • India</span>
            </div>

            {/* HEADING */}

            <h1 className="animate-fade-up-delay text-[42px] font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[78px]">
              Your Instagram.
              <br />

              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                Your Growth.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="animate-fade-up-delay-2 mx-auto mt-5 max-w-2xl px-2 text-[13px] leading-6 text-zinc-400 sm:mt-6 sm:px-0 sm:text-base sm:leading-7 lg:text-lg">
              Choose an Instagram service, select your package and complete
              your order through a simple checkout experience.
            </p>

            {/* CTA */}

            <div className="animate-fade-up-delay-3 mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center">
              <Link
                href="/services"
                className="flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3.5 text-sm font-semibold shadow-xl shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/20 active:scale-[0.98]"
              >
                View Services
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/track-order"
                className="flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] active:scale-[0.98]"
              >
                Track Order
              </Link>
            </div>
          </div>

          {/* =========================
              QUICK START
          ========================= */}

          <div className="animate-fade-up-delay-3 mx-auto mt-10 w-full max-w-4xl sm:mt-16">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-7">
              <div className="mb-4 sm:mb-5">
                <div className="text-base font-bold sm:text-lg">
                  Quick Start
                </div>

                <div className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  Enter your Instagram username to start an order.
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* INPUT */}

                <div className="relative min-w-0 flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    @
                  </span>

                  <input
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value.replace(/\s/g, ""))
                    }
                    placeholder="yourusername"
                    autoComplete="off"
                    className="h-13 w-full rounded-xl border border-white/10 bg-black/30 pl-9 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-purple-500/60 focus:bg-black/50 focus:ring-4 focus:ring-purple-500/10 sm:h-14"
                  />
                </div>

                {/* CONTINUE */}

                <Link
                  href="/services"
                  className="flex h-13 w-full shrink-0 items-center justify-center rounded-xl bg-white px-7 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 active:scale-[0.98] sm:h-14 sm:w-auto"
                >
                  Continue
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BENEFITS
      ========================= */}

      <section className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/[0.07] px-4 sm:grid-cols-2 sm:px-6 sm:divide-y-0 sm:divide-x lg:grid-cols-4 lg:px-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4 px-2 py-6 transition-all duration-300 hover:bg-white/[0.025] sm:block sm:px-6 sm:py-8 lg:px-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <div className="min-w-0 sm:mt-4">
                <h3 className="text-sm font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-zinc-600 sm:mt-2 sm:text-sm">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================= */}

      <section
        id="services"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        {/* SECTION HEADING */}

        <div className="mb-8 sm:mb-12">
          <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400 sm:mb-3 sm:text-xs">
            Services
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-5">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Choose your service
              </h2>

              <p className="mt-2.5 max-w-xl text-sm leading-6 text-zinc-500 sm:mt-3 sm:text-base">
                Select a service to view available packages and place your
                order.
              </p>
            </div>

            <Link
              href="/services"
              className="w-fit text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300"
            >
              View all services →
            </Link>
          </div>
        </div>

        {/* SERVICE CARDS */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {services.map((service, index) => (
            <Link
              href={`/order?service=${service.slug}`}
              key={service.slug}
              className="group animate-card-in min-w-0 rounded-[22px] border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-purple-950/20 sm:rounded-2xl sm:p-6 lg:hover:-translate-y-2"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 sm:mb-7 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                {service.icon}
              </div>

              <h3 className="text-base font-bold sm:text-lg">
                {service.title}
              </h3>

              <p className="mt-2 min-h-0 text-sm leading-6 text-zinc-500 sm:min-h-[48px]">
                {service.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4 sm:mt-7 sm:pt-5">
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-600 sm:text-[11px]">
                    Package pricing
                  </div>

                  <div className="mt-1 truncate text-sm font-semibold text-zinc-300">
                    {service.price}
                  </div>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-black transition-all duration-200 group-hover:translate-x-1">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400 sm:text-xs">
              How It Works
            </div>

            <h2 className="mt-2.5 text-3xl font-bold sm:mt-3 sm:text-4xl">
              Order in three simple steps
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] sm:rounded-2xl sm:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/25 bg-purple-500/10 text-xs font-bold text-purple-300 sm:h-11 sm:w-11 sm:text-sm">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-bold sm:mt-6 sm:text-xl">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-zinc-500 sm:mt-3">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FAQ TEASER
      ========================= */}

      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400 sm:text-xs">
          Need Help?
        </div>

        <h2 className="mt-2.5 text-3xl font-bold sm:mt-3 sm:text-4xl">
          Have questions?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:mt-4 sm:text-base">
          Check our frequently asked questions or contact support if you need
          help with your order.
        </p>

        <div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/faq"
            className="flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-white/[0.08]"
          >
            Read FAQ
          </Link>

          <Link
            href="/contact"
            className="flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-zinc-200"
          >
            Contact Support
          </Link>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="border-t border-white/[0.07] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-bold">InstaBoost</div>

            <p className="mt-1 text-[11px] text-zinc-600 sm:text-xs">
              Instagram services demo platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-zinc-500 sm:gap-x-6">
            <Link href="/services" className="hover:text-white">
              Services
            </Link>

            <Link href="/track-order" className="hover:text-white">
              Track Order
            </Link>

            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-7xl border-t border-white/[0.06] pt-5 text-[10px] text-zinc-700 sm:mt-8 sm:pt-6 sm:text-xs">
          © 2026 InstaBoost. Demo website.
        </div>
      </footer>
    </main>
  );
}