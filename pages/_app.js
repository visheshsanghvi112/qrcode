import '../styles/globals.css';
import '../styles/animations.css';
import Layout from '../components/Layout';

// Keyboard shortcuts: Ctrl+1 (URL), Ctrl+2 (Text), Ctrl+3 (Contact)
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === '1') document.querySelector('[data-tab="url"]')?.click();
      if (e.ctrlKey && e.key === '2') document.querySelector('[data-tab="text"]')?.click();
      if (e.ctrlKey && e.key === '3') document.querySelector('[data-tab="contact"]')?.click();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
