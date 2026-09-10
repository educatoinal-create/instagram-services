"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  service: string;
  package: string;
  price: number;
  details: string;
  name: string;
  email: string;
  utr: string;
  status: string;
  created_at: string;
};

const steps = [
  {
    title: "Order Created",
    description: "Your order has been received.",
  },
  {
    title: "Payment Verification",
    description: "We're verifying your payment.",
  },
  {
    title: "Processing",
    description: "Your Instagram service is being processed.",
  },
  {
    title: "Completed",
    description: "Your order has been completed.",
  },
];

function getStepStatus(currentStatus: string, stepIndex: number) {
  if (currentStatus === "Completed") {
    return "completed";
  }

  if (currentStatus === "Processing") {
    if (stepIndex <= 1) return "completed";
    if (stepIndex === 2) return "active";
    return "pending";
  }

  // Verification Pending
  if (stepIndex === 0) return "completed";
  if (stepIndex === 1) return "active";

  return "pending";
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchOrder(id: string) {
    const cleanId = id.trim();

    if (!cleanId) {
      setError("Please enter your Order ID.");
      setOrder(null);
      return;
    }

    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", cleanId)
      .maybeSingle();

    if (fetchError) {
      console.error("TRACK ORDER ERROR:", fetchError);

      setError(
        `Unable to load order: ${fetchError.message}`
      );

      setOrder(null);
      setLoading(false);
      return;
    }

    if (!data) {
      setError(
        "Order not found. Please check your Order ID."
      );

      setOrder(null);
      setLoading(false);
      return;
    }

    setOrder(data as Order);
    setOrderId(cleanId);
    setLoading(false);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("order");

    if (idFromUrl) {
      setSearchInput(idFromUrl);
      fetchOrder(idFromUrl);
    }
  }, []);

  useEffect(() => {
    if (!orderId) return;

    const channel = supabase
      .channel(`track-order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder(payload.new as Order);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const id = searchInput.trim();

    if (!id) {
      setError("Please enter your Order ID.");
      return;
    }

    window.history.replaceState(
      null,
      "",
      `/track-order?order=${encodeURIComponent(id)}`
    );

    await fetchOrder(id);
  }

  function formatDate(date: string) {
    try {
      return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return date;
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-300">
            InstaBoost
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Track Your Order
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Enter your Order ID to check the latest status of
            your Instagram service.
          </p>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl sm:p-6"
        >
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Order ID
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Example: IB-A1B2C3"
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3.5 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </div>
        </form>

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* ORDER */}
        {order && (
          <div className="mt-6 space-y-6">

            {/* ORDER SUMMARY */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Order ID
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-pink-300">
                    {order.id}
                  </h2>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300">
                  {order.status}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs text-slate-500">
                    Service
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.service}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs text-slate-500">
                    Package
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.package}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs text-slate-500">
                    Amount
                  </p>

                  <p className="mt-1 font-semibold">
                    ₹{order.price}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs text-slate-500">
                    Order Date
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(order.created_at)}
                  </p>
                </div>

              </div>
            </section>

            {/* PROGRESS */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">

              <h2 className="text-xl font-bold">
                Order Progress
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your order status updates automatically.
              </p>

              <div className="mt-8">
                {steps.map((step, index) => {
                  const status = getStepStatus(
                    order.status,
                    index
                  );

                  const isLast = index === steps.length - 1;

                  return (
                    <div
                      key={step.title}
                      className="relative flex gap-4"
                    >

                      {/* LINE */}
                      {!isLast && (
                        <div
                          className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-px ${
                            status === "completed"
                              ? "bg-pink-500"
                              : "bg-white/10"
                          }`}
                        />
                      )}

                      {/* ICON */}
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                          status === "completed"
                            ? "border-pink-500 bg-pink-500 text-white"
                            : status === "active"
                            ? "border-purple-400 bg-purple-500/20 text-purple-300"
                            : "border-white/10 bg-slate-900 text-slate-600"
                        }`}
                      >
                        {status === "completed"
                          ? "✓"
                          : index + 1}
                      </div>

                      {/* TEXT */}
                      <div className="pb-8">
                        <h3
                          className={`font-semibold ${
                            status === "pending"
                              ? "text-slate-500"
                              : "text-white"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={`mt-1 text-sm ${
                            status === "pending"
                              ? "text-slate-600"
                              : "text-slate-400"
                          }`}
                        >
                          {status === "active"
                            ? order.status ===
                              "Verification Pending"
                              ? "We're checking your payment details."
                              : step.description
                            : step.description}
                        </p>

                        {status === "active" && (
                          <span className="mt-2 inline-flex rounded-full bg-purple-500/10 px-2.5 py-1 text-[11px] font-medium text-purple-300">
                            Current Status
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CUSTOMER INFO */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">

              <h2 className="text-lg font-bold">
                Order Information
              </h2>

              <div className="mt-4 space-y-3 text-sm">

                <div className="flex flex-col gap-1 border-b border-white/5 pb-3 sm:flex-row sm:justify-between">
                  <span className="text-slate-500">
                    Customer
                  </span>

                  <span className="font-medium text-slate-200">
                    {order.name}
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-b border-white/5 pb-3 sm:flex-row sm:justify-between">
                  <span className="text-slate-500">
                    Email
                  </span>

                  <span className="break-all font-medium text-slate-200">
                    {order.email}
                  </span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <span className="text-slate-500">
                    Details
                  </span>

                  <span className="break-words font-medium text-slate-200 sm:max-w-[60%] sm:text-right">
                    {order.details}
                  </span>
                </div>

              </div>
            </section>

            {/* AUTO UPDATE */}
            <div className="text-center text-xs text-slate-600">
              ● Live status updates enabled
            </div>

          </div>
        )}

        {/* NO ORDER */}
        {!order && !loading && !error && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="text-4xl">🔎</div>

            <h3 className="mt-4 text-lg font-semibold">
              Find your order
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Enter the Order ID you received after checkout.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}