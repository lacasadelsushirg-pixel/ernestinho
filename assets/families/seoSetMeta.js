function seoSetMeta(meta) {
    const { title, description, path, indexable = true, image } = meta || {};
    const site = 'https://www.ernestinhocarioca.com.br';
    const canonicalUrl = site + (path || '/');
    document.title = title || 'Ernestinho Carioca | Guía completa de Río de Janeiro';
    const setMeta = (selector, attr, value) => {
        var _a, _b;
        let el = document.head.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            if (selector.includes('property='))
                el.setAttribute('property', ((_a = selector.match(/property="([^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1]) || '');
            else
                el.setAttribute('name', ((_b = selector.match(/name="([^"]+)"/)) === null || _b === void 0 ? void 0 : _b[1]) || '');
            document.head.appendChild(el);
        }
        el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', description || 'Descubre Río de Janeiro con Ernestinho Carioca: lugares, experiencias, consejos y rutas para organizar tu viaje.');
    setMeta('meta[name="robots"]', 'content', indexable ? 'index, follow' : 'noindex, follow');
    setMeta('meta[property="og:title"]', 'content', document.title);
    setMeta('meta[property="og:description"]', 'content', description || 'Guía práctica de Río de Janeiro por Ernestinho Carioca.');
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', path && path !== '/' ? 'article' : 'website');
    setMeta('meta[name="twitter:card"]', 'content', image ? 'summary_large_image' : 'summary');
    setMeta('meta[name="twitter:title"]', 'content', document.title);
    setMeta('meta[name="twitter:description"]', 'content', description || 'Guía práctica de Río de Janeiro por Ernestinho Carioca.');
    const oldOgImage = document.head.querySelector('meta[property="og:image"]');
    const oldTwImage = document.head.querySelector('meta[name="twitter:image"]');
    if (image) {
        setMeta('meta[property="og:image"]', 'content', image);
        setMeta('meta[name="twitter:image"]', 'content', image);
    } else {
        if (oldOgImage) oldOgImage.remove();
        if (oldTwImage) oldTwImage.remove();
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    seoSetSchema(meta, path);
}
window.seoSetMeta=seoSetMeta;
