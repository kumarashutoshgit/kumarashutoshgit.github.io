import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content }) {
  return (
    <article className="prose prose-lg prose-gray max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}