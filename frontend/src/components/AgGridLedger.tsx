"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import "ag-grid-enterprise";
import { Download, Search, Table, Eye, CheckCircle2, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import { LedgerRecord } from "@/types";

interface AgGridLedgerProps {
  records: LedgerRecord[];
  onSelectRecord: (record: LedgerRecord) => void;
}

// 1. Custom Status Badge Renderer
const StatusCellRenderer = (params: any) => {
  const status = params.value as string;
  let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
  let icon = null;

  switch (status) {
    case "VERIFIED_PAID":
      badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      icon = <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
      break;
    case "INJECTION_BLOCKED":
      badgeStyle = "bg-danger/10 text-danger border-danger/30";
      icon = <ShieldAlert className="w-3 h-3 text-danger" />;
      break;
    case "CIRCUIT_TRIPPED":
      badgeStyle = "bg-warning/10 text-warning border-warning/30";
      icon = <Zap className="w-3 h-3 text-warning" />;
      break;
    case "QUARANTINED_DRIFT":
      badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30";
      icon = <AlertTriangle className="w-3 h-3 text-amber-400" />;
      break;
  }

  return (
    <div className="flex items-center h-full">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyle}`}>
        {icon}
        <span>{status}</span>
      </span>
    </div>
  );
};

// 2. Custom Risk Score Progress Bar Renderer
const RiskScoreRenderer = (params: any) => {
  const score = Number(params.value) || 0;
  let barColor = "bg-emerald-500";
  if (score > 60) barColor = "bg-danger";
  else if (score > 25) barColor = "bg-warning";

  return (
    <div className="flex items-center gap-2 h-full w-full">
      <div className="flex-1 bg-surface-border rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <span className="text-xs font-mono text-slate-400 w-7 text-right">{score}%</span>
    </div>
  );
};

// 3. Custom PayPal Batch Renderer
const PayPalBatchRenderer = (params: any) => {
  const batchId = params.value as string | null;
  if (!batchId) {
    return <span className="text-xs text-slate-600 font-mono italic">Blocked</span>;
  }
  return (
    <div className="flex items-center gap-1.5 h-full">
      <span className="px-2 py-0.5 rounded bg-[#003087]/20 border border-[#0070BA]/30 text-[11px] font-mono text-cyan-300">
        {batchId}
      </span>
    </div>
  );
};

// 4. Custom Amount Renderer
const AmountRenderer = (params: any) => {
  const amt = Number(params.value) || 0;
  return (
    <div className="flex items-center h-full">
      <span className="font-mono font-semibold text-white text-xs">
        ${amt.toFixed(2)}
      </span>
    </div>
  );
};

export default function AgGridLedger({ records, onSelectRecord }: AgGridLedgerProps) {
  const gridRef = useRef<AgGridReact>(null);
  const [quickFilterText, setQuickFilterText] = useState("");

  const columnDefs = useMemo<ColDef<LedgerRecord>[]>(
    () => [
      {
        headerName: "Status",
        field: "status",
        cellRenderer: StatusCellRenderer,
        width: 175,
        pinned: "left",
        filter: true,
      },
      {
        headerName: "Timestamp",
        field: "timestamp",
        width: 155,
        sortable: true,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Agent ID",
        field: "agent_id",
        width: 185,
        cellClass: "font-mono text-slate-300 text-xs",
        filter: true,
      },
      {
        headerName: "Category",
        field: "category",
        width: 145,
        cellClass: "text-xs font-mono text-slate-400",
        filter: true,
      },
      {
        headerName: "Amount",
        field: "amount",
        cellRenderer: AmountRenderer,
        width: 110,
        sortable: true,
      },
      {
        headerName: "Risk Score",
        field: "risk_score",
        cellRenderer: RiskScoreRenderer,
        width: 145,
        sortable: true,
      },
      {
        headerName: "Latency",
        field: "latency_ms",
        width: 105,
        valueFormatter: (p) => `${p.value} ms`,
        cellClass: "font-mono text-xs text-cyan-400",
      },
      {
        headerName: "Recipient Account",
        field: "recipient",
        width: 220,
        cellClass: "font-mono text-xs text-slate-400",
      },
      {
        headerName: "PayPal Payout Batch",
        field: "paypal_batch_id",
        cellRenderer: PayPalBatchRenderer,
        width: 200,
      },
      {
        headerName: "PoI Intent Hash",
        field: "intent_hash",
        width: 160,
        valueFormatter: (p) => (p.value ? `${p.value.slice(0, 12)}...` : "—"),
        cellClass: "font-mono text-xs text-slate-500",
      },
      {
        headerName: "Actions",
        width: 90,
        cellRenderer: () => (
          <div className="flex items-center h-full">
            <span className="p-1 rounded hover:bg-slate-800 text-accent cursor-pointer flex items-center gap-1 text-[11px]">
              <Eye className="w-3.5 h-3.5" />
              <span>Audit</span>
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const onExportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: `AgentShield_Audit_Ledger_${new Date().toISOString().slice(0, 10)}.csv`,
    });
  }, []);

  const onRowClicked = useCallback(
    (event: RowClickedEvent<LedgerRecord>) => {
      if (event.data) {
        onSelectRecord(event.data);
      }
    },
    [onSelectRecord]
  );

  return (
    <div className="space-y-3">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Streaming Financial Audit Ledger
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 font-mono">
            Powered by AG Grid Enterprise
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Quick Filter Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agents, hashes, accounts..."
              value={quickFilterText}
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent/50"
            />
          </div>

          {/* Export CSV Button */}
          <button
            onClick={onExportCsv}
            className="px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-border border border-surface-border text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors font-medium whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* The AG Grid Component */}
      <div className="ag-theme-quartz-dark w-full h-[460px] shadow-xl">
        <AgGridReact<LedgerRecord>
          ref={gridRef}
          rowData={records}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          animateRows={true}
          rowSelection="single"
          onRowClicked={onRowClicked}
          enableCellTextSelection={true}
        />
      </div>
    </div>
  );
}
