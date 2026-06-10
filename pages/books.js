import { useState } from 'react';
import Layout from '../components/Layout';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const GOODREADS_USER_ID = '90235083-ashutosh-kumar'; // ← replace with your Goodreads user ID
// ─────────────────────────────────────────────────────────────────────────────

export async function getStaticProps() {
  const shelves = ['read', 'currently-reading', 'to-read'];
  const allBooks = [];

  for (const shelf of shelves) {
    try {
      const res = await fetch(
        `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}`
      );

      if (!res.ok) continue;

      const xml = await res.text();

      // Parse <item> blocks out of the RSS feed
      const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

      for (const [, item] of items) {
        const get = (tag) => {
          const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
          return m ? (m[1] ?? m[2] ?? '').trim() : '';
        };

        const title     = get('title');
        const author    = get('author_name');
        const link      = get('link') || get('guid');
        const imageUrl  = (() => {
          const m = item.match(/src="(https:\/\/i\.gr-assets\.com[^"]+)"/);
          return m ? m[1] : null;
        })();
        const rating    = get('user_rating');
        const dateRead  = get('user_read_at') || get('user_date_added');

        if (title) {
          allBooks.push({ title, author, link, imageUrl, rating, dateRead, shelf });
        }
      }
    } catch {
      // Skip shelves that fail silently during build
    }
  }

  return {
    props: { books: allBooks },
    // Re-build at most once per day (ISR) — remove if using pure `output: export`
    // revalidate: 86400,
  };
}

// ─── SHELF LABELS ─────────────────────────────────────────────────────────────
const SHELF_LABELS = {
  'all':               'All',
  'read':              'Read',
  'currently-reading': 'Reading',
  'to-read':           'Want to read',
};

const SHELF_COLORS = {
  'read':              'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'currently-reading': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'to-read':           'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function Books({ books }) {
  const [viewMode,    setViewMode]    = useState('grid');
  const [filterShelf, setFilterShelf] = useState('all');

  const filteredBooks = books.filter(
    (b) => filterShelf === 'all' || b.shelf === filterShelf
  );

  const counts = books.reduce((acc, b) => {
    acc[b.shelf] = (acc[b.shelf] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout title="Books - Portfolio">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Books
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {books.length} books across all shelves
        </p>
      </div>

      {/* ── Filters + View toggle ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Shelf filter pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(SHELF_LABELS).map(([key, label]) => {
            const count = key === 'all' ? books.length : (counts[key] || 0);
            return (
              <button
                key={key}
                onClick={() => setFilterShelf(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterShelf === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {label}
                <span className={`ml-1.5 text-xs ${filterShelf === key ? 'opacity-80' : 'opacity-60'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid / List toggle */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            title="Grid view"
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="List view"
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Empty state ── */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No books on this shelf yet.</p>
          <p className="text-sm mt-1">Make sure <code className="font-mono">GOODREADS_USER_ID</code> is set and your shelves are public.</p>
        </div>
      )}

      {/* ── Grid view ── */}
      {viewMode === 'grid' && filteredBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book, i) => (
            <a
              key={i}
              href={book.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg dark:hover:shadow-gray-900/60 transition-all hover:-translate-y-0.5"
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded mb-4 shadow-sm"
                />
              )}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {book.author}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SHELF_COLORS[book.shelf]}`}>
                  {SHELF_LABELS[book.shelf]}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* ── List view ── */}
      {viewMode === 'list' && filteredBooks.length > 0 && (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredBooks.map((book, i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded shadow-sm flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{book.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block ${SHELF_COLORS[book.shelf]}`}>
                      {SHELF_LABELS[book.shelf]}
                    </span>
                    {book.rating && book.rating !== '0' && (
                      <span className="text-xs text-amber-500 hidden sm:inline-block">
                        {'★'.repeat(Number(book.rating))}
                      </span>
                    )}
                    {book.link && (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}