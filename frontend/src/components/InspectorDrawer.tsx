"use client";

import React from "react";
import { X, ShieldCheck, ShieldAlert, Copy, Hash, Shield, DollarSign, Clock, ArrowRight } from "lucide-react";
import { LedgerRecord } from "@/types";

interface InspectorDrawerProps {
  record: LedgerRecord | null;
  onClose: () => void;
}

export default function InspectorDrawer({ record, onClose }: InspectorDrawerProps) {
  if (!record) return null;

  const isApproved = record.status === "VERIFIED_PAID";
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      {/* Centered Glassmorphic Modal (Matching Image 2 Reference) */}
      <div className="w-full max-w-xl rounded-3xl glass-card border border-purple-500/25 p-7 shadow-2xl shadow-purple-950/60 relative overflow-hidden flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/10 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                isApproved
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-danger/20 text-danger border border-danger/30"
              }`}
            >
              {isApproved ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Cryptographic Forensic Audit
              </h3>
              <span className="text-[11px] font-mono text-purple-300/50">
                Transaction ID: {record.id}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border flex items-center justify-center text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rule Builder / Trigger Pipeline View (Matching Image 2) */}
        <div className="grid grid-cols-3 gap-3">
          {/* Box 1: Agent & Intent */}
          <div className="p-3.5 rounded-2xl bg-surface-canvas border border-purple-500/15">
            <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300/50 block mb-1">
              REQUESTING AGENT
            </span>
            <span className="text-xs font-mono font-bold text-white truncate block">
              {record.agent_id}
            </span>
            <span className="text-[10px] text-purple-300/40 mt-1 block">
              {record.category}
            </span>
          </div>

          {/* Box 2: Amount & Verdict */}
          <div className="p-3.5 rounded-2xl bg-surface-canvas border border-purple-500/15">
            <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300/50 block mb-1">
              AUTHORIZED USD
            </span>
            <span className="text-sm font-mono font-bold text-emerald-400 block">
              ${record.amount.toFixed(2)}
            </span>
            <span className="text-[10px] font-semibold text-purple-300/70 mt-1 block">
              {record.status}
            </span>
          </div>

          {/* Box 3: Recipient & Pipeline */}
          <div className="p-3.5 rounded-2xl bg-surface-canvas border border-purple-500/15">
            <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300/50 block mb-1">
              SETTLEMENT ROUTE
            </span>
            <span className="text-xs font-mono text-white truncate block">
              {record.recipient}
            </span>
            <span className="text-[10px] font-mono text-brand-purple mt-1 block">
              PayPal Sandbox
            </span>
          </div>
        </div>

        {/* Decision Reasoning Box */}
        <div className="p-4 rounded-2xl bg-surface-canvas border border-purple-500/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-purple-300/60 font-semibold">
            <span>Security Engine Evaluation</span>
            <span className="font-mono text-cyan-400 text-[11px]">{record.latency_ms} ms</span>
          </div>
          <p className="text-xs text-purple-200/90 leading-relaxed font-mono">
            {record.decision_reason}
          </p>
        </div>

        {/* SHA-256 Intent Hash Anchor */}
        <div className="p-4 rounded-2xl bg-surface-canvas border border-purple-500/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-300/70 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-brand-purple" />
              <span>Cryptographic Proof-of-Intent (SHA-256)</span>
            </span>
            <button
              onClick={() => copyToClipboard(record.intent_hash)}
              className="text-[11px] text-brand-purple hover:underline flex items-center gap-1 font-mono"
            >
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </button>
          </div>
          <p className="text-xs font-mono text-purple-300/90 break-all bg-surface-card p-2.5 rounded-xl border border-surface-border">
            {record.intent_hash}
          </p>
        </div>

        {/* Footer (Matching Image 2 Footer Buttons) */}
        <div className="pt-2 flex items-center justify-between border-t border-purple-500/10">
          <div className="flex items-center gap-2 text-xs text-purple-300/60">
            <Shield className="w-4 h-4 text-brand-purple" />
            <span>Deterministic Zero-Trust Air-Gap</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border text-xs text-purple-200 font-medium transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => copyToClipboard(record.intent_hash)}
              className="px-4 py-2 rounded-full bg-brand-violet hover:bg-purple-600 text-xs text-white font-semibold transition-all shadow-md shadow-purple-600/30"
            >
              Copy Audit Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
