'use client'

import { useState } from 'react'

const plans = [
  {
    name: 'Creator',
    price: '£29',
    tagline: "You're making music. This keeps everything in one place.",
    accent: 'text-[#8a8780]',
    button: 'Join waitlist',
    features: [
      'Tour Lab — unlimited gigs + advancing',
      'Signal Lab — 30 AI captions / month',
      'Artist tone profile + trend detection',
      'Set Lab — unlimited set building',
      'Camelot wheel + energy scoring',
      'SONIX Lab — 18 mix chain presets',
      'Arrangement intelligence',
      'Email support',
    ],
  },
  {
    name: 'Artist',
    price: '£59',
    tagline: "You're touring. The system runs the business around the music.",
    accent: 'text-[#b08d57]',
    featured: true,
    button: 'Join waitlist',
    features: [
      'Everything in Creator',
      'Unlimited AI captions + scheduling',
      'Content intelligence scanner',
      'Contract parser — paste email, auto-fills gig',
      'Invoice tracking + CSV export',
      'SONIX Lab VST plugin (AU + VST3)',
      'Rekordbox import + export',
      'Track intelligence — energy, flow, mix tips',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    price: '£99',
    tagline: "Full creative control. Every tool, no limits.",
    accent: 'text-[#6a7a9a]',
    button: 'Join waitlist',
    features: [
      'Everything in Artist',
      'Advanced content scoring',
      'Producer chain database',
      'Audio file analysis (BPM, key, energy)',
      'Stems analysis',
      'Dedicated support',
    ],
  },
  {
    name: 'Management',
    price: '£249',
    tagline: "You're running artists. One dashboard for the roster.",
    accent: 'text-[#3d6b4a]',
    button: 'Book a demo',
    features: [
      'Everything in Pro',
      'Multi-artist dashboard',
      'Team access + permissions',
      'Up to 10 artist profiles',
      'White-label advance emails',
      'Bulk operations',
      'Account manager',
    ],
  },
]

const labs = [
  { name: 'Tour Lab', role: 'Gigs, contracts, finances, advancing', color: '#b08d57', action: 'Run the business' },
  { name: 'Signal Lab', role: 'AI captions, scheduling, media scanning', color: '#3d6b4a', action: 'Own the narrative' },
  { name: 'SONIX Lab', role: 'Mix chains, arrangement, production intelligence', color: '#6a7a9a', action: 'Make the music' },
  { name: 'Set Lab', role: 'Track library, set building, Rekordbox sync', color: '#9a6a5a', action: 'Prepare the set' },
]

const features = [
  { title: 'Contract parser', desc: 'Paste a booking email. AI extracts venue, times, hotel, backline, fee, deposits — creates the gig in one click.' },
  { title: 'Content intelligence', desc: 'Drop a show clip. AI finds the best 15 seconds, scores engagement potential, suggests platform-specific cuts.' },
  { title: 'Track intelligence', desc: 'Every track gets energy scoring, mix-in techniques, crowd reaction predictions, and flow compatibility with your library.' },
  { title: 'Tone profiles', desc: 'Scan your favourite artists\' posting styles. AI learns the voice and generates captions that sound like you, not a brand.' },
  { title: 'Rekordbox sync', desc: 'Import your full Rekordbox library. AI enriches every track. Export sets back as Rekordbox XML playlists.' },
  { title: 'SONIX Lab VST', desc: 'A plugin that lives in Ableton. Scans your plugins, recommends mix chains, copies settings to clipboard. D16-style hardware UI.' },
]

const faqs = [
  {
    q: 'Why one system instead of separate tools?',
    a: 'Because the magic is in the connections. Your gig data informs your content timing. Your set prep connects to your show schedule. Your production workflow feeds back into releases. Separate tools can\'t do that.',
  },
  {
    q: 'How much does traditional advancing cost?',
    a: 'A dedicated advancing service runs around £150 per show. At 20 shows a year, that\'s £3,000. Artist OS is £59/month — £708/year — and it does advancing, content, set prep, and production tools.',
  },
  {
    q: 'Do I need to be a touring DJ to use this?',
    a: 'No. If you\'re making electronic music and posting about it, there\'s value here. But if you\'re playing shows regularly, the ROI is immediate.',
  },
  {
    q: 'Is there a free tier?',
    a: 'Not yet. We\'re in private beta and want to focus on artists who are serious about their workflow. No payment details needed to join the waitlist.',
  },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { setStatus('error'); setMessage('Enter your email.'); return }
    try {
      setStatus('loading'); setMessage('')
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ email, source: 'artist-os-landing' }),
      })
      if (res.ok || res.status === 409) { setStatus('success'); setMessage(res.status === 409 ? "You're already on the list." : "You're in. We'll be in touch."); setEmail(''); return }
      setStatus('error'); setMessage('Something went wrong. Try again.')
    } catch { setStatus('error'); setMessage('Something went wrong. Try again.') }
  }

  return (
    <div className="min-h-screen bg-[#070706] text-[#f0ebe2] font-mono">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Unbounded:wght@200;300;400&display=swap');
        .display-font { font-family: 'Unbounded', sans-serif; }
        .mono-font { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* HEADER */}
      <header className="border-b border-[#1a1917] sticky top-0 z-30 bg-[#070706]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="tracking-[0.28em] text-[11px] text-[#b08d57] uppercase">Artist OS</div>
          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.18em] uppercase text-[#8a8780]">
            <a href="#labs" className="hover:text-[#f0ebe2] transition-colors">Labs</a>
            <a href="#features" className="hover:text-[#f0ebe2] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#f0ebe2] transition-colors">Pricing</a>
            <a href="#waitlist" className="border border-[#b08d57] px-5 py-2 text-[#b08d57] hover:bg-[#b08d57] hover:text-[#070706] transition-all">Waitlist</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="border-b border-[#1a1917]">
          <div className="mx-auto max-w-7xl px-6 py-8 md:py-14">
            <div className="max-w-6xl">
              <div className="flex items-center gap-4 text-[#b08d57] text-[11px] tracking-[0.35em] uppercase mb-8">
                <span className="block h-px w-12 bg-[#b08d57]" />
                <span>Private beta — join the waitlist</span>
              </div>
              <h1 className="display-font text-[48px] leading-[0.96] md:text-[100px] md:leading-[0.93] font-[200] tracking-[-0.05em] text-[#f0ebe2] max-w-5xl">
                Your gigs. Your content. Your music. One system.
              </h1>
              <p className="mt-10 max-w-3xl text-[18px] md:text-[26px] leading-[1.8] text-[#8a8780]">
                Artist OS replaces the spreadsheets, the WhatsApp threads, the five different apps. Tour management, AI content, production tools, and DJ set prep — connected, intelligent, built for electronic artists.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <a href="#waitlist" className="border border-[#b08d57] bg-[#b08d57] px-8 py-4 text-[13px] uppercase tracking-[0.28em] text-[#070706] transition hover:opacity-90 text-center">
                  Join the waitlist →
                </a>
                <a href="#labs" className="border border-[#1a1917] px-8 py-4 text-[13px] uppercase tracking-[0.28em] text-[#8a8780] hover:border-[#b08d57] hover:text-[#b08d57] transition-all text-center">
                  See what's inside
                </a>
              </div>
            </div>

            {/* STATS BAR */}
            <div className="mt-20 grid grid-cols-2 gap-px border border-[#1a1917] bg-[#1a1917] md:grid-cols-4">
              {[
                ['4 labs', 'Tour · Signal · SONIX · Set', 'Fully integrated'],
                ['£59 / month', 'Artist tier', 'Most popular'],
                ['£2,292 saved', 'vs traditional advancing', 'At 20 shows / year'],
                ['1 system', 'Replaces 5+ tools', 'No context switching'],
              ].map(([value, label, sub]) => (
                <div key={value} className="bg-[#0b0a09] p-7 md:p-8">
                  <div className="text-[28px] md:text-[32px] text-[#f0ebe2]">{value}</div>
                  <div className="mt-3 text-[12px] uppercase tracking-[0.2em] text-[#52504c]">{label}</div>
                  <div className="mt-1 text-[12px] text-[#3d6b4a]">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LABS */}
        <section id="labs" className="border-b border-[#1a1917]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="flex items-center gap-4 text-[#b08d57] text-[11px] tracking-[0.35em] uppercase mb-6">
              <span className="block h-px w-12 bg-[#b08d57]" />
              <span>The labs</span>
            </div>
            <h2 className="display-font text-[38px] md:text-[72px] font-[200] leading-[0.98] tracking-[-0.04em] max-w-4xl">
              Four connected modules. One artist workflow.
            </h2>
            <p className="mt-8 max-w-3xl text-[18px] leading-[1.8] text-[#8a8780]">
              Create music → build sets → play shows → tell the story. Each lab handles one part. Together they form the full creative cycle.
            </p>

            <div className="mt-16 grid gap-4 md:grid-cols-2">
              {labs.map(lab => (
                <div key={lab.name} className="border border-[#1a1917] bg-[#0b0a09] p-8 md:p-10 flex flex-col">
                  <div className="display-font text-[28px] md:text-[36px] font-[200] tracking-[-0.03em]" style={{ color: lab.color }}>{lab.name}</div>
                  <div className="mt-3 text-[14px] leading-[1.8] text-[#8a8780] flex-1">{lab.role}</div>
                  <div className="mt-6 text-[18px] text-[#f0ebe2]">{lab.action}</div>
                </div>
              ))}
            </div>

            {/* ARCHITECTURE DIAGRAM */}
            <div className="mt-16 border border-[#1a1917] bg-[#0b0a09] p-8 md:p-12">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#52504c] mb-8">How they connect</div>
              <div className="hidden md:block">
                <div className="flex justify-center">
                  <div className="border border-[#3a2e1f] px-8 py-5 text-center">
                    <div className="display-font text-[28px] font-[200] text-[#f0ebe2]">Artist OS</div>
                    <div className="mt-2 text-[12px] text-[#8a8780]">The core — everything connects here</div>
                  </div>
                </div>
                <div className="mx-auto h-8 w-px bg-[#3a2e1f]" />
                <div className="mx-auto h-px max-w-[700px] bg-[#3a2e1f]" />
                <div className="grid grid-cols-4 gap-4 pt-8">
                  {labs.map(lab => (
                    <div key={lab.name} className="relative text-center">
                      <div className="absolute left-1/2 top-[-32px] h-8 w-px -translate-x-1/2 bg-[#3a2e1f]" />
                      <div className="border border-[#1a1917] bg-[#070706] px-4 py-5">
                        <div className="display-font text-[20px] font-[200]" style={{ color: lab.color }}>{lab.name}</div>
                        <div className="mt-4 text-[14px]" style={{ color: lab.color }}>{lab.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-8 text-center text-[15px] leading-[1.8] text-[#8a8780] max-w-3xl mx-auto">
                Your gig data feeds your content calendar. Your set prep connects to your show schedule. Production decisions flow into releases. One system that gets smarter the more you use it.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="border-b border-[#1a1917]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="flex items-center gap-4 text-[#b08d57] text-[11px] tracking-[0.35em] uppercase mb-6">
              <span className="block h-px w-12 bg-[#b08d57]" />
              <span>What makes it different</span>
            </div>
            <h2 className="display-font text-[38px] md:text-[72px] font-[200] leading-[0.98] tracking-[-0.04em] max-w-4xl">
              Intelligence built into every step.
            </h2>
            <div className="mt-16 grid gap-px border border-[#1a1917] bg-[#1a1917] md:grid-cols-2 lg:grid-cols-3">
              {features.map(f => (
                <div key={f.title} className="bg-[#0b0a09] p-8">
                  <div className="text-[14px] text-[#b08d57] mb-4">{f.title}</div>
                  <div className="text-[14px] leading-[1.8] text-[#8a8780]">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="border-b border-[#1a1917]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-[0.35em] text-[#b08d57]">Pricing</div>
              <h2 className="display-font mt-6 text-[38px] md:text-[72px] font-[200] leading-[1.02] tracking-[-0.04em]">
                Simple. No surprises.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#8a8780]">
                Most touring artists choose the Artist tier. If you're just making music, Creator has everything you need. Management is for teams running multiple artists.
              </p>
            </div>
            <div className="mt-16 grid gap-px border border-[#1a1917] bg-[#1a1917] lg:grid-cols-4">
              {plans.map(plan => (
                <div key={plan.name} className={`${plan.featured ? 'bg-[#11100d]' : 'bg-[#0b0a09]'} p-8 md:p-10 flex flex-col`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-[#52504c]">{plan.name}</div>
                    {plan.featured && (
                      <div className="border border-[#3a2e1f] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#b08d57]">
                        Most popular
                      </div>
                    )}
                  </div>
                  <div className={`mt-5 text-[40px] ${plan.accent}`}>{plan.price}</div>
                  <div className="text-[12px] uppercase tracking-[0.2em] text-[#52504c]">per month</div>
                  <p className="mt-5 text-[14px] leading-[1.8] text-[#8a8780] min-h-[72px]">{plan.tagline}</p>
                  <ul className="mt-5 space-y-3 text-[14px] leading-[1.7] text-[#8a8780] flex-1">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex gap-3">
                        <span className="text-[#b08d57] shrink-0">·</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.name === 'Management' ? (
                    <a href="mailto:hello@artistos.io?subject=Management%20Demo" className="mt-8 border border-[#1a1917] px-5 py-4 text-[11px] uppercase tracking-[0.28em] text-center text-[#f0ebe2] hover:border-[#b08d57] hover:text-[#b08d57] transition-all">
                      {plan.button}
                    </a>
                  ) : (
                    <a href="#waitlist" className={`mt-8 border px-5 py-4 text-[11px] uppercase tracking-[0.28em] text-center transition-all ${plan.featured ? 'border-[#b08d57] bg-[#b08d57] text-[#070706] hover:opacity-90' : 'border-[#1a1917] text-[#f0ebe2] hover:border-[#b08d57] hover:text-[#b08d57]'}`}>
                      {plan.button}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* SAVINGS COMPARISON */}
            <div className="mt-12 grid gap-px border border-[#1a1917] bg-[#1a1917] md:grid-cols-3">
              {[
                ['Without Artist OS', '~£3,000 / year', 'Advancing alone at £150/show × 20 shows'],
                ['With Artist OS', '£708 / year', 'Plus content, production, and set prep tools'],
                ['You save', '£2,292+', 'Before content and workflow gains'],
              ].map(([label, value, sub]) => (
                <div key={label} className="bg-[#0b0a09] p-8 text-center">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#52504c]">{label}</div>
                  <div className="mt-4 text-[32px] text-[#f0ebe2]">{value}</div>
                  <div className="mt-2 text-[13px] text-[#52504c]">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="border-b border-[#1a1917]">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#b08d57]">Private beta</div>
            <h2 className="display-font mt-6 text-[38px] md:text-[78px] font-[200] leading-[1.02] tracking-[-0.05em]">
              Ready when you are.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-[18px] leading-[1.8] text-[#8a8780]">
              Built for electronic artists who are tired of duct-taping their workflow together. Early access. No payment details. Just your email.
            </p>
            <form onSubmit={handleWaitlistSubmit} className="mx-auto mt-10 max-w-2xl">
              <div className="flex flex-col border border-[#1a1917] bg-[#0b0a09] sm:flex-row">
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={status === 'loading'}
                  className="w-full bg-transparent px-7 py-5 text-[16px] text-[#f0ebe2] outline-none placeholder:text-[#52504c] disabled:opacity-50" />
                <button type="submit" disabled={status === 'loading'}
                  className="border-t border-[#1a1917] bg-[#b08d57] px-8 py-5 text-[12px] uppercase tracking-[0.3em] text-[#070706] sm:border-l sm:border-t-0 disabled:opacity-50 transition-opacity hover:opacity-90">
                  {status === 'loading' ? 'Joining...' : 'Join →'}
                </button>
              </div>
              {message && (
                <p className={`mt-4 text-[14px] tracking-[0.08em] ${status === 'success' ? 'text-[#3d6b4a]' : 'text-[#d97706]'}`}>{message}</p>
              )}
              <p className="mt-4 text-[12px] tracking-[0.12em] uppercase text-[#52504c]">No payment details needed</p>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#b08d57]">FAQ</div>
            <div className="mt-10 grid gap-px border border-[#1a1917] bg-[#1a1917]">
              {faqs.map(faq => (
                <div key={faq.q} className="bg-[#0b0a09] p-8 md:p-10">
                  <h3 className="display-font text-[22px] md:text-[26px] font-[200] tracking-[-0.03em]">{faq.q}</h3>
                  <p className="mt-4 max-w-4xl text-[15px] leading-[1.8] text-[#8a8780]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1917] py-10 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#52504c]">Artist OS · Private beta · 2026</div>
          <div className="text-[11px] tracking-[0.15em] text-[#52504c]">
            <a href="mailto:hello@artistos.io" className="hover:text-[#8a8780] transition-colors">hello@artistos.io</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
