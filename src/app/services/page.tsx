"use client";

import Link from "next/link";

type Service = {
  id: string;
  icon: string;
  name: string;
  description: string;
  input: string;
  price: number;
  startingPackage: string;
};

const services: Service[] = [
  {
    id: "followers",
    icon: "👥",
    name: "Instagram Followers",
    description:
      "Select a follower package for your Instagram account.",
    input: "Username",
    price: 199,
    startingPackage: "1,000 Followers",
  },
  {
    id: "likes",
    icon: "❤️",
    name: "Instagram Likes",
    description:
      "Select a likes package for your Instagram post.",
    input: "Post Link",
    price: 59,
    startingPackage: "1,000 Likes",
  },
  {
    id: "views",
    icon: "▶️",
    name: "Instagram Views",
    description:
      "Select a views package for your Instagram Reel or video.",
    input: "Post / Reel Link",
    price: 79,
    startingPackage: "10,000 Views",
  },
  {
    id: "comments",
    icon: "💬",
    name: "Instagram Comments",
    description:
      "Select a comments package for your Instagram post.",
    input: "Post Link",
    price: 99,
    startingPackage: "100 Comments",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute right-[-200px] top-[45%] h-[450px] w-[450px] rounded-full bg-pink-600/[0.06] blur-[140px]" />

        <div className="absolute bottom-[-250px] left-[-200px] h-[450px] w-[450px] rounded-full bg-orange-500/[0.04] blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070708]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-xl shadow-lg shadow-purple-500/20 transition duration-300 group-hover:scale-105 group-hover:shadow-purple-500/30">
              ◎
            </div>

            <div>
              <div className="text-[17px] font-bold">
                InstaBoost
              </div>

              <div className="text-[11px] text-zinc-500">
                Instagram Services
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/services"
              className="text-sm font-medium text-white"
            >
              Services
            </Link>

            <Link
              href="/track-order"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Track Order
            </Link>

            <Link
              href="/faq"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              FAQ
            </Link>
          </nav>

          {/* Order button */}
          <Link
            href="/services"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 active:scale-95"
          >
            Order Now
          </Link>
        </div>
      </header>

      {/* Page */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        {/* Heading */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-400">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

            Instagram Services
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Choose a service
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            Select the Instagram service you need. Choose your
            package and continue to the order page.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.045] hover:shadow-2xl hover:shadow-purple-950/10"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl transition duration-300 group-hover:scale-105 group-hover:border-purple-500/20">
                  {service.icon}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[10px] text-zinc-500">
                  {service.input}
                </div>
              </div>

              {/* Content */}
              <div className="mt-7">
                <h2 className="text-lg font-bold">
                  {service.name}
                </h2>

                <p className="mt-2 min-h-[52px] text-sm leading-6 text-zinc-500">
                  {service.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-auto border-t border-white/[0.08] pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs text-zinc-600">
                      Starting from
                    </div>

                    <div className="mt-1 text-xl font-black">
                      {formatPrice(service.price)}
                    </div>

                    <div className="mt-1 text-xs text-zinc-600">
                      {service.startingPackage}
                    </div>
                  </div>

                  <Link
                    href={`/order?service=${service.id}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-lg active:scale-95"
                    aria-label={`Order ${service.name}`}
                  >
                    →
                  </Link>
                </div>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-purple-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Trust section */}
        <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div>
              <div className="text-sm font-semibold text-zinc-300">
                Simple & transparent pricing
              </div>

              <div className="mt-1 text-xs text-zinc-600">
                Choose your package first. Final price is shown
                before checkout.
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-600">
              <span>🔒 Secure checkout</span>
              <span>🇮🇳 INR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] px-5 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © 2026 InstaBoost. Demo website.
          </div>

          <div>
            Secure checkout • INR pricing • No password required
          </div>
        </div>
      </footer>
    </main>
  );
}