import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO.jsx';

export function Home() {
  return (
    <section className="py-8 sm:py-16">
      <SEO title="stackflow.dev – Developer Notes" description="Download clean, organized coding notes across languages, frameworks, and interviews." />
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight px-2"
        >
          Clean, organized coding notes for every developer.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4"
        >
          Download developer-friendly notes, cheat sheets, and interview packs for multiple stacks.
        </motion.p>
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 px-4">
          <Link className="px-4 sm:px-6 py-2 sm:py-3 rounded-md bg-primary text-gray-900 font-medium text-sm sm:text-base" to="/products">View Notes</Link>
          <Link className="px-4 sm:px-6 py-2 sm:py-3 rounded-md border border-primary text-primary text-sm sm:text-base" to="/checkout">Buy Now</Link>
        </div>
      </div>
    </section>
  );
}


