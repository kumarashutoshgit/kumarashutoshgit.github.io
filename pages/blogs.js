import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MEDIUM_USERNAME = '@ashutoshkumarbook';

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      setLoading(true);
      const response = await fetch(`/api/medium?username=${MEDIUM_USERNAME}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setPosts(data.posts || []);
      }
    } catch (err) {
      setError('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Blogs - Portfolio">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">My Blog Posts</h1>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog posts...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-400">{error}</p>
          <p className="text-sm text-red-600 dark:text-red-500 mt-2">
            Make sure to update your Medium username in pages/blogs.js
          </p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">No blog posts found. Update your Medium username to see your articles.</p>
      )}

      <div className="space-y-8">
        {posts.map((post, index) => (
          <article key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </h2>
            {post.pubDate && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {new Date(post.pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
            {post.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {post.description.substring(0, 250)}...
              </p>
            )}
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </Layout>
  );
}