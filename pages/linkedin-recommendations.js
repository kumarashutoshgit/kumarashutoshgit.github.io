import Layout from '../components/Layout';
import { getMarkdownContent } from '../lib/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function LinkedInRecommendations({ content }) {
  return (
    <Layout title="LinkedIn Recommendations - Portfolio">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">LinkedIn Recommendations</h1>
      <MarkdownRenderer content={content} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { content } = getMarkdownContent('linkedin-recommendations.md');
  return {
    props: { content },
  };
}