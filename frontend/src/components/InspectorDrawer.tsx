"use client";

import React from "react";
import { X, ShieldCheck, ShieldAlert, Copy, ExternalLink, Hash, Clock, DollarSign, UserCheck } from "lucide-react";
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-surface border-l border-surface-border h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl border ${isApproved ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-danger/10 border-danger/30 text-danger"}`}>
                {isApproved ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Cryptographic Forensics Audit</h3>
                <p className="text-xs text-slate-400 font-mono">Record ID: {record.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-card hover:bg-surface-border text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Status & Risk Summary */}
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Firewall Verdict</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isApproved
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-danger/10 text-danger border-danger/30"
              }`}>
                {record.status}
              </span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed font-mono bg-surface p-3 rounded-lg border border-surface-border">
              {record.decision_reason}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-surface border border-surface-border">
                <span className="text-[10px] uppercase text-slate-500 block">Risk Anomaly Score</span>
                <span className="text-lg font-bold font-mono text-white">{record.risk_score}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface border border-surface-border">
                <span className="text-[10px] uppercase text-slate-500 block">Evaluation Latency</span>
                <span className="text-lg font-bold font-mono text-cyan-400">{record.latency_ms} ms</span>
              </div>
            </div>
          </div>

          {/* SHA-256 Intent Hash Anchor */}
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-accent" />
                <span>SHA-256 Intent Hash (PoI)</span>
              </span>
              <button
                onClick={() => copyToClipboard(record.intent_hash)}
                className="text-[11px] text-accent hover:underline flex items-center gap-1 font-mono"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
            <p className="text-xs font-mono text-slate-300 break-all bg-surface p-2.5 rounded-lg border border-surface-border">
              {record.intent_hash}
            </p>
            <p className="text-[11px] text-slate-500">
              Deterministic task anchor verified prior to any external tool actuation.
            </p>
          </div>

          {/* PayPal Settlement Details */}
          <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              <span>PayPal Settlement Pipeline</span>
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-border/60">
                <span className="text-slate-400">Target Recipient</span>
                <span className="font-mono text-slate-200">{record.recipient}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border/60">
                <span className="text-slate-400">Authorized USD</span>
                <span className="font-mono font-bold text-emerald-400">${record.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border/60">
                <span className="text-slate-400">PayPal Batch ID</span>
                <span className="font-mono text-cyan-300">
                  {record.paypal_batch_id || "None (Severed by Firewall)"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Execution Mode</span>
                <span className="font-mono text-slate-300">PayPal Sandbox REST API v1/v2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-surface-border flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-card hover:bg-surface-border border border-surface-border text-xs text-white font-medium transition-colors"
          >
            Close Audit Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
