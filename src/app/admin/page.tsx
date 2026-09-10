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

const statuses = [
  "Verification Pending",
  "Processing",
  "Completed",
];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error(
        "SUPABASE ERROR:",
        fetchError?.message,
        fetchError?.details,
        fetchError?.hint,
        fetchError?.code
      );

      setError(
        `Supabase Error: ${fetchError.message}${
          fetchError.details ? ` | ${fetchError.details}` : ""
        }`
      );

      setOrders([]);
      setLoading(false);
      return;
    }

    setOrders((data as Order[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(orderId: string, newStatus: string) {
    setError("");

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: newStatus,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error(
        "STATUS UPDATE ERROR:",
        updateError.message,
        updateError.details,
        updateError.hint,
        updateError.code
      );

      setError(
        `Status Update Error: ${updateError.message}${
          updateError.details ? ` | ${updateError.details}` : ""
        }`
      );

      return;
    }

    await loadOrders();
  }

  const totalOrders = orders.length;

  const verificationOrders = orders.filter(
    (order) => order.status === "Verification Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

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
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300">
            InstaBoost Admin
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Order Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage customer orders and update their delivery status.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <div className="font-semibold text-red-300">
              Something went wrong
            </div>

            <div className="mt-2 break-words text-sm text-red-200">
              {error}
            </div>

            <button
              onClick={loadOrders}
              className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* STATS */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-slate-400">Total Orders</p>
            <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
            <p className="text-sm text-yellow-300">Verification</p>
            <p className="mt-2 text-3xl font-bold">
              {verificationOrders}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <p className="text-sm text-blue-300">Processing</p>
            <p className="mt-2 text-3xl font-bold">
              {processingOrders}
            </p>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-sm text-green-300">Completed</p>
            <p className="mt-2 text-3xl font-bold">
              {completedOrders}
            </p>
          </div>

        </div>

        {/* ORDERS */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

          <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">All Orders</h2>
              <p className="mt-1 text-sm text-slate-400">
                Latest orders appear first.
              </p>
            </div>

            <button
              onClick={loadOrders}
              disabled={loading}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh Orders"}
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="p-10 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-pink-500" />

              <p className="text-sm text-slate-400">
                Loading orders...
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && orders.length === 0 && (
            <div className="p-12 text-center">
              <div className="mb-3 text-4xl">📦</div>

              <h3 className="text-lg font-semibold">
                No orders yet
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Customer orders will appear here automatically.
              </p>
            </div>
          )}

          {/* MOBILE CARDS */}
          {!loading && orders.length > 0 && (
            <div className="space-y-4 p-4 md:hidden">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-pink-300">
                        {order.id}
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {order.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {order.email}
                      </p>
                    </div>

                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                      ₹{order.price}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">
                        Service:
                      </span>{" "}
                      <span className="text-slate-200">
                        {order.service}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Package:
                      </span>{" "}
                      <span className="text-slate-200">
                        {order.package}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Details:
                      </span>{" "}
                      <span className="break-words text-slate-200">
                        {order.details}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        UTR:
                      </span>{" "}
                      <span className="font-mono text-slate-200">
                        {order.utr}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Created:
                      </span>{" "}
                      <span className="text-slate-200">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Order Status
                    </label>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-sm text-white outline-none transition focus:border-pink-500"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DESKTOP TABLE */}
          {!loading && orders.length > 0 && (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Order
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Service
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      UTR
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Created
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-white/[0.025]"
                    >
                      {/* ORDER */}
                      <td className="px-5 py-5 align-top">
                        <p className="font-bold text-pink-300">
                          {order.id}
                        </p>

                        <p className="mt-1 max-w-[220px] break-words text-xs text-slate-400">
                          {order.details}
                        </p>
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-5 py-5 align-top">
                        <p className="font-semibold text-white">
                          {order.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {order.email}
                        </p>
                      </td>

                      {/* SERVICE */}
                      <td className="px-5 py-5 align-top">
                        <p className="font-semibold text-white">
                          {order.service}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {order.package}
                        </p>
                      </td>

                      {/* AMOUNT */}
                      <td className="px-5 py-5 align-top">
                        <span className="font-bold">
                          ₹{order.price}
                        </span>
                      </td>

                      {/* UTR */}
                      <td className="px-5 py-5 align-top">
                        <span className="rounded-lg bg-white/5 px-2 py-1 font-mono text-xs text-slate-300">
                          {order.utr}
                        </span>
                      </td>

                      {/* CREATED */}
                      <td className="px-5 py-5 align-top">
                        <p className="text-xs text-slate-400">
                          {formatDate(order.created_at)}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5 align-top">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value)
                          }
                          className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-pink-500"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>

        {/* FOOTER INFO */}
        <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <p className="text-xs leading-5 text-yellow-200/80">
            Demo admin dashboard: status changes are saved directly to
            Supabase. Production version mein admin authentication aur
            secure server-side permissions zaroor add karna.
          </p>
        </div>

      </div>
    </main>
  );
}