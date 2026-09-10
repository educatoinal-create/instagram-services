"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type ServiceKey = "followers" | "likes" | "views" | "comments";

const pricing: Record<
  ServiceKey,
  { id: string; label: string; price: number }[]
> = {
  followers: [
    { id: "1k", label: "1,000 Followers", price: 199 },
    { id: "5k", label: "5,000 Followers", price: 899 },
    { id: "10k", label: "10,000 Followers", price: 1799 },
  ],
  likes: [
    { id: "1k", label: "1,000 Likes", price: 59 },
    { id: "5k", label: "5,000 Likes", price: 249 },
    { id: "10k", label: "10,000 Likes", price: 449 },
  ],
  views: [
    { id: "10k", label: "10,000 Views", price: 79 },
    { id: "50k", label: "50,000 Views", price: 299 },
    { id: "100k", label: "100,000 Views", price: 549 },
  ],
  comments: [
    { id: "100", label: "100 Comments", price: 149 },
    { id: "500", label: "500 Comments", price: 599 },
    { id: "1k", label: "1,000 Comments", price: 999 },
  ],
};

const serviceNames: Record<ServiceKey, string> = {
  followers: "Instagram Followers",
  likes: "Instagram Likes",
  views: "Instagram Views",
  comments: "Instagram Comments",
};

