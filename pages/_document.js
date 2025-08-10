import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Free QR Code Generator – No signup, no ads, no tracking. Create QR codes for links, text, and contact info instantly." />
        <meta property="og:title" content="QR SaaS – Free QR Code Generator" />
        <meta property="og:description" content="Create QR codes for links, text, and contact info. 100% free, no signup, no ads." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        {/* FAQPage JSON-LD for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is this QR code generator really free?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes! QR SaaS is 100% free, with no signup, no ads, and no tracking." }
            },
            {
              "@type": "Question",
              "name": "Do you store any data?",
              "acceptedAnswer": { "@type": "Answer", "text": "No, all QR codes are generated instantly in your browser. We do not store or track any data." }
            },
            {
              "@type": "Question",
              "name": "Can I use this for commercial purposes?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, QR SaaS is MIT licensed and can be used for personal or commercial projects." }
            }
          ]
        }` }} />
        {/* Plausible Analytics (privacy-friendly) */}
        <script async defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
