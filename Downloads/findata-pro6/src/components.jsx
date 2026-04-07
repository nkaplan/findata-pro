import { useState, useRef, useEffect } from 'react';
import { YEARS } from './data';

// ── Formatting ──
export const fmtN = (n) => {
  if (n == null || (n === 0)) return '—';
  return n.toLocaleString('tr-TR');
};

export const fmtS = (n) => {
  if (!n) return '—';
  const a = Math.abs(n);
  if (a >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (a >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return fmtN(n);
};

export const pctChange = (current, previous) => {
  if (!previous || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
};

// ── Icon Component ──
export const PATHS = {
  home: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  table: 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18',
  chart: 'M18 20V10M12 20V4M6 20v-6',
  trend: 'M23 6l-9.5 9.5-5-5L1 18',
  building: 'M4 2h16v20H4zM9 22v-4M15 22v-4',
  upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  file: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6',
  edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  save: 'M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8',
  undo: 'M3 7v6h6M3 13A9 9 0 1121 12',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
};

export const Icon = ({ path, size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

// ── Sparkline ──
export const Sparkline = ({ values, width = 100, height = 26, color = '#3b82f6' }) => {
  const d = values.filter(x => x != null && x !== 0);
  if (d.length < 2) return null;
  const mn = Math.min(...d), mx = Math.max(...d), range = mx - mn || 1;
  const points = d.map((x, i) =>
    `${(i / (d.length - 1)) * width},${height - ((x - mn) / range) * (height - 4) - 2}`
  ).join(' ');
  return (
    <svg width={width} height={height}>
      <polyline points={points} fill="none" stroke={color}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── Bar Chart ──
export const BarChart = ({ items, width = 280, height = 80, color = '#3b82f6' }) => {
  const maxVal = Math.max(...items.map(d => Math.abs(d.value)), 1);
  const barW = Math.min(38, (width - (items.length - 1) * 8) / items.length);
  const midY = height / 2;

  return (
    <svg width={width} height={height + 22} viewBox={`0 0 ${width} ${height + 22}`}>
      <line x1={0} y1={midY} x2={width} y2={midY} stroke="rgba(148,163,184,0.08)" strokeWidth={1} />
      {items.map((d, i) => {
        const barH = (Math.abs(d.value) / maxVal) * (height / 2 - 2);
        const x = i * (barW + 8);
        const isNeg = d.value < 0;
        return (
          <g key={i}>
            <rect x={x} y={isNeg ? midY : midY - barH} width={barW} height={barH}
              fill={isNeg ? '#ef4444' : color} rx={4} opacity={0.8} />
            <text x={x + barW / 2} y={height + 14} textAnchor="middle"
              fontSize={9} fill="#64748b" fontFamily="'DM Sans'">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ── KPI Card ──
export const KPICard = ({ label, value, subtitle, trend, color = '#3b82f6' }) => (
  <div style={{
    background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.08)',
    borderRadius: 12, padding: '14px 16px', flex: '1 1 160px', minWidth: 155,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
      background: `linear-gradient(90deg,${color},transparent)` }} />
    <div style={{ color: '#64748b', fontSize: 9, fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '0.05em', marginBottom: 6 }}>{label}</div>
    <div style={{ color: '#f1f5f9', fontSize: 17, fontWeight: 700,
      fontFamily: "'DM Mono',monospace", marginBottom: 2 }}>{value}</div>
    {subtitle && <div style={{ color: '#475569', fontSize: 8 }}>{subtitle}</div>}
    {trend !== null && trend !== undefined && (
      <div style={{
        marginTop: 5, display: 'inline-flex', alignItems: 'center', gap: 2,
        padding: '2px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600,
        background: trend >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        color: trend >= 0 ? '#10b981' : '#ef4444',
      }}>
        {trend >= 0 ? '▲' : '▼'}{Math.abs(trend).toFixed(1)}%
      </div>
    )}
  </div>
);

// ── Toast Notification ──
export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="toast-enter" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 999,
      background: 'rgba(16,185,129,0.92)', color: '#fff',
      padding: '10px 18px', borderRadius: 10, fontSize: 12, fontWeight: 600,
      display: 'flex', alignItems: 'center', gap: 8,
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)',
    }}>
      <Icon path={PATHS.check} size={14} color="#fff" /> {message}
    </div>
  );
};

// ── Editable Cell ──
export const EditableCell = ({ value, onSave, year, rowKey }) => {
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  const startEdit = () => {
    setInputVal(value?.toString() ?? '0');
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 50);
  };

  const saveEdit = () => {
    const parsed = parseFloat(inputVal.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(parsed)) onSave(rowKey, year, parsed);
    setEditing(false);
  };

  const cancelEdit = () => setEditing(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={saveEdit}
        autoFocus
        style={{
          width: 110, padding: '4px 8px', borderRadius: 5,
          border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.12)',
          color: '#e2e8f0', fontSize: 10, fontFamily: "'DM Mono',monospace",
          outline: 'none', textAlign: 'right',
        }}
      />
    );
  }

  return (
    <div className="edit-trigger" onClick={startEdit}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, cursor: 'pointer' }}>
      <span style={{
        color: value < 0 ? '#ef4444' : '#e2e8f0',
        fontFamily: "'DM Mono',monospace", fontSize: 10,
      }}>{fmtN(value)}</span>
      <span className="edit-icon"><Icon path={PATHS.edit} size={10} color="#64748b" /></span>
    </div>
  );
};

// ── Editable Data Table ──
export const DataTable = ({ title, sectionKey, data, onCellSave, accent = '#3b82f6' }) => {
  const [flashCells, setFlashCells] = useState({});
  const sectionData = data[sectionKey] || {};
  const entries = Object.entries(sectionData);

  const handleSave = (rowKey, year, newValue) => {
    onCellSave(sectionKey, rowKey, year, newValue);
    const key = `${rowKey}-${year}`;
    setFlashCells(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setFlashCells(prev => { const n = { ...prev }; delete n[key]; return n; }), 2000);
  };

  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', background: `${accent}10`, borderRadius: 8,
        borderLeft: `3px solid ${accent}`, marginBottom: 10,
      }}>
        <h3 style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600, margin: 0 }}>{title}</h3>
        <span style={{ fontSize: 9, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon path={PATHS.edit} size={10} /> Hücreye tıklayarak düzenleyin
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${accent}18` }}>
              <th style={{ textAlign: 'left', padding: '6px 10px', color: '#64748b', fontWeight: 600, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 180 }}>Kalem</th>
              {YEARS.map(y => (
                <th key={y} style={{ textAlign: 'right', padding: '6px 10px', color: '#64748b', fontWeight: 600, fontSize: 9, textTransform: 'uppercase', minWidth: 130 }}>31 Ara {y}</th>
              ))}
              <th style={{ textAlign: 'center', padding: '6px 10px', color: '#64748b', fontWeight: 600, fontSize: 9, width: 100 }}>Trend</th>
              <th style={{ textAlign: 'right', padding: '6px 10px', color: '#64748b', fontWeight: 600, fontSize: 9, width: 65 }}>YoY %</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, vals], i) => {
              const isTotal = key.includes('Toplam') || key.includes('TOPLAM') || key.includes('Net Dönem') || key.includes('Faaliyet Karı') || key.includes('Vergi Öncesi');
              const change = pctChange(vals['2024'], vals['2023']);
              return (
                <tr key={i} style={{
                  borderBottom: '1px solid rgba(148,163,184,0.04)',
                  background: isTotal ? 'rgba(59,130,246,0.03)' : 'transparent',
                }}>
                  <td style={{ padding: '6px 10px', color: isTotal ? '#e2e8f0' : '#cbd5e1', fontWeight: isTotal ? 600 : 400, fontSize: 11 }}>{key}</td>
                  {YEARS.map(y => (
                    <td key={y} style={{ textAlign: 'right', padding: '4px 10px', fontWeight: isTotal ? 600 : 400, position: 'relative' }}>
                      <div className={flashCells[`${key}-${y}`] ? 'cell-updated' : ''} style={{ borderRadius: 4, padding: '2px 4px' }}>
                        <EditableCell value={vals[y]} onSave={handleSave} year={y} rowKey={key} />
                      </div>
                      {flashCells[`${key}-${y}`] && (
                        <div style={{ position: 'absolute', top: 0, right: 6, fontSize: 7, color: '#10b981' }}>✓ güncellendi</div>
                      )}
                    </td>
                  ))}
                  <td style={{ textAlign: 'center', padding: '6px 4px' }}>
                    <Sparkline values={YEARS.map(y => vals[y])} color={accent} />
                  </td>
                  <td style={{ textAlign: 'right', padding: '6px 10px' }}>
                    {change !== null && (
                      <span style={{ color: change > 0 ? '#10b981' : change < 0 ? '#ef4444' : '#94a3b8', fontWeight: 500, fontSize: 10 }}>
                        {change > 0 ? '▲' : '▼'}{Math.abs(change).toFixed(1)}%
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
