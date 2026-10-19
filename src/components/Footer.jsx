import { footer } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-violet/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-learning/20 blur-3xl" />
      </div>
      <div className="relative px-6 py-16 text-center sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-flow" />
          <span className="h-2.5 w-2.5 rounded-full bg-feedback" />
          <span className="h-2.5 w-2.5 rounded-full bg-learning" />
        </div>
        <p className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {footer.statement}
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cream/80">{footer.note}</p>
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-cream/70">{footer.credit}</p>
      </div>
    </footer>
  );
}
