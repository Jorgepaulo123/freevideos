# SEO Setup para FreeVideos

Este projeto foi configurado com otimizações de SEO para melhorar a indexação no Google Search.

## Arquivos Criados

### 1. Sitemap XML (`public/sitemap.xml`)
- Mapeia todas as páginas do site
- Inclui prioridades e frequência de atualização
- Gerado automaticamente durante o build

### 2. Robots.txt (`public/robots.txt`)
- Orienta os crawlers do Google
- Inclui referência ao sitemap
- Define regras de crawling

### 3. Meta Tags SEO (`index.html`)
- Meta tags para Google
- Open Graph para redes sociais
- Twitter Cards
- Canonical URL

## Como Usar

### 1. Verificar no Google Search Console
1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione seu domínio
3. Escolha verificação por "HTML tag"
4. Adicione a meta tag no `index.html`:
   ```html
   <meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
   ```

### 2. Enviar Sitemap
1. No Google Search Console, vá em "Sitemaps"
2. Adicione: `https://seudominio.com/sitemap.xml`
3. Clique em "Enviar"

### 3. Monitorar Performance
- Use o Google Search Console para monitorar:
  - Impressões e cliques
  - Posições no ranking
  - Erros de rastreamento
  - Core Web Vitals

## Scripts Disponíveis

```bash
# Gerar sitemap manualmente
npm run generate-sitemap

# Build com SEO otimizado
npm run build:seo

# Build normal (inclui geração de sitemap)
npm run build
```

## Configurações Importantes

### 1. Atualizar URL Base
No arquivo `scripts/generate-sitemap.js`, altere:
```javascript
baseUrl: 'https://seudominio.com'
```

### 2. Adicionar Google Analytics
No `index.html`, adicione:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Configurar Google AdSense
Substitua `YOUR-CLIENT-ID` no `index.html` pelo seu ID real do AdSense.

## Boas Práticas

1. **Conteúdo Regular**: Atualize o conteúdo regularmente
2. **Velocidade**: Mantenha o site rápido (use Lighthouse para testar)
3. **Mobile-First**: O site já é responsivo
4. **Links Internos**: Use as âncoras já implementadas
5. **Meta Descriptions**: Já configuradas no index.html

## Monitoramento

- Google Search Console: Performance e erros
- Google Analytics: Tráfego e comportamento
- PageSpeed Insights: Performance
- Lighthouse: Auditoria completa

## Próximos Passos

1. Configurar Google Analytics
2. Adicionar mais conteúdo relevante
3. Implementar schema markup
4. Criar blog/página de artigos
5. Otimizar para Core Web Vitals 