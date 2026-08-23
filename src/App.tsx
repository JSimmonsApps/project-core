import { type ChangeEvent, type ReactNode, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  Download,
  ExternalLink,
  Filter,
  HardDrive,
  Layers3,
  Map,
  Menu,
  Minus,
  PackageOpen,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { categories, getResource, packs, resources, type CorePack, type Resource, type ResourceCategory } from '@/data/core-data';
import { CoreProvider, useCoreStore, type CoreProfile } from '@/hooks/use-core-store';

const queryClient = new QueryClient();
const logoSrc = `${import.meta.env.BASE_URL}CORE_LOGO.png`;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring flex items-center gap-3" data-testid="link-logo">
      <img src={logoSrc} alt="Project CORE compass logo" className={compact ? 'h-9 w-9 object-contain' : 'h-11 w-11 object-contain'} data-testid="img-core-logo" />
      {!compact && <span className="leading-none"><strong className="display block text-[15px] font-bold tracking-[.18em] text-[#E2E8F0]">PROJECT CORE</strong><span className="mono mt-1 block text-[8px] tracking-[.13em] text-[#728394]">OFFLINE RESOURCE ENVIRONMENT</span></span>}
    </Link>
  );
}

function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const selectedCount = useCoreStore().selectedIds.length;
  const navItems = [
    { href: '/', label: 'Overview', icon: Compass },
    { href: '/atlas', label: 'Resource Atlas', icon: Map },
    { href: '/builder', label: 'CORE Builder', icon: Layers3, count: selectedCount },
    { href: '/packs', label: 'Packs', icon: PackageOpen },
  ];

  return (
    <div className="grain instrument-shell min-h-[100dvh] text-[#E2E8F0]">
      <div className="topo-grid pointer-events-none fixed inset-0 z-0 opacity-70" />
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col border-r border-[#2E3A46]/70 bg-[#0B1218]/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-start justify-between">
          <Logo />
          <button type="button" onClick={() => setMobileOpen(false)} className="focus-ring rounded-md p-1 text-[#728394] hover:text-[#E2E8F0] lg:hidden" aria-label="Close navigation" data-testid="button-close-navigation"><X size={18} /></button>
        </div>
        <div className="mt-11">
          <div className="mono mb-3 px-3 text-[9px] uppercase tracking-[.2em] text-[#617486]">Navigation</div>
          <nav className="space-y-1" aria-label="Primary navigation">
            {navItems.map(({ href, label, icon: Icon, count }) => {
              const active = href === '/' ? location === '/' : location.startsWith(href);
              return (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`focus-ring group flex items-center gap-3 rounded-md border px-3 py-3 text-[13px] font-medium transition-instrument ${active ? 'border-[#0084FF]/35 bg-[#0084FF]/10 text-[#E2E8F0]' : 'border-transparent text-[#8EA0B0] hover:border-[#2E3A46] hover:bg-[#16212A] hover:text-[#E2E8F0]'}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
                  <Icon size={17} strokeWidth={1.7} className={active ? 'text-[#0084FF]' : 'text-[#718697] group-hover:text-[#AFC4D7]'} />
                  <span className="flex-1">{label}</span>
                  {count ? <span className="mono rounded bg-[#0084FF] px-1.5 py-0.5 text-[10px] text-white" data-testid="text-builder-count">{count}</span> : null}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto">
          <div className="rounded-md border border-[#2E3A46] bg-[#111B23] p-3.5">
            <div className="mb-3 flex items-center gap-2 text-[#AFC4D7]"><ShieldCheck size={15} className="text-[#22C55E]" /><span className="mono text-[9px] uppercase tracking-[.15em]">Local by default</span></div>
            <p className="text-[11px] leading-relaxed text-[#718697]">Your selections and profile stay in this browser. No account required.</p>
            <div className="status-line mt-3 flex items-center gap-2 text-[10px] text-[#22C55E]"><span /> Storage ready</div>
          </div>
          <div className="mt-5 flex items-center justify-between px-1 text-[10px] text-[#536878]"><span className="mono">CORE / v0.1</span><Link href="/builder" className="focus-ring hover:text-[#E2E8F0]" data-testid="link-settings"><SlidersHorizontal size={14} /></Link></div>
        </div>
      </aside>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-[#05080b]/70 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu" data-testid="button-menu-overlay" />}
      <main className="relative z-10 min-h-[100dvh] lg:pl-[250px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#2E3A46]/60 bg-[#0A1016]/80 px-5 backdrop-blur-xl sm:px-8 lg:px-12">
          <button type="button" onClick={() => setMobileOpen(true)} className="focus-ring rounded-md p-2 text-[#8EA0B0] hover:text-[#E2E8F0] lg:hidden" aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={20} /></button>
          <div className="hidden items-center gap-2 text-[11px] text-[#617486] sm:flex"><span className="mono">ENVIRONMENT /</span><span className="text-[#AFC4D7]">LOCAL WORKSPACE</span><span className="pulse-dot ml-1 h-1.5 w-1.5 rounded-full bg-[#22C55E]" /></div>
          <div className="flex items-center gap-3"><Link href="/atlas" className="focus-ring flex items-center gap-2 rounded border border-[#2E3A46] px-3 py-2 text-[11px] font-medium text-[#AFC4D7] transition-instrument hover:border-[#0084FF]/50 hover:text-[#E2E8F0]" data-testid="link-header-atlas"><Search size={14} /> <span className="hidden sm:inline">Explore atlas</span></Link><Link href="/builder" className="focus-ring flex items-center gap-2 rounded bg-[#0084FF] px-3 py-2 text-[11px] font-bold text-white transition-instrument hover:bg-[#2495ff]" data-testid="link-header-builder"><Zap size={14} /> Build CORE</Link></div>
        </header>
        {children}
      </main>
    </div>
  );
}

function SectionLabel({ children, detail }: { children: ReactNode; detail?: string }) {
  return <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#728394]"><span className="h-px w-5 bg-[#0084FF]" />{children}{detail && <span className="ml-1 text-[#435665]">/ {detail}</span>}</div>;
}

function Metric({ value, label, accent = 'blue' }: { value: string; label: string; accent?: 'blue' | 'green' | 'orange' }) {
  const colors = { blue: 'text-[#53adff]', green: 'text-[#55d77e]', orange: 'text-[#ff9c58]' };
  return <div><div className={`display text-3xl font-semibold ${colors[accent]}`} data-testid={`metric-value-${label.toLowerCase().replaceAll(' ', '-')}`}>{value}</div><div className="mono mt-1 text-[9px] uppercase tracking-[.14em] text-[#728394]">{label}</div></div>;
}

function Home() {
  const store = useCoreStore();
  const featured = resources.filter((resource) => resource.featured);
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
      <section className="relative grid min-h-[610px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <div className="reveal">
          <SectionLabel detail="FIELD INSTRUMENT ONLINE">Project Core</SectionLabel>
          <h1 className="display mt-7 max-w-[760px] text-[clamp(3.5rem,8vw,7.6rem)] font-semibold leading-[.9] text-[#E2E8F0]">Stay capable<br /><span className="text-[#0084FF]">off the map.</span></h1>
          <p className="mt-8 max-w-[570px] text-lg leading-relaxed text-[#9AAEBD]">Build a personal offline world environment from resources you trust. No internet? No problem.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/atlas" className="focus-ring inline-flex items-center gap-2 rounded bg-[#0084FF] px-5 py-3.5 text-sm font-bold text-white transition-instrument hover:bg-[#2495ff]" data-testid="link-hero-explore">Explore the atlas <ArrowRight size={16} /></Link>
            <Link href="/builder" className="focus-ring inline-flex items-center gap-2 rounded border border-[#3C5060] px-5 py-3.5 text-sm font-semibold text-[#C4D3DF] transition-instrument hover:border-[#0084FF] hover:bg-[#142330]" data-testid="link-hero-builder">Open builder <Layers3 size={16} /></Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-9 gap-y-5 border-t border-[#2E3A46]/70 pt-6">
            <Metric value={`${resources.length}`} label="atlas resources" />
            <Metric value={`${packs.length}`} label="ready-made packs" accent="green" />
            <Metric value="0" label="accounts needed" accent="orange" />
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-8 rounded-full bg-[#0084FF]/[.06] blur-3xl" />
          <div className="instrument-card relative aspect-square overflow-hidden rounded-full border-[#416075]/60 p-3">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#365061] bg-[#101d27]">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(100,145,170,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(100,145,170,.18) 1px, transparent 1px)', backgroundSize: '45px 45px', transform: 'rotate(12deg) scale(1.3)' }} />
              <div className="absolute h-[70%] w-[70%] rounded-full border border-[#506d80]/70" /><div className="absolute h-[48%] w-[48%] rounded-full border border-dashed border-[#506d80]/60" />
              <div className="relative z-10 flex h-[39%] w-[39%] items-center justify-center rounded-full border-2 border-[#0084FF]/70 bg-[#0B1720] shadow-[0_0_45px_rgba(0,132,255,.22)]"><img src={logoSrc} alt="" className="h-[78%] w-[78%] object-contain" /></div>
              <div className="mono absolute left-[13%] top-[28%] text-[9px] tracking-[.15em] text-[#5e849b]">N 37° 46' 12"</div>
              <div className="mono absolute bottom-[22%] right-[12%] text-[9px] tracking-[.15em] text-[#5e849b]">W 122° 25' 09"</div>
              <div className="absolute bottom-[12%] left-1/2 h-px w-[52%] -translate-x-1/2 bg-[#2f5a70]" /><span className="mono absolute bottom-[8%] text-[8px] tracking-[.2em] text-[#6f8b9b]">PERSONAL / LOCAL / READY</span>
            </div>
          </div>
          <div className="instrument-card absolute -bottom-3 -left-2 rounded px-4 py-3 sm:-left-12"><div className="status-line flex items-center gap-2"><span className="mono text-[9px] tracking-[.16em] text-[#22C55E]">SYSTEM READY</span></div><div className="mono mt-1 text-[9px] text-[#617486]">LOCAL STORAGE ACTIVE</div></div>
          <div className="absolute -right-1 top-10 hidden rounded border border-[#2E3A46] bg-[#121f29] px-3 py-2 sm:block"><div className="mono text-[9px] text-[#728394]">CORE / 001</div><div className="mt-1 text-[11px] text-[#C4D3DF]">Your offline world</div></div>
        </div>
      </section>

      <section className="grid gap-4 border-y border-[#2E3A46]/70 py-8 md:grid-cols-3">
        <div className="flex gap-4 pr-4 md:border-r md:border-[#2E3A46]/70"><ShieldCheck className="mt-1 shrink-0 text-[#22C55E]" size={19} /><div><h2 className="text-sm font-semibold text-[#D7E2EA]">Trust the source</h2><p className="mt-1 text-[12px] leading-relaxed text-[#718697]">Every atlas entry points back to a legitimate publisher. No mystery downloads.</p></div></div>
        <div className="flex gap-4 pr-4 md:border-r md:border-[#2E3A46]/70"><HardDrive className="mt-1 shrink-0 text-[#0084FF]" size={19} /><div><h2 className="text-sm font-semibold text-[#D7E2EA]">Keep it local</h2><p className="mt-1 text-[12px] leading-relaxed text-[#718697]">Your builder is a private workspace, persisted in this browser.</p></div></div>
        <div className="flex gap-4"><Sparkles className="mt-1 shrink-0 text-[#F97316]" size={19} /><div><h2 className="text-sm font-semibold text-[#D7E2EA]">Make it yours</h2><p className="mt-1 text-[12px] leading-relaxed text-[#718697]">Choose resources, define your profile, export a portable manifest.</p></div></div>
      </section>

      <section className="py-20">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><SectionLabel detail="CURATED STARTING POINT">01 / Atlas</SectionLabel><h2 className="display mt-4 text-4xl font-semibold text-[#E2E8F0]">Begin with a solid kit.</h2></div><Link href="/atlas" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[#53adff] hover:text-white" data-testid="link-featured-atlas">View all resources <ArrowRight size={15} /></Link></div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">{featured.map((resource) => <ResourceCard key={resource.id} resource={resource} selected={store.selectedIds.includes(resource.id)} onToggle={() => store.toggleResource(resource.id)} />)}</div>
      </section>
      <section className="grid items-center gap-10 border-t border-[#2E3A46]/70 py-20 lg:grid-cols-[.8fr_1.2fr]">
        <div><SectionLabel detail="THE PRINCIPLE">02 / Why CORE</SectionLabel><h2 className="display mt-5 max-w-[520px] text-4xl font-semibold leading-tight text-[#E2E8F0]">Preserve information.<br /><span className="text-[#7b91a2]">Keep the unconnected connected.</span></h2></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="instrument-card rounded p-5"><span className="mono text-[10px] text-[#0084FF]">01 / KNOWLEDGE</span><p className="mt-5 text-sm leading-relaxed text-[#AFC4D7]">The useful things should not vanish when a network does.</p></div><div className="instrument-card rounded p-5 sm:translate-y-8"><span className="mono text-[10px] text-[#22C55E]">02 / AGENCY</span><p className="mt-5 text-sm leading-relaxed text-[#AFC4D7]">Prepared is not paranoid. It is simply a choice to remain useful.</p></div></div>
      </section>
      <footer className="flex flex-col gap-3 border-t border-[#2E3A46]/70 pt-7 text-[10px] text-[#617486] sm:flex-row sm:items-center sm:justify-between"><div className="mono tracking-[.15em]">PROJECT CORE / CUSTOM OFFLINE RESOURCE ENVIRONMENT</div><div>Designed for the moment the connection disappears.</div></footer>
    </div>
  );
}

function ResourceCard({ resource, selected, onToggle }: { resource: Resource; selected: boolean; onToggle: () => void }) {
  return (
    <article className="instrument-card transition-instrument rounded-md p-5" data-testid={`card-resource-${resource.id}`}>
      <div className="flex items-start justify-between gap-3"><span className="mono rounded border border-[#3b5262] px-2 py-1 text-[9px] uppercase tracking-[.12em] text-[#8ea6b7]">{resource.category}</span><span className="h-2 w-2 rounded-full" style={{ backgroundColor: resource.color }} /></div>
      <Link href={`/atlas/${resource.id}`} className="focus-ring mt-6 block" data-testid={`link-resource-${resource.id}`}><h3 className="display text-xl font-semibold text-[#E2E8F0] transition-colors hover:text-[#53adff]">{resource.title}</h3><p className="mt-2 min-h-[48px] text-sm leading-relaxed text-[#8297A8]">{resource.description}</p></Link>
      <div className="mt-5 flex items-center justify-between border-t border-[#2E3A46] pt-4"><span className="mono text-[10px] text-[#617486]">{resource.size} / {resource.format}</span><button type="button" onClick={onToggle} className={`focus-ring flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[11px] font-semibold transition-instrument ${selected ? 'bg-[#22C55E]/15 text-[#55d77e]' : 'bg-[#263743] text-[#C4D3DF] hover:bg-[#0084FF] hover:text-white'}`} data-testid={`button-toggle-resource-${resource.id}`}>{selected ? <Check size={13} /> : <Plus size={13} />}{selected ? 'Added' : 'Add to CORE'}</button></div>
    </article>
  );
}

function Atlas() {
  const store = useCoreStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | ResourceCategory>('All');
  const visible = useMemo(() => resources.filter((resource) => {
    const matchesCategory = category === 'All' || resource.category === category;
    const haystack = `${resource.title} ${resource.description} ${resource.tags.join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
      <div className="reveal flex flex-col justify-between gap-7 border-b border-[#2E3A46]/70 py-12 sm:flex-row sm:items-end lg:py-16"><div><SectionLabel detail="RESOURCE DISCOVERY">ATLAS / 01</SectionLabel><h1 className="display mt-4 text-5xl font-semibold text-[#E2E8F0] sm:text-6xl">Find what holds.</h1><p className="mt-4 max-w-[590px] text-base text-[#8297A8]">A small, considered index of practical information from sources worth keeping.</p></div><div className="mono flex items-center gap-3 text-[11px] text-[#728394]"><span className="h-2 w-2 rounded-full bg-[#22C55E]" />{resources.length} indexed resources</div></div>
      <div className="sticky top-[72px] z-10 -mx-5 border-b border-[#2E3A46]/70 bg-[#0A1016]/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"><div className="flex flex-col gap-3 lg:flex-row"><label className="relative flex-1"><Search size={17} className="absolute left-3.5 top-3.5 text-[#617486]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, topics, field terms..." className="focus-ring h-11 w-full rounded border border-[#304554] bg-[#121e27] pl-10 pr-3 text-sm text-[#E2E8F0] placeholder:text-[#617486]" data-testid="input-atlas-search" /></label><div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-subtle">{['All', ...categories].map((item) => <button key={item} type="button" onClick={() => setCategory(item as 'All' | ResourceCategory)} className={`focus-ring whitespace-nowrap rounded border px-3 py-2 text-[11px] font-medium transition-instrument ${category === item ? 'border-[#0084FF]/70 bg-[#0084FF]/15 text-[#7dc2ff]' : 'border-[#304554] text-[#8297A8] hover:border-[#537086] hover:text-[#E2E8F0]'}`} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}><Filter size={12} className="mr-1.5 inline" />{item}</button>)}</div></div></div>
      <div className="mb-6 mt-9 flex items-center justify-between"><span className="mono text-[10px] uppercase tracking-[.15em] text-[#617486]">Showing {visible.length} results</span>{query || category !== 'All' ? <button type="button" onClick={() => { setQuery(''); setCategory('All'); }} className="focus-ring flex items-center gap-1 text-[11px] text-[#53adff] hover:text-white" data-testid="button-clear-filters"><RotateCcw size={12} /> Clear filters</button> : null}</div>
      {visible.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((resource, index) => <div className={`reveal reveal-delay-${Math.min(index % 4, 3)}`} key={resource.id}><ResourceCard resource={resource} selected={store.selectedIds.includes(resource.id)} onToggle={() => store.toggleResource(resource.id)} /></div>)}</div> : <EmptyState query={query} />}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return <div className="instrument-card flex min-h-[300px] flex-col items-center justify-center rounded-md px-6 text-center"><Search size={26} className="text-[#617486]" /><h2 className="display mt-5 text-xl font-semibold text-[#E2E8F0]">No coordinates found</h2><p className="mt-2 max-w-sm text-sm text-[#8297A8]">Nothing in the atlas matches “{query}”. Try a broader field term or clear the filters.</p></div>;
}

function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const resource = id ? getResource(id) : undefined;
  const store = useCoreStore();
  if (!resource) return <NotFound />;
  const selected = store.selectedIds.includes(resource.id);
  return <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 lg:px-12"><Link href="/atlas" className="focus-ring mt-9 inline-flex items-center gap-2 text-xs text-[#8297A8] hover:text-white" data-testid="link-back-atlas"><ArrowLeft size={14} /> Back to atlas</Link><div className="mt-10 grid gap-12 lg:grid-cols-[1fr_330px]"><div className="reveal"><SectionLabel detail={`ATLAS / ${resource.category.toUpperCase()}`}>RESOURCE DETAIL</SectionLabel><div className="mt-6 flex items-start gap-4"><span className="mt-2 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: resource.color }} /><h1 className="display text-5xl font-semibold leading-[.98] text-[#E2E8F0] sm:text-6xl">{resource.title}</h1></div><p className="mt-7 max-w-[700px] text-xl leading-relaxed text-[#AFC4D7]">{resource.detail}</p><div className="mt-9 flex flex-wrap gap-2">{resource.tags.map((tag) => <span key={tag} className="mono rounded border border-[#385060] px-3 py-1.5 text-[10px] text-[#8297A8]">#{tag}</span>)}</div><div className="mt-12 border-t border-[#2E3A46] pt-7"><h2 className="mono text-[10px] uppercase tracking-[.18em] text-[#728394]">Source record</h2><div className="mt-5 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"><div><div className="font-semibold text-[#E2E8F0]">{resource.sourceLabel}</div><div className="mono mt-1 text-[10px] text-[#617486]">{resource.source}</div></div><a href={resource.source} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-[#3c5668] px-4 py-2.5 text-xs font-semibold text-[#C4D3DF] hover:border-[#0084FF] hover:text-white" data-testid="link-open-source">Open official source <ExternalLink size={14} /></a></div></div></div><aside className="reveal reveal-delay-1 h-fit rounded-md border border-[#2E3A46] bg-[#121e27] p-5"><div className="mono text-[10px] uppercase tracking-[.16em] text-[#728394]">Resource metadata</div><div className="mt-6 space-y-5">{[['FORMAT', resource.format], ['EST. SIZE', resource.size], ['MAINTENANCE', resource.maintained], ['STATUS', 'Ready to collect']].map(([label, value]) => <div key={label} className="flex items-end justify-between border-b border-[#2E3A46] pb-3"><span className="mono text-[9px] text-[#617486]">{label}</span><span className={`text-right text-xs ${label === 'STATUS' ? 'text-[#55d77e]' : 'text-[#C4D3DF]'}`}>{value}</span></div>)}</div><button type="button" onClick={() => store.toggleResource(resource.id)} className={`focus-ring mt-7 flex w-full items-center justify-center gap-2 rounded py-3 text-sm font-bold transition-instrument ${selected ? 'bg-[#22C55E]/15 text-[#55d77e]' : 'bg-[#0084FF] text-white hover:bg-[#2495ff]'}`} data-testid="button-detail-toggle">{selected ? <><Check size={16} /> Added to CORE</> : <><Plus size={16} /> Add to CORE</>}</button><p className="mt-4 text-center text-[10px] leading-relaxed text-[#617486]">Adding a resource records your choice locally. It does not download files.</p></aside></div></div>;
}

function Builder() {
  const store = useCoreStore();
  const [saved, setSaved] = useState(false);
  const [profileDraft, setProfileDraft] = useState<CoreProfile>(store.profile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSize = store.selectedResources.reduce((sum, resource) => sum + Number.parseFloat(resource.size), 0);
  const manifest = { schema: 'project-core/0.1', exportedAt: new Date().toISOString(), profile: store.profile, selectedIds: store.selectedIds };
  const saveProfile = () => { store.updateProfile(profileDraft); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  const downloadManifest = () => { const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'core-manifest.json'; anchor.click(); URL.revokeObjectURL(url); };
  const importManifest = async (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; try { store.importState(JSON.parse(await file.text())); setSaved(true); window.setTimeout(() => setSaved(false), 1800); } catch { window.alert('This file could not be read as a CORE manifest.'); } event.target.value = ''; };
  return <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12"><div className="reveal flex flex-col justify-between gap-6 border-b border-[#2E3A46]/70 py-12 sm:flex-row sm:items-end lg:py-16"><div><SectionLabel detail="PERSONAL CONFIGURATION">BUILDER / 02</SectionLabel><h1 className="display mt-4 text-5xl font-semibold text-[#E2E8F0] sm:text-6xl">Make it yours.</h1><p className="mt-4 max-w-[550px] text-base text-[#8297A8]">Shape a portable CORE manifest around the information your world actually needs.</p></div><div className="flex gap-2"><input ref={fileInputRef} type="file" accept="application/json,.json" onChange={importManifest} className="hidden" data-testid="input-import-manifest" /><button type="button" onClick={() => fileInputRef.current?.click()} className="focus-ring flex items-center gap-2 rounded border border-[#3c5668] px-3 py-2.5 text-xs font-semibold text-[#C4D3DF] hover:border-[#0084FF] hover:text-white" data-testid="button-import-manifest"><Upload size={14} /> Import</button><button type="button" onClick={downloadManifest} className="focus-ring flex items-center gap-2 rounded bg-[#0084FF] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#2495ff]" data-testid="button-export-manifest"><Download size={14} /> Export manifest</button></div></div>
    {saved && <div className="reveal mt-5 flex items-center gap-2 rounded border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-3 text-xs text-[#70e890]" data-testid="status-manifest-saved"><Check size={15} /> CORE manifest updated locally.</div>}
    <div className="mt-9 grid gap-5 xl:grid-cols-[1.35fr_.65fr]"><section className="instrument-card rounded-md p-5 sm:p-7"><div className="flex items-center justify-between"><div><SectionLabel detail={`${store.selectedResources.length} SELECTED`}>YOUR CORE</SectionLabel><h2 className="display mt-3 text-2xl font-semibold text-[#E2E8F0]">{store.profile.name}</h2></div><div className="rounded border border-[#22C55E]/30 bg-[#22C55E]/10 p-2.5 text-[#55d77e]"><Box size={21} /></div></div>{store.selectedResources.length ? <div className="mt-7 divide-y divide-[#2E3A46]">{store.selectedResources.map((resource) => <div className="flex items-center gap-4 py-4 first:pt-0" key={resource.id} data-testid={`row-selected-resource-${resource.id}`}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: resource.color }} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-[#D7E2EA]">{resource.title}</div><div className="mono mt-1 text-[9px] text-[#617486]">{resource.category} / {resource.size}</div></div><Link href={`/atlas/${resource.id}`} className="focus-ring p-2 text-[#617486] hover:text-[#53adff]" data-testid={`link-selected-resource-${resource.id}`}><ChevronRight size={16} /></Link><button type="button" onClick={() => store.removeResource(resource.id)} className="focus-ring p-2 text-[#617486] hover:text-[#F97316]" aria-label={`Remove ${resource.title}`} data-testid={`button-remove-resource-${resource.id}`}><Minus size={16} /></button></div>)}</div> : <div className="my-7 rounded border border-dashed border-[#3a5364] px-5 py-12 text-center"><PackageOpen size={26} className="mx-auto text-[#617486]" /><h3 className="mt-4 text-sm font-semibold text-[#C4D3DF]">Your manifest is waiting for its first layer.</h3><p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#718697]">Select resources from the atlas or begin with a ready-made pack.</p><Link href="/atlas" className="focus-ring mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#53adff]" data-testid="link-builder-empty-atlas">Browse atlas <ArrowRight size={14} /></Link></div>}<div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#2E3A46] pt-5"><div className="flex gap-8"><Metric value={`${store.selectedResources.length}`} label="resources" /><Metric value={`${totalSize.toFixed(1)} MB`} label="estimated footprint" accent="green" /></div><Link href="/atlas" className="focus-ring text-xs font-semibold text-[#53adff] hover:text-white" data-testid="link-builder-add-more">+ Add resources</Link></div></section>
      <aside className="space-y-5"><ProfileEditor profile={profileDraft} setProfile={setProfileDraft} onSave={saveProfile} saved={saved} /><StorageSummary count={store.selectedResources.length} size={totalSize} /></aside></div>
    <section className="mt-14"><div className="flex items-end justify-between"><div><SectionLabel detail="QUICK LOAD">READY-MADE PACKS</SectionLabel><h2 className="display mt-3 text-2xl font-semibold text-[#E2E8F0]">Start with a known route.</h2></div><Link href="/packs" className="focus-ring text-xs font-semibold text-[#53adff]" data-testid="link-builder-packs">Browse packs <ArrowRight className="ml-1 inline" size={13} /></Link></div><div className="mt-6 grid gap-4 md:grid-cols-3">{packs.map((pack) => <PackCard key={pack.id} pack={pack} onLoad={() => store.addMany(pack.resourceIds)} />)}</div></section></div>;
}

function ProfileEditor({ profile, setProfile, onSave, saved }: { profile: CoreProfile; setProfile: (profile: CoreProfile) => void; onSave: () => void; saved: boolean }) {
  const update = (key: keyof CoreProfile, value: string) => setProfile({ ...profile, [key]: value });
  return <section className="rounded-md border border-[#2E3A46] bg-[#121e27] p-5" data-testid="section-profile-editor"><div className="flex items-center gap-2"><UserRound size={16} className="text-[#0084FF]" /><SectionLabel>CORE PROFILE</SectionLabel></div><p className="mt-3 text-xs leading-relaxed text-[#718697]">A little context for the person who opens this manifest later.</p><div className="mt-5 space-y-4"><label className="block"><span className="mono mb-1.5 block text-[9px] uppercase tracking-[.13em] text-[#728394]">CORE name</span><input value={profile.name} onChange={(event) => update('name', event.target.value)} className="focus-ring h-10 w-full rounded border border-[#304554] bg-[#0D171F] px-3 text-sm text-[#E2E8F0]" data-testid="input-profile-name" /></label><label className="block"><span className="mono mb-1.5 block text-[9px] uppercase tracking-[.13em] text-[#728394]">Region / context</span><input value={profile.region} onChange={(event) => update('region', event.target.value)} className="focus-ring h-10 w-full rounded border border-[#304554] bg-[#0D171F] px-3 text-sm text-[#E2E8F0]" data-testid="input-profile-region" /></label><label className="block"><span className="mono mb-1.5 block text-[9px] uppercase tracking-[.13em] text-[#728394]">Purpose</span><textarea value={profile.purpose} onChange={(event) => update('purpose', event.target.value)} rows={3} className="focus-ring w-full resize-none rounded border border-[#304554] bg-[#0D171F] px-3 py-2.5 text-sm leading-relaxed text-[#E2E8F0]" data-testid="input-profile-purpose" /></label><button type="button" onClick={onSave} className="focus-ring flex w-full items-center justify-center gap-2 rounded bg-[#263743] py-2.5 text-xs font-bold text-[#C4D3DF] hover:bg-[#0084FF] hover:text-white" data-testid="button-save-profile">{saved ? <Check size={14} /> : <Download size={14} />}{saved ? 'Saved locally' : 'Save profile'}</button></div></section>;
}

function StorageSummary({ count, size }: { count: number; size: number }) {
  const percent = Math.min(100, Math.round((size / 128) * 100));
  return <section className="rounded-md border border-[#2E3A46] bg-[#121e27] p-5" data-testid="section-storage-summary"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><HardDrive size={16} className="text-[#22C55E]" /><span className="mono text-[10px] uppercase tracking-[.16em] text-[#AFC4D7]">Storage summary</span></div><CircleHelp size={14} className="text-[#617486]" /></div><div className="mt-6 flex items-end justify-between"><div className="display text-3xl font-semibold text-[#E2E8F0]" data-testid="text-storage-size">{size.toFixed(1)} <span className="text-base text-[#728394]">MB</span></div><span className="mono text-[10px] text-[#617486]">of 128 MB target</span></div><div className="mt-3 h-1.5 overflow-hidden rounded bg-[#263743]"><div className="h-full rounded bg-[#22C55E] transition-all duration-500" style={{ width: `${Math.max(percent, count ? 3 : 0)}%` }} /></div><p className="mt-3 text-[11px] leading-relaxed text-[#718697]">{count ? `${count} resource${count === 1 ? '' : 's'} queued for your manifest.` : 'Nothing selected yet. Your local space is clear.'}</p></section>;
}

function PackCard({ pack, onLoad }: { pack: CorePack; onLoad: () => void }) {
  const [loaded, setLoaded] = useState(false);
  return <article className="instrument-card transition-instrument rounded-md p-5" data-testid={`card-pack-${pack.id}`}><div className="flex items-start justify-between"><span className="mono text-[10px] tracking-[.15em] text-[#728394]">{pack.tone}</span><PackageOpen size={18} className="text-[#0084FF]" /></div><h3 className="display mt-6 text-xl font-semibold text-[#E2E8F0]">{pack.name}</h3><p className="mt-2 min-h-[42px] text-xs leading-relaxed text-[#8297A8]">{pack.description}</p><div className="mt-5 flex items-center justify-between border-t border-[#2E3A46] pt-4"><span className="mono text-[9px] text-[#617486]">{pack.resourceIds.length} resources / {pack.size}</span><button type="button" onClick={() => { onLoad(); setLoaded(true); }} className={`focus-ring flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[11px] font-semibold ${loaded ? 'bg-[#22C55E]/15 text-[#55d77e]' : 'bg-[#263743] text-[#C4D3DF] hover:bg-[#0084FF] hover:text-white'}`} data-testid={`button-load-pack-${pack.id}`}>{loaded ? <Check size={13} /> : <Plus size={13} />}{loaded ? 'Loaded' : 'Load pack'}</button></div></article>;
}

function Packs() {
  const store = useCoreStore();
  return <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 lg:px-12"><div className="reveal border-b border-[#2E3A46]/70 py-12 lg:py-16"><SectionLabel detail="CURATED COLLECTIONS">PACKS / 03</SectionLabel><h1 className="display mt-4 text-5xl font-semibold text-[#E2E8F0] sm:text-6xl">Known routes.</h1><p className="mt-4 max-w-[570px] text-base text-[#8297A8]">Load a focused set into your builder, then edit it until it fits your life.</p></div><div className="mt-9 grid gap-5 lg:grid-cols-3">{packs.map((pack, index) => <div key={pack.id} className={`reveal reveal-delay-${index + 1}`}><PackCard pack={pack} onLoad={() => store.addMany(pack.resourceIds)} /><div className="mt-4 space-y-2 pl-1">{pack.resourceIds.map((id) => { const resource = getResource(id); return resource ? <Link key={id} href={`/atlas/${id}`} className="focus-ring flex items-center gap-2 text-xs text-[#8297A8] hover:text-[#53adff]" data-testid={`link-pack-resource-${id}`}><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: resource.color }} />{resource.shortTitle}<ChevronRight size={12} className="ml-auto" /></Link> : null; })}</div></div>)}</div><div className="instrument-card mt-16 grid gap-6 rounded-md p-6 sm:grid-cols-[1fr_auto] sm:items-center"><div><SectionLabel detail="YOUR WORKSPACE">PACKS ARE STARTING POINTS</SectionLabel><h2 className="display mt-3 text-2xl font-semibold text-[#E2E8F0]">Nothing is locked.</h2><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#8297A8]">Loading a pack only adds its resources. Remove anything that does not belong, add what does, and export when the shape feels right.</p></div><Link href="/builder" className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-[#0084FF] px-4 py-3 text-xs font-bold text-white hover:bg-[#2495ff]" data-testid="link-packs-builder">Open your builder <ArrowRight size={14} /></Link></div></div>;
}

function NotFound() {
  return <div className="flex min-h-[70vh] items-center justify-center px-6 text-center"><div><div className="mono text-[10px] tracking-[.2em] text-[#0084FF]">SIGNAL / NOT FOUND</div><h1 className="display mt-5 text-5xl font-semibold text-[#E2E8F0]">No coordinates here.</h1><p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#8297A8]">This route is outside the current field map.</p><Link href="/" className="focus-ring mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#53adff]" data-testid="link-not-found-home"><ArrowLeft size={15} /> Return to overview</Link></div></div>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><AppShell><Switch><Route path="/" component={Home} /><Route path="/atlas" component={Atlas} /><Route path="/atlas/:id" component={ResourceDetail} /><Route path="/builder" component={Builder} /><Route path="/packs" component={Packs} /><Route component={NotFound} /></Switch></AppShell></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><CoreProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter></CoreProvider><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;