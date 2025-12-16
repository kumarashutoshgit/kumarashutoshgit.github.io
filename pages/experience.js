import Layout from '../components/Layout';
import { getMarkdownContent } from '../lib/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Experience({ content }) {
  return (
    <Layout title="Experience - Portfolio">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Work Experience</h1>
      <MarkdownRenderer content={content} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { content } = getMarkdownContent('experience.md');
  return {
    props: { content },
  };
}
