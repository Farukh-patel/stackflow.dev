import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO.jsx';

const featureHighlights = [
  {
    title: 'Stack-specific playbooks',
    description: 'From MERN to Spring Boot, every kit focuses on practical builds and interview prompts.',
    metric: '18+ stacks',
  },
  {
    title: 'Actionable checklists',
    description: 'Each PDF includes experiments, shortcuts, and code snippets you can copy into your repo.',
    metric: '120+ snippets',
  },
  {
    title: 'Interview fast-track',
    description: 'DSA drills, system design briefs, and recruiter-facing recap sheets for instant prep.',
    metric: '45 min avg prep',
  },
];

const spotlightCategories = [
  { label: 'AI & ML', blurb: 'Model tuning, vector DBs, and LLM prompts.', color: 'from-indigo-500/20' },
  { label: 'Python', blurb: 'Automation playbooks + clean script recipes.', color: 'from-emerald-500/20' },
  { label: 'DSA', blurb: 'Topic-wise patterns, visuals, and mocks.', color: 'from-rose-500/20' },
  { label: 'JavaScript', blurb: 'Frontend + backend patterns, perf notes.', color: 'from-amber-500/20' },
];

const workflow = [
  { step: '01', title: 'Pick a track', text: 'Filter notes by stack, difficulty, or interview goal.' },
  { step: '02', title: 'Pay instantly', text: 'Secure checkout powered by Razorpay with lightning-fast confirmation.' },
  { step: '03', title: 'Download forever', text: 'Receive email + dashboard access to all purchased PDFs.' },
];

export function Home() {
  return (
    <section className="space-y-16 sm:space-y-20">
      <SEO title="stackflow.dev – Developer Notes" description="Download clean, organized coding notes across languages, frameworks, and interviews." />

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-[0.5em] text-primary font-semibold mb-4"
          >
            curated for busy engineers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-slate-900 dark:text-white"
          >
            Launch-ready tech notes, visualised roadmaps, and premium interview kits.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-5 text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-2xl"
          >
            Skip messy docs. Stackflow.dev curates clean PDFs, templates, and checkout-ready bundles for every stack—from AI & ML to advanced JavaScript.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-primary text-gray-900 font-semibold text-sm sm:text-base shadow-[0_15px_35px_rgba(34,211,238,0.35)]" to="/products">
              Browse notes
            </Link>
            <Link className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full border border-gray-300 text-slate-800 dark:text-gray-100 dark:border-gray-700 text-sm sm:text-base hover:border-primary transition-colors" to="/checkout">
              Go to checkout
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-gray-400">
            <div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">9,400+</p>
              <p>downloads triggered</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">15 min</p>
              <p>average checkout to study</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">23 kits</p>
              <p>curated & constantly updated</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-6 shadow-xl shadow-primary/5">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400 mb-4">trusted formats</p>
          <div className="space-y-4">
            {featureHighlights.map((feature) => (
              <div key={feature.title} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <span className="text-xs font-semibold text-primary">{feature.metric}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1.5">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight categories */}
      <div className="rounded-[32px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-primary font-semibold mb-2">category spotlight</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">The fastest way to find your lane.</h2>
          </div>
          <Link to="/products" className="self-start px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium hover:border-primary transition">
            Explore products →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {spotlightCategories.map((category) => (
            <div
              key={category.label}
              className={`p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gradient-to-br ${category.color} dark:from-white/[0.04] dark:to-white/[0.02]`}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-3">{category.label}</p>
              <p className="text-sm text-slate-700 dark:text-gray-300">{category.blurb}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div className="grid gap-6 lg:grid-cols-3">
        {workflow.map((item) => (
          <div key={item.step} className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 flex flex-col">
            <span className="text-xs uppercase tracking-[0.6em] text-gray-400">{item.step}</span>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 flex-1">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/10 via-cyan-200/20 to-transparent dark:from-primary/20 dark:via-cyan-500/5 dark:to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_25px_80px_rgba(34,211,238,0.18)]">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-gray-300 mb-3">instant access</p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">Download premium notes the moment you pay.</h3>
          <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-gray-300 max-w-2xl">
            Each purchase unlocks lifetime access to a carefully structured PDF bundle. No hidden tiers or freebies—just polished study material priced to match its value.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link to="/products" className="flex-1 px-5 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold text-center">
            Browse catalog
          </Link>
          <Link to="/checkout" className="flex-1 px-5 py-3 rounded-full border border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold text-center">
            Jump to checkout
          </Link>
        </div>
      </div>
    </section>
  );
}


