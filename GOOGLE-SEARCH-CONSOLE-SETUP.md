# Configuração do Google Search Console

## Passo a Passo

### 1. Acessar o Google Search Console
1. Vá para: https://search.google.com/search-console
2. Faça login com sua conta Google
3. Clique em "Adicionar propriedade"

### 2. Adicionar seu Site
1. **Prefixo do domínio** (recomendado):
   - Digite: `https://seudominio.com`
   - Exemplo: `https://freevideos.com`

2. **Ou domínio** (se tiver acesso ao DNS):
   - Digite: `seudominio.com`

### 3. Verificar Propriedade

#### Método A - HTML Tag (Mais Fácil)
1. Escolha "HTML tag"
2. Copie a meta tag que aparece:
   ```html
   <meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
   ```
3. Adicione no `index.html` dentro da tag `<head>`
4. Faça deploy do site
5. Clique em "Verificar"

#### Método B - HTML File
1. Escolha "HTML file"
2. Baixe o arquivo fornecido
3. Coloque na pasta `public/`
4. Faça deploy do site
5. Clique em "Verificar"

### 4. Configurar Sitemap
1. No Google Search Console, vá em "Sitemaps"
2. Adicione: `https://seudominio.com/sitemap.xml`
3. Clique em "Enviar"

## Arquivos Preparados

### ✅ Sitemap XML
- Arquivo: `public/sitemap.xml`
- URL: `https://seudominio.com/sitemap.xml`

### ✅ Robots.txt
- Arquivo: `public/robots.txt`
- Inclui referência ao sitemap

### ✅ Meta Tags SEO
- Configuradas no `index.html`
- Inclui Open Graph e Twitter Cards

## Próximos Passos Após Verificação

### 1. Monitorar Performance
- Vá em "Relatórios" > "Performance"
- Monitore impressões e cliques

### 2. Configurar Alertas
- Vá em "Configurações" > "Preferências"
- Configure alertas de email

### 3. Enviar Sitemap
- Vá em "Sitemaps"
- Adicione: `https://seudominio.com/sitemap.xml`

### 4. Verificar Erros
- Vá em "Cobertura"
- Corrija erros de rastreamento

## Troubleshooting

### Se a verificação falhar:
1. Verifique se o site está online
2. Confirme se a meta tag está correta
3. Aguarde alguns minutos e tente novamente
4. Use o método HTML file como alternativa

### Para verificar se está funcionando:
1. No Google Search Console, vá em "Configurações"
2. Verifique se o status é "Verificado"

## URLs Importantes

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **PageSpeed Insights**: https://pagespeed.web.dev

## Meta Tag Exemplo

```html
<!-- Adicione esta linha no index.html -->
<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
```

Substitua `SEU_CODIGO_AQUI` pelo código fornecido pelo Google. 