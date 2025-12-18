// ============================================
// FILE: components/Sidebar.js
// REPLACE YOUR EXISTING Sidebar.js WITH THIS
// MINIMAL SIDEBAR WITH COLLAPSIBLE SECTIONS
// ============================================

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Main navigation sections
const sections = [
  { name: 'About', href: '/' },
  { name: 'Education', href: '/education' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'LinkedIn', href: '/linkedin-recommendations' },
  { name: 'Books', href: '/books' },
  { name: 'Contact', href: '/contact' },
];

// Reading & Writing links
const readingWritingLinks = [
  {
    name: 'Goodreads',
    url: 'https://www.goodreads.com/user/show/90235083-ashutosh-kumar',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@ashutoshkumarbook',
  },
  {
    name: 'Dev.to',
    url: 'https://dev.to/ashutosh_kumar_1',
  },
];

// Documents for download
const documentLinks = [
  {
    name: 'Resume',
    url: '/resume.pdf',
    download: 'Ashutosh_Kumar_Resume.pdf',
    icon: '📄'
  },
  {
    name: 'Curriculum Vitae',
    url: '/cv.pdf',
    download: 'Ashutosh_Kumar_CV.pdf',
    icon: '📋'
  },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Dropdown states
  const [profileOpen, setProfileOpen] = useState(true); // Open by default
  const [readingOpen, setReadingOpen] = useState(false);
  const [documentsOpen, setDocumentsOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          p-6 flex flex-col z-40 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          shadow-lg
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ashutosh Kumar</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Research Scholar @ NIT Jamshedpur</p>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 space-y-2">
          
          {/* Section 1: Profile - Collapsible */}
          <div>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <span>👤</span>
                <span>Profile</span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {profileOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                {sections.map(({ name, href }) => (
                  <Link key={name} href={href}>
                    <span
                      className={`
                        block py-2 px-3 rounded-lg text-sm cursor-pointer transition-all
                        ${router.pathname === href
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Reading & Writing - Collapsible */}
          <div>
            <button
              onClick={() => setReadingOpen(!readingOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <span>📖</span>
                <span>Reading & Writing</span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${readingOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {readingOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                {readingWritingLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Documents - Collapsible */}
          <div>
            <button
              onClick={() => setDocumentsOpen(!documentsOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <span>📁</span>
                <span>Documents</span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${documentsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {documentsOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                {documentLinks.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    download={doc.download}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{doc.icon}</span>
                      <span>{doc.name}</span>
                    </span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            <div className="flex items-center space-x-2">
              <span>{darkMode ? '🌙' : '☀️'}</span>
              <span className="font-medium">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div className="relative">
              <div className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </button>
        </div>

        {/* Social Links */}
        <div className="pt-4 mt-2">
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/kumarashutoshgit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/ashutoshkumarlink" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="mailto:mailtoashutoshkumars@gmail.com" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Email"
              title="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}