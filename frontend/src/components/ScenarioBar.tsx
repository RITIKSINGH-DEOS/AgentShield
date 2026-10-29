"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Zap, Users, Play, Loader2 } from "lucide-react";
import { ScenarioResult } from "@/types";

interface ScenarioBarProps {
  onRunScenario: (scenarioId: string) => Promise<void>;
  runningScenario: string | null;
  lastResult: ScenarioResult | null;
}

export default function ScenarioBar({
  onRunScenario,
  runningScenario,
  lastResult,
}: ScenarioBarProps) {
  const scenarios = [
    {
      id: "SCENARIO_01_HAPPY_PATH",
      title: "Scenario 1: Legitimate Procurement",
      desc: "H100 GPU compute reserve ($14.20) verified via PoI & settled instantly via PayPal.",
      icon: CheckCircle2,
      color: "border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400",
      btnColor: "bg-emerald-500 text-black hover:bg-emerald-400",
      badge: "HAPPY PATH",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    {
      id: "SCENARIO_02_INJECTION",
      title: "Scenario 2: Adversarial Injection",
      desc: "Attacker payload attempts $45.00 diversion; AI Firewall intercepts & quarantines in <18ms.",
      icon: ShieldAlert,
      color: "border-danger/30 hover:border-danger bg-danger/5 hover:bg-danger/10 text-danger",
      btnColor: "bg-danger text-white hover:bg-red-500",
      badge: "THREAT DEFENSE",
      badgeColor: "bg-danger/20 text-danger border-danger/40",
    },
    {
      id: "SCENARIO_03_CIRCUIT_TRIP",
      title: "Scenario 3: Recursive Overrun Trip",
      desc: "Infinite spend loop detected; Velocity circuit breaker activates emergency kill-switch.",
      icon: Zap,
      color: "border-warning/30 hover:border-warning bg-warning/5 hover:bg-warning/10 text-warning",
      btnColor: "bg-warning text-black hover:bg-amber-400",
      badge: "CIRCUIT BREAKER",
      badgeColor: "bg-warning/20 text-warning border-warning/40",
    },
    {
      id: "SCENARIO_04_MULTI_AGENT_SPLIT",
      title: "Scenario 4: Multi-Agent Split",
      desc: "3-agent consortium milestone settlement ($100.00) disbursed atomically via PayPal Payouts.",
      icon: Users,
      color: "border-blue-500/30 hover:border-blue-400 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400",
      btnColor: "bg-blue-500 text-white hover:bg-blue-400",
      badge: "CONSORTIUM",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>⚡ Evaluator 60-Second Interactive Scenarios</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono">
              1-Click Live Test
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Click any scenario to execute live agent behavior through the firewall and PayPal sandbox.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isRunning = runningScenario === sc.id;

          return (
            <div
              key={sc.id}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${sc.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white mb-1">{sc.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{sc.desc}</p>
              </div>

              <button
                onClick={() => onRunScenario(sc.id)}
                disabled={runningScenario !== null}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${sc.btnColor} ${
                  runningScenario !== null ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Trigger Scenario</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Dynamic Scenario Outcome Toast */}
      {lastResult && (
        <div className="p-3 rounded-xl bg-surface-card border border-surface-border text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-semibold text-white">{lastResult.title}:</span>
            <span className="text-slate-300">{lastResult.summary}</span>
          </div>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-surface-border text-cyan-300">
            {lastResult.outcome}
          </span>
        </div>
      )}
    </div>
  );
}
