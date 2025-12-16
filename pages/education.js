import Layout from '../components/Layout';
import { getMarkdownContent } from '../lib/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Education({ content }) {
  return (
    <Layout title="Education - Portfolio">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Education</h1>
      <MarkdownRenderer content={content} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { content } = getMarkdownContent('education.md');
  return {
    props: { content },
  };
}
