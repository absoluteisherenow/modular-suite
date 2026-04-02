'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MODULES = [
  { label: 'Broadcast Lab', href: '/broadcast', color: '#3d6b4a', sub: [
    { label: 'Tone Intelligence', href: '/broadcast' },
    { label: 'Calendar', href: '/broadcast/calendar' },
    { label: 'Content Intelligence', href: '/broadcast/scanner' },
    { label: 'Media Library', href: '/broadcast/media' },
  ]},
  { label: 'Tour Lab', href: '/dashboard', color: '#b08d57', sub: [
    { label: 'Gigs', href: '/logistics' },
    { label: 'Finances', href: '/business/finances' },
    { label: 'Contracts', href: '/contracts' },
  ]},
  { label: 'SONIX Lab', href: '/sonix', color: '#6a7a9a', sub: [
    { label: 'Compose', href: '/sonix#compose' },
    { label: 'Arrange', href: '/sonix#arrange' },
    { label: 'Mixdown', href: '/sonix#mixdown' },
    { label: 'Max for Live', href: '/maxforlive' },
  ]},
  { label: 'Set Lab', href: '/setlab', color: '#9a6a5a', sub: [
    { label: 'Mix Scanner', href: '/setlab/mix-scanner' },
    { label: 'Rekordbox Import', href: '/setlab/rekordbox' },
  ]},
  { label: 'Drop Lab', href: '/releases', color: '#7a5a8a', sub: [
    { label: 'Releases', href: '/releases' },
  ]},
]

export function Navigation() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const moduleActive = (mod: typeof MODULES[0]) => {
    if (mod.href === '/dashboard') return pathname === '/dashboard' || pathname === '/'
    return pathname === mod.href || mod.sub.some(s => pathname === s.href)
  }

  if (pathname === '/pricing') return null

  return (
    <nav style={{ width: '200px', background: 'var(--bg)', borderRight: '1px solid var(--border-dim)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-mono)', flexShrink: 0, overflowY: 'auto' }}>
      <div style={{ padding: '24px 18px 20px', borderBottom: '1px solid var(--border-dim)' }}>
        <Link href='/dashboard' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 200, letterSpacing: '0.04em', color: 'var(--text)' }}>Signal Lab</span>
          <span style={{ fontSize: '9px', letterSpacing: '0.08em', color: 'var(--text-dimmer)' }}>OS</span>
        </Link>
      </div>
      <div style={{ flex: 1, padding: '16px 0' }}>
        {MODULES.map(mod => {
          const active = moduleActive(mod)
          return (
            <div key={mod.href} style={{ marginBottom: '16px' }}>
              <Link href={mod.href} style={{ display: 'block', padding: '6px 18px', fontSize: '12px', letterSpacing: '0.08em', textDecoration: 'none', color: active ? mod.color : 'var(--text-dimmer)', transition: 'color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = mod.color }}
                onMouseLeave={e => { e.currentTarget.style.color = active ? mod.color : 'var(--text-dimmer)' }}
              >{mod.label}</Link>
              {mod.sub.map(s => (
                <Link key={s.href} href={s.href} style={{ display: 'block', padding: '5px 18px 5px 28px', fontSize: '11px', letterSpacing: '0.06em', textDecoration: 'none', color: isActive(s.href) ? mod.color : 'var(--text-dimmest)', transition: 'color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = mod.color }}
                  onMouseLeave={e => { e.currentTarget.style.color = isActive(s.href) ? mod.color : 'var(--text-dimmest)' }}
                >{s.label}</Link>
              ))}
            </div>
          )
        })}
      </div>
      <div style={{ borderTop: '1px solid var(--border-dim)' }}>
        <Link href='/business/settings' style={{ display: 'block', padding: '12px 18px', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none', color: pathname === '/business/settings' ? 'var(--gold)' : 'var(--text-dimmest)', transition: 'color 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-dim)' }}
          onMouseLeave={e => { e.currentTarget.style.color = pathname === '/business/settings' ? 'var(--gold)' : 'var(--text-dimmest)' }}
        >Settings</Link>
      </div>
    </nav>
  )
}
