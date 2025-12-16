import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GOODREADS_USER_ID = '90235083-ashutosh-kumar';

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      const response = await fetch(`/api/goodreads?userId=${GOODREADS_USER_ID}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setBooks(data.books || []);
      }
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Books - Portfolio">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Books I've Read</h1>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading books...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-400">{error}</p>
          <p className="text-sm text-red-600 dark:text-red-500 mt-2">
            Make sure to update your Goodreads User ID in pages/books.js
          </p>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">No books found. Update your Goodreads User ID to see your reading list.</p>
      )}

      <div className="grid gap-6">
        {books.map((book, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{book.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
            {book.link && (
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              >
                View on Goodreads →
              </a>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}