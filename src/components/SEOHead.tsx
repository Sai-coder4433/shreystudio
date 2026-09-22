import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  articleMeta?: {
    publishDate?: string;
    author?: string;
    category?: string;
  };
  breadcrumbs?: { name: string; path: string }[];
  faqs?: { q: string; a: string }[];
  serviceSchema?: {
    name: string;
    description: string;
    category: string;
  };
}

const BASE_URL = 'https://shreystudio.com';
const OFFICIAL_LOGO = 'https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png';
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_HERO_IMAGE,
  ogImageAlt = 'Professional Photography and Cinematography Studio - Shrey Studio',
  articleMeta,
  breadcrumbs,
  faqs,
  serviceSchema,
}) => {
  const fullCanonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to set or update meta tag
    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // Helper to set or update link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Primary Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('name', 'author', 'Shreyash Gore, Shrey Studio');
    setMeta('name', 'geo.region', 'IN-MH');
    setMeta('name', 'geo.placename', 'Chakan, Pune');
    setMeta('name', 'geo.position', '18.7598;73.8587');
    setMeta('name', 'ICBM', '18.7598, 73.8587');

    // Canonical link
    setLink('canonical', fullCanonicalUrl);

    // Open Graph
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', fullCanonicalUrl);
    setMeta('property', 'og:site_name', 'Shrey Studio');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:alt', ogImageAlt);

    // Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@shreystudio');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 2. Build Structured Data Graph
    const schemaGraph: any[] = [
      // Verified LocalBusiness / PhotographyBusiness Schema
      {
        '@type': 'PhotographyBusiness',
        '@id': `${BASE_URL}/#organization`,
        name: 'Shrey Studio',
        legalName: 'Shrey Studio Photography & Cinematography',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: OFFICIAL_LOGO,
          caption: 'Professional Photography and Cinematography Studio Logo',
        },
        image: ogImage,
        description: 'Professional photography and cinematography studio based in Chakan, Pune. Specializing in luxury weddings, candid pre-weddings, portraits, commercial films, and destination shoots across Maharashtra, India, Vietnam, Singapore, and Malaysia.',
        founder: {
          '@type': 'Person',
          name: 'Shreyash Gore',
          jobTitle: 'Founder & Chief Photographer',
        },
        telephone: '+917517443240',
        email: 'studio@shreystudio.com',
        priceRange: '₹₹₹',
        currenciesAccepted: 'INR, USD, EUR, SGD',
        paymentAccepted: 'Cash, UPI, Credit Card, Bank Transfer',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chakan Market Road',
          addressLocality: 'Chakan, Pune',
          addressRegion: 'Maharashtra',
          postalCode: '410501',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 18.7598,
          longitude: 73.8587,
        },
        areaServed: [
          { '@type': 'City', name: 'Chakan' },
          { '@type': 'City', name: 'Pune' },
          { '@type': 'City', name: 'Moshi' },
          { '@type': 'City', name: 'Khed' },
          { '@type': 'City', name: 'Pimpri-Chinchwad' },
          { '@type': 'State', name: 'Maharashtra' },
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'Vietnam' },
          { '@type': 'Country', name: 'Singapore' },
          { '@type': 'Country', name: 'Malaysia' },
        ],
      },
      // WebSite Schema with SearchAction
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Shrey Studio',
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
    ];

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.path.startsWith('http') ? crumb.path : `${BASE_URL}${crumb.path}`,
        })),
      });
    }

    // Service Schema
    if (serviceSchema) {
      schemaGraph.push({
        '@type': 'Service',
        name: serviceSchema.name,
        serviceType: serviceSchema.category,
        description: serviceSchema.description,
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: {
          '@type': 'State',
          name: 'Maharashtra',
        },
      });
    }

    // Article Schema
    if (ogType === 'article' && articleMeta) {
      schemaGraph.push({
        '@type': 'Article',
        headline: title,
        description: description,
        image: ogImage,
        datePublished: articleMeta.publishDate || '2025-01-01',
        author: {
          '@type': 'Person',
          name: articleMeta.author || 'Shreyash Gore',
        },
        publisher: { '@id': `${BASE_URL}/#organization` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullCanonicalUrl,
        },
      });
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      });
    }

    // Inject Script Element
    let scriptEl = document.getElementById('dynamic-structured-data');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-structured-data';
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    });
  }, [
    title,
    description,
    fullCanonicalUrl,
    ogType,
    ogImage,
    ogImageAlt,
    articleMeta,
    breadcrumbs,
    faqs,
    serviceSchema,
  ]);

  return null;
};
