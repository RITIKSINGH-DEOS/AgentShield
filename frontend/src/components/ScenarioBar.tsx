"use client";

import React from "react";
import { Play, CheckCircle2, ShieldAlert, Zap, Users, Loader2 } from "lucide-react";
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
      title: "Legitimate Compute",
      cost: "$14.20",
      tag: "PayPal Settle",
      icon: CheckCircle2,
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "SCENARIO_02_INJECTION",
      title: "Adversarial Injection",
      cost: "Defended",
      tag: "<18ms Quarantine",
      icon: ShieldAlert,
      badgeColor: "bg-danger/15 text-danger border-danger/30",
    },
    {
      id: "SCENARIO_03_CIRCUIT_TRIP",
      title: "Recursive Spend Overrun",
      cost: "50 calls / 3s",
      tag: "Kill-Switch Trip",
      icon: Zap,
      badgeColor: "bg-warning/15 text-warning border-warning/30",
    },
    {
      id: "SCENARIO_04_MULTI_AGENT_SPLIT",
      title: "Multi-Agent Split",
      cost: "$100.00",
      tag: "3-Way Batch",
      icon: Users,
      badgeColor: "bg-brand-purple/15 text-purple-300 border-brand-purple/30",
    },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
          <h3 className="text-xs font-semibold text-purple-200/80 uppercase tracking-wider">
            Evaluator Scenarios
          </h3>
        </div>
        <span className="text-[11px] text-purple-300/40 font-mono">1-Click Live Execution</span>
      </div>

      {/* Clean 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isRunning = runningScenario === sc.id;

          return (
            <div
              key={sc.id}
              className="p-4 rounded-2xl glass-card glass-card-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${sc.badgeColor}`}>
                  {sc.tag}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">{sc.title}</h4>
                <span className="text-xs font-mono text-purple-300/70">{sc.cost}</span>
              </div>

              <button
                onClick={() => onRunScenario(sc.id)}
                disabled={runningScenario !== null}
                className="mt-3 w-full py-1.5 px-3 rounded-xl bg-surface-border hover:bg-brand-violet hover:text-white text-xs font-medium text-purple-200 flex items-center justify-center gap-1.5 transition-all"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Trigger</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Outcome Toast */}
      {lastResult && (
        <div className="p-3 rounded-2xl glass-card text-xs flex items-center justify-between gap-3 animate-fadeIn border-purple-500/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-ping" />
            <span className="font-semibold text-white">{lastResult.title}:</span>
            <span className="text-purple-300/70">{lastResult.summary}</span>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200">
            {lastResult.outcome}
          </span>
        </div>
      )}
    </div>
  );
}
