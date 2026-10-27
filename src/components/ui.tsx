'use client';
import type { ReactNode } from 'react';
export function Panel({title, sub, action, children, className = ''}: {title?: string; sub?: string; action?: ReactNode; children: ReactNode; className?: string}) {
  return <section className={`panel ${className}`}>
    {(title || action) && <div className="panel-head"><div><h2>{title}</h2>{sub && <p className="muted small">{sub}</p>}</div>{action}</div>}
    {children}
  </section>;
}
export function Empty({label}: {label: string}) { return <div className="empty">{label}</div>; }
export function Field({label, children}: {label: string; children: ReactNode}) { return <label className="field"><span>{label}</span>{children}</label>; }
export function Metric({label, value, hint, icon, variant}: {label:string; value:string; hint?:string; icon?:ReactNode; variant?:'primary'}) { return <div className={`metric ${variant==='primary'?'metric-primary':''}`}><div className="metric-header"><div className="metric-label">{label}</div>{icon&&<span className="metric-icon">{icon}</span>}</div><strong>{value}</strong>{hint && <div className="muted small">{hint}</div>}</div>; }
export const safeError = (error: unknown): string => error instanceof Error ? error.message : 'Something went wrong.';
