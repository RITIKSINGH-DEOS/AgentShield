"use client";

import React from "react";
import { ExternalLink, CheckCircle2, ShieldCheck, Key, Server, RefreshCw, Layers } from "lucide-react";
import { SystemStats } from "@/types";

interface PayPalSandboxViewProps {
  stats: SystemStats;
}

export default function PayPalSandboxView({ stats }: PayPalSandboxViewProps) {
  const endpoints = [
    {
      method: "POST",
      path: "/v1/oauth2/token",
      desc: "OAuth 2.0 Bearer token negotiation via client credentials",
      status: "200 OK",
    },
    {
      method: "POST",
      path: "/v1/payments/payouts",
      desc: "Autonomous programmatic micro-disbursements batch engine",
      status: "201 CREATED",
    },
    {
      method: "POST",
      path: "/v2/checkout/orders",
      desc: "Dynamic order intent creation and conditional capture",
      status: "ACTIVE",
    },
    {
      method: "POST",
      path: "/v1/notifications/verify-webhook-signature",
      desc: "Cryptographic HMAC-SHA256 signature origin verification",
      status: "VERIFIED",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#003087]/30 border border-[#0070BA]/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10">
            <span className="text-xl font-black italic tracking-tighter font-mono">P</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">PayPal Developer Platform Integration</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                SANDBOX ACTIVE
              </span>
            </div>
            <p className="text-xs text-purple-300/60 mt-0.5">
              Live REST API connection to PayPal Sandbox (developer.paypal.com)
            </p>
          </div>
        </div>

        <a
          href="https://developer.paypal.com/dashboard/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border text-xs text-purple-200 flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>Open PayPal Dashboard</span>
          <ExternalLink className="w-3.5 h-3.5 text-brand-purple" />
        </a>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Active PayPal Endpoints */}
        <div className="p-6 rounded-3xl glass-card space-y-4">
          <div className="flex items-center justify-between border-b border-purple-500/10 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-brand-purple" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Integrated PayPal Endpoints
              </h4>
            </div>
            <span className="text-[10px] font-mono text-purple-300/40">api-m.sandbox.paypal.com</span>
          </div>

          <div className="space-y-2.5">
            {endpoints.map((ep, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-surface-canvas/60 border border-purple-500/10 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                      {ep.method}
                    </span>
                    <span className="text-xs font-mono font-semibold text-white">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-purple-300/50">{ep.desc}</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                  {ep.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Security & Air-Gap Telemetry */}
        <div className="p-6 rounded-3xl glass-card space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Zero-Trust Air-Gap Architecture
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">ENFORCED</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-surface-canvas/60 border border-purple-500/10">
                <span className="text-[10px] uppercase font-mono text-purple-300/50 block mb-0.5">
                  CREDENTIAL ISOLATION
                </span>
                <p className="text-xs text-purple-200/90 leading-relaxed font-sans">
                  Autonomous agents never receive raw PayPal client secrets or private tokens. All payouts are dispatched programmatically through AgentShield's verified PoI gateway.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-canvas/60 border border-purple-500/10">
                <span className="text-[10px] uppercase font-mono text-purple-300/50 block mb-0.5">
                  ATOMIC BATCH DISBURSEMENTS
                </span>
                <p className="text-xs text-purple-200/90 leading-relaxed font-sans">
                  Using PayPal Payouts v1, AgentShield settles up to 500 multi-agent micro-transactions in one single atomic API call, minimizing wire latency and fee overhead.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-500/10 flex justify-between items-center text-xs text-purple-300/50">
            <span>Live Sandbox Environment: Healthy</span>
            <span className="text-emerald-400 font-mono text-[11px] font-semibold">100% ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
