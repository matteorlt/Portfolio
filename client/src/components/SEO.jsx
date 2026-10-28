import { useEffect } from 'react';

import { SITE_URL, DEFAULT_IMAGE } from '../seo/routes.js';

/** Crée ou met à jour une balise du <head> (react-helmet n’est pas compatible React 19). */
function upsert(tag, keyAttr, keyValue, attrs) {
  let el = document.head.querySelector(`${tag}[${keyAttr}="${keyValue}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false
}) => {
  useEffect(() => {
    const absImage = image ? new URL(image, SITE_URL).href : DEFAULT_IMAGE;
    const pageUrl = url || `${SITE_URL}${window.location.pathname}`;

    document.title = title;
    upsert('meta', 'name', 'description', { content: description });
    if (keywords) upsert('meta', 'name', 'keywords', { content: keywords });
    upsert('meta', 'name', 'robots', { content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' });

    upsert('meta', 'property', 'og:title', { content: title });
    upsert('meta', 'property', 'og:description', { content: description });
    upsert('meta', 'property', 'og:type', { content: type });
    upsert('meta', 'property', 'og:url', { content: pageUrl });
    upsert('meta', 'property', 'og:image', { content: absImage });

    upsert('meta', 'name', 'twitter:title', { content: title });
    upsert('meta', 'name', 'twitter:description', { content: description });
    upsert('meta', 'name', 'twitter:image', { content: absImage });

    upsert('link', 'rel', 'canonical', { href: pageUrl });
  }, [title, description, keywords, image, url, type, noindex]);

  return null;
};

export default SEO;
