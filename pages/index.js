import Layout from '../components/Layout';
import { getMarkdownContent } from '../lib/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Home({ content }) {
  return (
    <Layout title="About - Portfolio">
      <MarkdownRenderer content={content} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { content } = getMarkdownContent('about.md');
  return {
    props: { content },
  };
}