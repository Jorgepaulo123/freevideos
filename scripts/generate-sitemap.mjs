import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do site
const siteConfig = {
  baseUrl: 'https://freevideos.com',
  sections: [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/#home', priority: '0.9', changefreq: 'weekly' },
    { path: '/#about', priority: '0.7', changefreq: 'monthly' },
    { path: '/#faq', priority: '0.6', changefreq: 'monthly' },
    { path: '/#features', priority: '0.8', changefreq: 'monthly' }
  ]
};

// Função para gerar o sitemap
export function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  siteConfig.sections.forEach(section => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteConfig.baseUrl}${section.path}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${section.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${section.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  // Criar pasta public se não existir
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Escrever o arquivo sitemap
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log('✅ Sitemap gerado com sucesso em:', sitemapPath);
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
} 