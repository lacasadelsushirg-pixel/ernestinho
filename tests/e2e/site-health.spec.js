const { test, expect } = require('@playwright/test');

function problems(page) {
  const out = [];
  page.on('pageerror', e => out.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') out.push('console: ' + m.text()); });
  return out;
}

test('home renders and is not blank', async ({ page }) => {
  const errors = problems(page);
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(response && response.status()).toBeLessThan(400);
  await expect(page.locator('body')).toBeVisible();
  expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(100);
  const box = await page.locator('body').boundingBox();
  expect(box && box.height).toBeGreaterThan(300);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('homepage has no stray ñ route', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hrefs = await page.locator('a[href]').evaluateAll(ns => ns.map(n => n.getAttribute('href') || ''));
  expect(hrefs.filter(h => /(?:^|\/)ñ(?:\/|$|\?)/i.test(h))).toEqual([]);
});

test('homepage internal links respond', async ({ page, request }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const origin = new URL(page.url()).origin;
  const hrefs = await page.locator('a[href]').evaluateAll(ns => [...new Set(ns.map(n => n.href))]);
  const internal = hrefs.filter(h => { try { const u = new URL(h); return u.origin === origin && /^https?:$/.test(u.protocol); } catch { return false; } }).slice(0, 80);
  for (const url of internal) {
    const r = await request.get(url);
    expect(r.status(), url).toBeLessThan(400);
  }
});
