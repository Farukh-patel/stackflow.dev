import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO.jsx';

const featureHighlights = [
  {
    title: 'Stack-specific playbooks',
    description: 'From MERN to Spring Boot, every kit focuses on practical builds and interview prompts.',
    metric: '18+ stacks',
    icon: '[STACK]'
  },
  {
    title: 'Actionable checklists',
    description: 'Each PDF includes experiments, shortcuts, and code snippets you can copy into your repo.',
    metric: '120+ snippets',
    icon: '[FLOW]'
  },
  {
    title: 'Interview fast-track',
    description: 'DSA drills, system design briefs, and recruiter-facing recap sheets for instant prep.',
    metric: '45 min avg prep',
    icon: '[PACE]'
  },
];

const spotlightCategories = [
  { label: 'AI & ML', blurb: 'Model tuning, vector DBs, and LLM prompts.', gradient: 'from-purple-500 to-pink-500' },
  { label: 'Python', blurb: 'Automation playbooks + clean script recipes.', gradient: 'from-blue-500 to-cyan-500' },
  { label: 'DSA', blurb: 'Topic-wise patterns, visuals, and mocks.', gradient: 'from-orange-500 to-red-500' },
  { label: 'JavaScript', blurb: 'Frontend + backend patterns, perf notes.', gradient: 'from-yellow-500 to-orange-500' },
];

const workflow = [
  { step: '01', title: 'Pick a track', text: 'Filter notes by stack, difficulty, or interview goal.', icon: '<>' },
  { step: '02', title: 'Fetch your notes', text: 'Preview the coverage and pick what you need before thinking about price.', icon: '[]' },
  { step: '03', title: 'Download forever', text: 'Get email + dashboard access the moment you unlock a kit.', icon: '{}' },
];

export function Home() {
  return (
    <section className="space-y-24 sm:space-y-32">
      <SEO title="stackflow.dev – Developer Notes" description="Download clean, organized coding notes across languages, frameworks, and interviews." />

      {/* Hero - Centered, Full Width */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl blur-3xl" />
        <div className="relative text-center max-w-4xl mx-auto px-4 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wider mb-6"
          >
            CURATED TECH NOTES LIBRARY
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-primary to-accent dark:from-white dark:via-primary dark:to-accent bg-clip-text text-transparent">
              Master Tech Skills
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">With Structured Notes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            High-quality, structured tech notes for JavaScript, MERN Stack, DSA, and more.
            <br />
            <span className="text-primary font-semibold">Structured. Searchable. Effective.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/products"
              className="group relative px-8 py-4 bg-primary text-gray-900 font-bold text-base sm:text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(34,211,238,0.4)]"
            >
              <span className="relative z-10">Browse Notes</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/checkout"
              className="px-8 py-4 border-2 border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-200 font-semibold text-base sm:text-lg rounded-xl hover:border-primary hover:text-primary dark:hover:text-primary transition-all"
            >
              View Cart
            </Link>
          </motion.div>

          {/* Stats - Horizontal Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            {[
              { value: '9,400+', label: 'Downloads' },
              { value: '15 min', label: 'Avg Checkout Time' },
              { value: '23 kits', label: 'Available Notes' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features - Asymmetric Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">stackflow.dev</span>?
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Premium quality content designed for developers who value structured learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureHighlights.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-primary transition-all duration-300 ${
                idx === 1 ? 'md:col-span-1 md:row-span-2' : ''
              }`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white pr-4">{feature.title}</h3>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full shrink-0">
                  {feature.metric}
                </span>
              </div>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories - Diagonal Layout */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              CATEGORY SPOTLIGHT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Find Your Learning Path
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-slate-700 dark:text-gray-200 font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Explore All <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spotlightCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{category.label}</div>
                <p className="text-sm text-slate-600 dark:text-gray-400">{category.blurb}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workflow - Vertical Timeline Style */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400">
            Get started in three simple steps. No complexity, just results.
          </p>
        </motion.div>

        <div className="space-y-8">
          {workflow.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex gap-6 items-start"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-gray-900 shadow-lg">
                  {item.icon}
                </div>
                {idx < workflow.length - 1 && (
                  <div className="w-0.5 h-20 bg-gradient-to-b from-primary to-transparent mt-2" />
                )}
              </div>
              <div className="flex-1 pt-2">
                <div className="text-xs font-semibold text-primary mb-2">{item.step}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-gray-400">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA - Split Screen Style */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 dark:from-primary/10 dark:via-accent/10 dark:to-primary/10 p-8 sm:p-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
              INSTANT ACCESS
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Download Curated Notes
              <br />
              <span className="text-primary">Only When You Need Them</span>
            </h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 mb-6">
              Browse the full library freely, then unlock structured PDF bundles with lifetime access the moment you fetch a kit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl text-center hover:scale-105 transition-transform"
              >
                Browse Catalog
              </Link>
              <Link
                to="/checkout"
                className="px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold rounded-xl text-center hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
              >
                Go to Checkout
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {['CODE', 'BUILD', 'FOCUS', 'SHIP'].map((badge, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-2xl bg-white/10 dark:bg-gray-900/30 border border-primary/20 flex items-center justify-center text-4xl backdrop-blur-sm"
                >
                  <span className="text-sm font-semibold tracking-[0.3em]">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
