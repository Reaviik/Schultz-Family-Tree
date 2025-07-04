# 🔧 Instruções para Corrigir o Deploy no Netlify

## ❌ Problema Identificado:
Os scripts não estão carregando porque os caminhos das imagens estão incorretos.

## ✅ Soluções:

### 1. **Mover as Imagens**
Copie as imagens da pasta `source/imagens/` para `src/imagens/`:

```bash
# Copie estes arquivos:
source/imagens/Augusto Schultz.jpg → src/imagens/Augusto Schultz.jpg
source/imagens/Marli Bühring.jpg → src/imagens/Marli Bühring.jpg  
source/imagens/David Herbert Schultz.jpg → src/imagens/David Herbert Schultz.jpg
```

### 2. **Estrutura Correta para Netlify:**
```
src/
├── index.html
├── output.css
├── scripts/
│   ├── family-data.js
│   └── tree-generator.js
└── imagens/
    ├── Augusto Schultz.jpg
    ├── Marli Bühring.jpg
    └── David Herbert Schultz.jpg
```

### 3. **Configuração do Netlify:**
- **Publish directory**: `src`
- **Build command**: (deixe vazio)
- **Deploy settings**: (padrão)

### 4. **Verificar Console do Navegador:**
Abra o DevTools (F12) e verifique se há erros 404 nos scripts ou imagens.

## 🚀 Após as Correções:
1. Faça commit das mudanças
2. Push para o GitHub
3. O Netlify fará deploy automático
4. Teste o site

## 📝 Notas:
- Os caminhos das imagens já foram corrigidos no `family-data.js`
- Os scripts estão sendo carregados corretamente no `index.html`
- O problema era apenas os caminhos das imagens 