import { SEO } from '../components/SEO.jsx';

export function About() {
  return (
    <section className="prose prose-invert max-w-none">
      <SEO title="About – stackflow.dev" description="Learn about stackflow.dev and how it helps learners." />
      <h2 className="text-xl sm:text-2xl font-semibold">About stackflow.dev</h2>
      <p className="text-sm sm:text-base">
        stackflow.dev provides clear, concise, and production-focused notes for developers across stacks. Whether you are
        preparing for interviews or building your next project, these notes help you move faster with confidence.
      </p>
      <p className="text-sm sm:text-base">
        Each pack includes well-structured PDFs and Notion-ready content, designed with developers in mind.
      </p>
    </section>
  );
}


