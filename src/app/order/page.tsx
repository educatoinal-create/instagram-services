"use client";

import Link from "next/link";
import { useState } from "react";

const services = {
  followers: {
    name: "Instagram Followers",
    icon: "👥",
    description: "Grow your Instagram audience with follower packages.",
    packages: [
      { id: "1k", label: "1,000 Followers", price: 199 },
      { id: "5k", label: "5,000 Followers", price: 899 },
      { id: "10k", label: "10,000 Followers", price: 1799 },
    ],
  },

  likes: {
    name: "Instagram Likes",
    icon: "❤️",
    description: "Increase engagement on your Instagram posts.",
    packages: [
      { id: "1k", label: "1,000 Likes", price: 59 },
      { id: "5k", label: "5,000 Likes", price: 249 },
      { id: "10k", label: "10,000 Likes", price: 449 },
    ],
  },

  views: {
    name: "Instagram Views",
    icon: "▶️",
    description: "Boost views on your Instagram videos and reels.",
    packages: [
      { id: "10k", label: "10,000 Views", price: 79 },
      { id: "50k", label: "50,000 Views", price: 299 },
      { id: "100k", label: "100,000 Views", price: 499 },
    ],
  },

  comments: {
    name: "Instagram Comments",
    icon: "💬",
    description: "Add more engagement to your Instagram posts.",
    packages: [
      { id: "100", label: "100 Comments", price: 99 },
      { id: "500", label: "500 Comments", price: 399 },
      { id: "1k", label: "1,000 Comments", price: 699 },
    ],
  },
};

type ServiceKey = keyof typeof services;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function OrderPage() {
  const [service, setService] =
    useState<ServiceKey>("followers");

  const [selectedPackage, setSelectedPackage] =
    useState("1k");

  const [username, setUsername] = useState("");

  const currentService = services[service];

  const currentPackage =
    currentService.packages.find(
      (item) => item.id === selectedPackage
    ) || currentService.packages[0];

  const checkoutUrl =
    `/checkout?service=${encodeURIComponent(service)}` +
    `&package=${encodeURIComponent(currentPackage.id)}` +
    `&details=${encodeURIComponent(username)}`;

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

        <div className="absolute right-[-200px] top-[45%] h-[450px] w-[450px] rounded-full bg-pink-600/[0.06] blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070708]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-xl shadow-lg shadow-purple-500/20">
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

          <Link
            href="/services"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Page */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16">
        {/* Heading */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
            Create Order
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Choose your package
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Select a service, choose your package and enter
            your Instagram details to continue.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Service selector */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
              <h2 className="text-xl font-bold">
                1. Select service
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(Object.keys(services) as ServiceKey[]).map(
                  (key) => {
                    const item = services[key];
                    const active = service === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setService(key);
                          setSelectedPackage(
                            services[key].packages[0].id
                          );
                        }}
                        className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                          active
                            ? "border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/5"
                            : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-xl">
                            {item.icon}
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold">
                              {item.name}
                            </div>

                            <div className="mt-1 text-xs text-zinc-600">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Package */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
              <h2 className="text-xl font-bold">
                2. Select package
              </h2>

              <div className="mt-5 space-y-3">
                {currentService.packages.map((item) => {
                  const active =
                    selectedPackage === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setSelectedPackage(item.id)
                      }
                      className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
                        active
                          ? "border-purple-500/50 bg-purple-500/10"
                          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            active
                              ? "border-purple-400 bg-purple-500"
                              : "border-zinc-700"
                          }`}
                        >
                          {active && (
                            <div className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </div>

                        <div>
                          <div className="font-semibold">
                            {item.label}
                          </div>

                          <div className="mt-1 text-xs text-zinc-600">
                            Selected package
                          </div>
                        </div>
                      </div>

                      <div className="text-lg font-black">
                        {formatPrice(item.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instagram details */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
              <h2 className="text-xl font-bold">
                3. Instagram details
              </h2>

              <p className="mt-1 text-sm text-zinc-600">
                Enter the username or post/reel URL.
              </p>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  {service === "followers"
                    ? "Instagram Username"
                    : "Instagram Username / Post URL"}
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder={
                    service === "followers"
                      ? "@yourusername"
                      : "https://instagram.com/..."
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition placeholder:text-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                />

                <p className="mt-2 text-xs text-zinc-700">
                  Never enter your Instagram password.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
                  Order Summary
                </div>

                <h2 className="mt-2 text-2xl font-bold">
                  Review order
                </h2>
              </div>

              {/* Service */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-xl">
                  {currentService.icon}
                </div>

                <div>
                  <div className="text-sm font-semibold">
                    {currentService.name}
                  </div>

                  <div className="mt-1 text-xs text-zinc-600">
                    {currentPackage.label}
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-white/[0.08]" />

              {/* Username preview */}
              <div>
                <div className="text-xs text-zinc-600">
                  Instagram Details
                </div>

                <div className="mt-1 break-all text-sm font-medium text-zinc-300">
                  {username || "Not entered yet"}
                </div>
              </div>

              <div className="my-6 h-px bg-white/[0.08]" />

              {/* Price */}
              <div className="flex items-end justify-between gap-4">
                <span className="text-sm text-zinc-500">
                  Total
                </span>

                <span className="text-3xl font-black">
                  {formatPrice(currentPackage.price)}
                </span>
              </div>

              {/* Checkout */}
              <Link
                href={checkoutUrl}
                className="mt-7 block w-full rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-purple-500/20 active:translate-y-0"
              >
                Continue to Checkout →
              </Link>

              <p className="mt-4 text-center text-[11px] leading-5 text-zinc-700">
                You can review your order again before payment.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] px-5 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl text-xs text-zinc-700">
          © 2026 InstaBoost. Demo website.
        </div>
      </footer>
    </main>
  );
}