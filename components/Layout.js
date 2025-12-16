import Sidebar from './Sidebar';
import Head from 'next/head';

export default function Layout({ children, title = 'Portfolio' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personal portfolio website" />
      </Head>
      <div className="flex min-h-screen bg-white dark:bg-gray-950 transition-colors">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 lg:p-12 max-w-4xl mx-auto w-full">
          {children}
        </main>
      </div>
    </>
  );
}