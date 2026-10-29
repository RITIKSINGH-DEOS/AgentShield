"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import "ag-grid-enterprise";
import { Download, Search, Shield, Eye, CheckCircle2, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import { LedgerRecord } from "@/types";

interface AgGridLedgerProps {
  records: LedgerRecord[];
  onSelectRecord: (record: LedgerRecord) => void;
}

// Custom Status Badge
const StatusCellRenderer = (params: any) => {
  const status = params.value as string;
  let badgeStyle = "bg-purple-950/40 text-purple-300 border-purple-500/20";
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
      badgeStyle = "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30";
      icon = <AlertTriangle className="w-3 h-3 text-fuchsia-400" />;
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

// Custom Risk Progress Bar
const RiskScoreRenderer = (params: any) => {
  const score = Number(params.value) || 0;
  let barColor = "bg-brand-violet";
  if (score > 60) barColor = "bg-danger";
  else if (score > 25) barColor = "bg-warning";

  return (
    <div className="flex items-center gap-2 h-full w-full">
      <div className="flex-1 bg-surface-border rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <span className="text-xs font-mono text-purple-300/60 w-7 text-right">{score}%</span>
    </div>
  );
};

// Custom PayPal Batch Badge
const PayPalBatchRenderer = (params: any) => {
  const batchId = params.value as string | null;
  if (!batchId) {
    return <span className="text-xs text-purple-300/30 font-mono italic">Blocked</span>;
  }
  return (
    <div className="flex items-center h-full">
      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-mono text-purple-200">
        {batchId}
      </span>
    </div>
  );
};

// Custom USD Amount
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
      },
      {
        headerName: "Agent ID",
        field: "agent_id",
        width: 185,
        cellClass: "font-mono text-purple-200 text-xs",
        filter: true,
      },
      {
        headerName: "Category",
        field: "category",
        width: 140,
        cellClass: "text-xs font-mono text-purple-300/60",
      },
      {
        headerName: "Amount",
        field: "amount",
        cellRenderer: AmountRenderer,
        width: 110,
        sortable: true,
      },
      {
        headerName: "Risk",
        field: "risk_score",
        cellRenderer: RiskScoreRenderer,
        width: 135,
        sortable: true,
      },
      {
        headerName: "Latency",
        field: "latency_ms",
        width: 105,
        valueFormatter: (p) => `${p.value} ms`,
        cellClass: "font-mono text-xs text-brand-purple",
      },
      {
        headerName: "Recipient",
        field: "recipient",
        width: 220,
        cellClass: "font-mono text-xs text-purple-300/50",
      },
      {
        headerName: "PayPal Batch ID",
        field: "paypal_batch_id",
        cellRenderer: PayPalBatchRenderer,
        width: 200,
      },
      {
        headerName: "Actions",
        width: 90,
        cellRenderer: () => (
          <div className="flex items-center h-full">
            <span className="p-1 rounded-lg hover:bg-purple-500/20 text-brand-purple cursor-pointer flex items-center gap-1 text-[11px] font-medium">
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
      fileName: `AgentShield_Audit_${new Date().toISOString().slice(0, 10)}.csv`,
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
          <span className="text-xs font-semibold text-purple-200/80 uppercase tracking-wider">
            Live Streaming Audit Ledger
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
            AG Grid Enterprise
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-purple-400/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter transactions..."
              value={quickFilterText}
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-surface-card border border-surface-border text-xs text-white placeholder-purple-300/30 focus:outline-none focus:border-brand-violet/50"
            />
          </div>

          {/* Export CSV */}
          <button
            onClick={onExportCsv}
            className="px-3 py-1.5 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border text-xs text-purple-200 flex items-center gap-1.5 transition-colors font-medium"
          >
            <Download className="w-3.5 h-3.5 text-brand-purple" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* The AG Grid Enterprise View */}
      <div className="ag-theme-quartz-dark w-full h-[400px] shadow-2xl">
        <AgGridReact<LedgerRecord>
          ref={gridRef}
          rowData={records}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          pagination={true}
          paginationPageSize={8}
          paginationPageSizeSelector={[8, 16, 32]}
          animateRows={true}
          rowSelection="single"
          onRowClicked={onRowClicked}
          enableCellTextSelection={true}
        />
      </div>
    </div>
  );
}
