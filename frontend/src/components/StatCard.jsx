import React from 'react';

export const StatCard = ({ title, value, subtitle, trend, icon: Icon, color = '#3b82f6', onClick }) => {
  return (
    <div
      onClick={onClick}
      className="glass-panel"
      style={{
        padding: '22px',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, border-color 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: `${color}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <div style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1 }}>
          {value}
        </div>
        {trend && (() => {
          const tLower = trend.toLowerCase();
          const isCritical = tLower.includes('critical') || tLower.includes('deficit');
          const isPositive = trend.startsWith('+') && !trend.startsWith('+0');
          const isNeutral = trend.startsWith('0') || trend.startsWith('$0') || trend.startsWith('+0');

          const bg = isCritical 
            ? 'rgba(239, 68, 68, 0.15)' 
            : isPositive 
            ? 'rgba(16, 185, 129, 0.15)' 
            : 'rgba(148, 163, 184, 0.15)';
          const textColor = isCritical 
            ? '#f87171' 
            : isPositive 
            ? '#34d399' 
            : '#94a3b8';

          return (
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px',
                background: bg,
                color: textColor
              }}
            >
              {trend}
            </span>
          );
        })()}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          {subtitle}
        </div>
      )}

      {/* Subtle bottom border glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.8
        }}
      />
    </div>
  );
};