const generateOrderId = () => {
  return (
    "IB-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  );
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const serviceParam =
    (searchParams.get("service") as ServiceKey) || "followers";

  const packageParam = searchParams.get("package") || "";

  const service: ServiceKey = pricing[serviceParam]
    ? serviceParam
    : "followers";

  const selectedPackage = useMemo(() => {
    const packages = pricing[service];

    return (
      packages.find((item) => item.id === packageParam) ||
      packages[0]
    );
  }, [service, packageParam]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [utr, setUtr] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState("");

  const isValid =
    name.trim().length >= 2 &&
    email.includes("@") &&
    details.trim().length >= 2 &&
    utr.trim().length >= 4;

  const upiUrl =
    `upi://pay?pa=master704@ptyes` +
    `&pn=InstaBoost` +
    `&am=${selectedPackage.price}` +
    `&cu=INR`;

  const handlePayNow = () => {
    window.location.href = upiUrl;
  };

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    const orderId = generateOrderId();

    const { error: insertError } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        service: serviceNames[service],
        package: selectedPackage.label,
        price: selectedPackage.price,
        details: details.trim(),
        name: name.trim(),
        email: email.trim(),
        utr: utr.trim(),
        status: "Verification Pending",
      });

    if (insertError) {
      console.error("SUPABASE INSERT ERROR:", insertError);

      setError(
        `Order create nahi ho paaya: ${insertError.message}`
      );

      setIsSubmitting(false);
      return;
    }

    setCreatedOrderId(orderId);
    setIsSubmitting(false);
  };

  /* =========================
     SUCCESS SCREEN
  ========================= */

  if (createdOrderId) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#070708] text-white">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-220px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[140px]" />
          <div className="absolute bottom-[-150px] right-[-150px] h-[300px] w-[300px] rounded-full bg-pink-600/[0.06] blur-[110px]" />
        </div>

        {/* NAVBAR */}
        <header className="border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-[68px] max-w-7xl items-center px-4 sm:min-h-[72px] sm:px-6">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-xl shadow-lg shadow-purple-500/20">
                ◎
              </div>

              <div className="min-w-0">
                <div className="truncate text-[16px] font-bold sm:text-[17px]">
                  InstaBoost
                </div>

                <div className="text-[10px] text-zinc-500 sm:text-[11px]">
                  Instagram Services
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* SUCCESS */}
        <section className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-2xl items-center px-4 py-8 sm:min-h-[calc(100vh-72px)] sm:px-6 sm:py-16">
          <div className="w-full rounded-[28px] border border-white/10 bg-white/[0.035] p-5 text-center shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-10 md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-2xl text-green-400 sm:h-20 sm:w-20 sm:text-3xl">
              ✓
            </div>

            <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-green-400 sm:text-xs sm:tracking-[0.2em]">
              Order Created
            </div>

            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Order received
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500 sm:text-[15px]">
              Your payment details have been submitted.
              Your order is now waiting for payment
              verification.
            </p>

            <div className="mx-auto mt-7 w-full max-w-sm rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-4 sm:p-5">
              <div className="text-xs text-zinc-600">
                Your Order ID
              </div>

              <div className="mt-2 break-all font-mono text-xl font-black text-purple-300 sm:text-2xl">
                {createdOrderId}
              </div>

              <div className="mt-2 text-xs leading-5 text-zinc-700">
                Save this ID to track your order.
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2">
              <Link
                href={`/track-order?order=${createdOrderId}`}
                className="flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.99]"
              >
                Track Order
              </Link>

              <Link
                href="/"
                className="flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
              >
                Back Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =========================
     CHECKOUT
  ========================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070708] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-240px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[140px]" />

        <div className="absolute right-[-180px] top-[48%] h-[320px] w-[320px] rounded-full bg-pink-600/[0.05] blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:min-h-[72px] sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-xl shadow-lg shadow-purple-500/20">
              ◎
            </div>

            <div className="min-w-0">
              <div className="truncate text-[16px] font-bold sm:text-[17px]">
                InstaBoost
              </div>

              <div className="text-[10px] text-zinc-500 sm:text-[11px]">
                Instagram Services
              </div>
            </div>
          </Link>

          <Link
            href="/services"
            className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-zinc-400 transition hover:bg-white/[0.08] hover:text-white sm:px-4 sm:text-sm"
          >
            ← Services
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        {/* HEADING */}
        <div className="mb-8 sm:mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400 sm:text-xs sm:tracking-[0.2em]">
            Checkout
          </div>

          <h1 className="mt-2.5 text-3xl font-black leading-tight tracking-tight sm:mt-3 sm:text-4xl md:text-5xl">
            Complete your order
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:mt-4 sm:text-base">
            Review your order, make the UPI payment and
            submit your transaction details.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid items-start gap-5 md:gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* CUSTOMER DETAILS */}
            <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-5 shadow-xl shadow-black/10 sm:rounded-3xl sm:p-7">
              <div className="mb-5 sm:mb-6">
                <h2 className="text-lg font-bold sm:text-xl">
                  Customer details
                </h2>

                <p className="mt-1 text-xs leading-5 text-zinc-600 sm:text-sm">
                  These details are used for your order.
                </p>
              </div>

              <div className="space-y-5">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 sm:py-3.5"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 sm:py-3.5"
                  />
                </div>

                {/* INSTAGRAM DETAILS */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Instagram Details
                  </label>

                  <input
                    type="text"
                    value={details}
                    onChange={(e) =>
                      setDetails(e.target.value)
                    }
                    placeholder={
                      service === "followers"
                        ? "@yourusername"
                        : "Instagram post/reel URL"
                    }
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 sm:py-3.5"
                  />

                  <p className="mt-2 text-xs leading-5 text-zinc-700">
                    Never enter your Instagram password.
                  </p>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-5 shadow-xl shadow-black/10 sm:rounded-3xl sm:p-7">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold sm:text-xl">
                      Pay via UPI
                    </h2>

                    <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
                      Pay the exact amount and then enter your
                      transaction ID below.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-lg border border-green-500/20 bg-green-500/10 px-2.5 py-1.5 text-[10px] font-bold text-green-400 sm:text-xs">
                    UPI
                  </div>
                </div>
              </div>

              {/* PAYMENT INFO */}
              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.05] p-4 sm:p-5">
                <div className="text-xs text-zinc-600">
                  Amount to Pay
                </div>

                <div className="mt-1 text-3xl font-black sm:text-4xl">
                  {formatPrice(selectedPackage.price)}
                </div>

                <div className="mt-5">
                  <div className="text-xs text-zinc-600">
                    UPI ID
                  </div>

                  <div className="mt-1 break-all font-mono text-sm font-bold text-purple-300 sm:text-base">
                    master704@ptyes
                  </div>
                </div>
              </div>

              {/* UPI BUTTON */}
              <button
                type="button"
                onClick={handlePayNow}
                className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/10 transition hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0"
              >
                Pay ₹{selectedPackage.price} via UPI →
              </button>

              {/* UTR */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  UTR / Transaction ID
                </label>

                <input
                  type="text"
                  value={utr}
                  onChange={(e) =>
                    setUtr(e.target.value)
                  }
                  placeholder="Enter your UTR / transaction ID"
                  inputMode="numeric"
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-mono outline-none transition placeholder:font-sans placeholder:text-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 sm:py-3.5"
                />

                <p className="mt-2 text-xs leading-5 text-zinc-700">
                  Enter the transaction reference shown
                  after your UPI payment.
                </p>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4 text-sm leading-6 text-red-300">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className={`flex min-h-13 w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-bold transition sm:min-h-14 ${
                isValid && !isSubmitting
                  ? "bg-white text-black shadow-xl shadow-white/5 hover:-translate-y-0.5 hover:bg-zinc-200 active:translate-y-0"
                  : "cursor-not-allowed bg-white/[0.08] text-zinc-600"
              }`}
            >
              {isSubmitting
                ? "Creating Order..."
                : "Submit Payment & Create Order"}
            </button>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:text-xs">
                Order Summary
              </div>

              <div className="mt-5">
                <div className="break-words text-lg font-bold sm:text-xl">
                  {serviceNames[service]}
                </div>

                <div className="mt-2 text-sm leading-5 text-zinc-500">
                  {selectedPackage.label}
                </div>
              </div>

              <div className="my-5 h-px bg-white/[0.08] sm:my-6" />

              {/* SUMMARY ROWS */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-zinc-600">
                    Service
                  </span>

                  <span className="max-w-[60%] text-right text-sm font-semibold">
                    {formatPrice(selectedPackage.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-600">
                    Payment
                  </span>

                  <span className="text-sm font-semibold text-green-400">
                    UPI
                  </span>
                </div>
              </div>

              <div className="my-5 h-px bg-white/[0.08] sm:my-6" />

              <div className="flex items-end justify-between gap-4">
                <span className="text-sm text-zinc-500">
                  Total
                </span>

                <span className="text-3xl font-black sm:text-4xl">
                  {formatPrice(selectedPackage.price)}
                </span>
              </div>

              {/* IMPORTANT */}
              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  Important
                </div>

                <p className="mt-2 text-xs leading-5 text-zinc-700">
                  Payment verification is manual. After
                  submitting your UTR, your order will start
                  as Verification Pending.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-4 border-t border-white/[0.07] px-4 py-8 sm:mt-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-6xl text-center text-[11px] text-zinc-700 sm:text-xs">
          © 2026 InstaBoost. Demo website.
        </div>
      </footer>
    </main>
  );
}