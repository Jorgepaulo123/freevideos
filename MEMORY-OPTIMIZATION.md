# Otimização de Memória - FreeVideos

## Problema Resolvido

O erro "Fatal process out of memory" foi causado por:
- Node.js usando muita memória
- Dependências pesadas
- Configuração não otimizada

## Soluções Implementadas

### 1. Aumento da Memória Heap
```json
"dev": "node --max-old-space-size=4096 ./node_modules/.bin/vite"
```
- Aumentou limite de memória para 4GB
- Permite mais espaço para o Vite

### 2. Otimização do Vite
```typescript
build: {
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        ui: ['lucide-react']
      }
    }
  }
}
```

### 3. Instalação Otimizada
```bash
npm install --omit=optional
```
- Remove dependências opcionais
- Reduz tamanho do node_modules

## Comandos Otimizados

### Desenvolvimento
```bash
npm run dev
```
- Usa 4GB de memória
- HMR otimizado

### Build
```bash
npm run build
```
- Gera sitemap automaticamente
- Build otimizado

### Sitemap
```bash
npm run generate-sitemap
```
- Usa 2GB de memória
- Geração rápida

## Monitoramento

### Verificar Uso de Memória
```bash
# Windows
tasklist | findstr node

# Linux/Mac
ps aux | grep node
```

### Limpar Cache
```bash
npm cache clean --force
```

### Reinstalar Dependências
```bash
rm -rf node_modules
npm install --omit=optional
```

## Configurações do Sistema

### Windows
- Aumentar memória virtual
- Fechar aplicações desnecessárias
- Usar SSD se possível

### Linux/Mac
```bash
# Aumentar swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## Próximos Passos

1. ✅ **Configuração otimizada** implementada
2. ✅ **Scripts com mais memória** configurados
3. ✅ **Dependências otimizadas** instaladas
4. 🔄 **Testar servidor** de desenvolvimento
5. 🔄 **Monitorar performance**

## Troubleshooting

### Se ainda der erro de memória:
1. Feche outros programas
2. Reinicie o terminal
3. Use: `node --max-old-space-size=8192`
4. Considere usar Yarn ou pnpm

### Para produção:
1. Use `npm run build` otimizado
2. Configure CDN para assets
3. Implemente lazy loading
4. Use compressão gzip/brotli 