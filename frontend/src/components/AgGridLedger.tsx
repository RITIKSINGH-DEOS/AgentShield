"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import "ag-grid-enterprise";
import { Download, Search, Eye, CheckCircle2, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import { LedgerRecord } from "@/types";

interface AgGridLedgerProps {
  records: LedgerRecord[];
  onSelectRecord: (record: LedgerRecord) => void;
  heightClass?: string;
  pageSize?: number;
}

// 1. Status Cell Renderer (Clean, non-overlapping luxury micro-badge)
const StatusCellRenderer = (params: any) => {
  const status = (params.value as string) || "";
  let label = status;
  let badgeStyle = "bg-purple-950/40 text-purple-300 border-purple-500/20";
  let icon = null;

  switch (status) {
    case "VERIFIED_PAID":
      label = "Verified Paid";
      badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      break;
    case "INJECTION_BLOCKED":
      label = "Injection Blocked";
      badgeStyle = "bg-rose-500/10 text-rose-400 border-rose-500/30";
      icon = <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      break;
    case "CIRCUIT_TRIPPED":
      label = "Circuit Tripped";
      badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30";
      icon = <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      break;
    case "QUARANTINED_DRIFT":
      label = "Quarantined";
      badgeStyle = "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30";
      icon = <AlertTriangle className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />;
      break;
  }

  return (
    <div className="flex items-center h-full">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${badgeStyle} shadow-sm whitespace-nowrap`}>
        {icon}
        <span>{label}</span>
      </span>
    </div>
  );
};

// 2. Risk Progress Bar Renderer
const RiskScoreRenderer = (params: any) => {
  const score = Number(params.value) || 0;
  let barColor = "bg-brand-violet";
  let textColor = "text-purple-300/80";
  if (score > 60) {
    barColor = "bg-rose-500";
    textColor = "text-rose-400";
  } else if (score > 25) {
    barColor = "bg-amber-400";
    textColor = "text-amber-300";
  }

  return (
    <div className="flex items-center gap-2.5 h-full w-full">
      <div className="flex-1 bg-surface-border/80 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${barColor}`} style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <span className={`text-xs font-mono font-medium ${textColor} w-8 text-right`}>{score}%</span>
    </div>
  );
};

// 3. PayPal Batch Badge Renderer (Consistent height & aligned with blocked state)
const PayPalBatchRenderer = (params: any) => {
  const batchId = params.value as string | null;

  if (!batchId) {
    return (
      <div className="flex items-center h-full">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/5 border border-rose-500/20 text-[11px] font-mono text-rose-300/80">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80 shrink-0" />
          <span>Air-Gapped (Blocked)</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center h-full">
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] font-mono text-purple-200 truncate max-w-[210px]"
        title={batchId}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
        <span className="truncate">{batchId}</span>
      </span>
    </div>
  );
};

// 4. USD Amount Renderer
const AmountRenderer = (params: any) => {
  const amt = Number(params.value) || 0;
  return (
    <div className="flex items-center h-full">
      <span className="font-mono font-bold text-white text-xs tracking-tight">
        ${amt.toFixed(2)}
      </span>
    </div>
  );
};

// 5. Timestamp Renderer
const TimestampRenderer = (params: any) => {
  return (
    <div className="flex items-center h-full font-mono text-[11px] text-purple-200/80 tracking-tight">
      {params.value}
    </div>
  );
};

// 6. Agent ID Renderer
const AgentIdRenderer = (params: any) => {
  return (
    <div className="flex items-center h-full font-mono text-xs text-purple-100 font-medium truncate" title={params.value}>
      {params.value}
    </div>
  );
};

// 7. Category Renderer
const CategoryRenderer = (params: any) => {
  return (
    <div className="flex items-center h-full text-[11px] font-mono uppercase tracking-wider text-purple-300/60">
      {params.value}
    </div>
  );
};

// 8. Latency Renderer
const LatencyRenderer = (params: any) => {
  return (
    <div className="flex items-center h-full font-mono text-xs text-brand-purple font-medium">
      {params.value} ms
    </div>
  );
};

// 9. Recipient Renderer
const RecipientRenderer = (params: any) => {
  return (
    <div className="flex items-center h-full font-mono text-[11px] text-purple-300/70 truncate" title={params.value}>
      {params.value}
    </div>
  );
};

export default function AgGridLedger({
  records,
  onSelectRecord,
  heightClass = "h-[400px]",
  pageSize = 8,
}: AgGridLedgerProps) {
  const gridRef = useRef<AgGridReact>(null);
  const [quickFilterText, setQuickFilterText] = useState("");

  const columnDefs = useMemo<ColDef<LedgerRecord>[]>(
    () => [
      {
        headerName: "Status",
        field: "status",
        cellRenderer: StatusCellRenderer,
        width: 190,
        pinned: "left",
        filter: true,
      },
      {
        headerName: "Timestamp",
        field: "timestamp",
        cellRenderer: TimestampRenderer,
        width: 175,
        sortable: true,
      },
      {
        headerName: "Agent ID",
        field: "agent_id",
        cellRenderer: AgentIdRenderer,
        width: 195,
        filter: true,
      },
      {
        headerName: "Category",
        field: "category",
        cellRenderer: CategoryRenderer,
        width: 140,
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
        width: 140,
        sortable: true,
      },
      {
        headerName: "Latency",
        field: "latency_ms",
        cellRenderer: LatencyRenderer,
        width: 110,
        sortable: true,
      },
      {
        headerName: "Recipient",
        field: "recipient",
        cellRenderer: RecipientRenderer,
        width: 240,
      },
      {
        headerName: "PayPal Batch ID",
        field: "paypal_batch_id",
        cellRenderer: PayPalBatchRenderer,
        width: 220,
      },
      {
        headerName: "Actions",
        width: 95,
        cellRenderer: () => (
          <div className="flex items-center h-full">
            <span className="px-2.5 py-1 rounded-lg hover:bg-purple-500/20 text-brand-purple cursor-pointer flex items-center gap-1.5 text-[11px] font-medium border border-purple-500/15 transition-colors">
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
            className="px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border text-xs text-purple-200 flex items-center gap-1.5 transition-colors font-medium shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-brand-purple" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* The AG Grid Enterprise View */}
      <div className={`ag-theme-quartz-dark w-full ${heightClass} shadow-2xl`}>
        <AgGridReact<LedgerRecord>
          ref={gridRef}
          rowData={records}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          rowHeight={52}
          headerHeight={46}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[8, 12, 16, 32]}
          animateRows={true}
          rowSelection="single"
          onRowClicked={onRowClicked}
          enableCellTextSelection={true}
          suppressCellFocus={true}
        />
      </div>
    </div>
  );
}
