const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
const { networkInterfaces } = require('os');

app.use(cors({origin: "https://schultz-family-tree.netlify.app"})); // Permite qualquer origem. Para restringir, use: cors({ origin: 'URL_DO_SEU_FRONTEND' })
app.use(express.json());
const fs = require('fs');
const path = require('path');

// Função para obter IPs da máquina
function getServerIPs() {
    const nets = networkInterfaces();
    const results = {};
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Pula IPs internos (não IPv4)
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    return results;
}

app.post('/api/receber-formulario', (req, res) => {
    const dados = req.body;
    const agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    
    // Logs de informações do servidor
    console.log('==============================');
    console.log(`[${agora}] Formulário recebido!`);
    console.log('=== INFORMAÇÕES DO SERVIDOR ===');
    console.log(`Hostname: ${os.hostname()}`);
    console.log(`Sistema: ${os.platform()} ${os.release()}`);
    console.log(`Arquitetura: ${os.arch()}`);
    console.log(`IPs da máquina:`);
    const serverIPs = getServerIPs();
    Object.keys(serverIPs).forEach(interface => {
        console.log(`  ${interface}: ${serverIPs[interface].join(', ')}`);
    });
    console.log(`Porta do servidor: 10596`);
    console.log('================================');
    
    if (dados.nome) {
      console.log(`Nome: ${dados.nome}`);
    }
    console.log('Conteúdo completo do formulário:');
    console.log(JSON.stringify(dados, null, 2));
    console.log('==============================\n');

    // --- Salvar JSON em ./persons ---
    const dir = path.join('./freeform/persons');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const nomeBase = dados.nome ? dados.nome.replace(/[^a-zA-Z0-9-_]/g, '_').substring(0, 30) : 'pessoa';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${nomeBase}_${timestamp}.json`;
    const filePath = path.join(dir, fileName);

    fs.writeFile(filePath, JSON.stringify(dados, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar arquivo:', err);
        return res.status(500).json({ erro: 'Erro ao salvar arquivo' });
      }
      console.log(`Arquivo salvo em: ${filePath}`);
      res.json({ ok: true, arquivo: fileName });
    });
});

app.listen(10596, () => {
    console.log('[ Bot ] ouvindo na porta 10596');
    console.log('=== INFORMAÇÕES DO SERVIDOR ===');
    console.log(`Hostname: ${os.hostname()}`);
    console.log(`IPs da máquina:`);
    const serverIPs = getServerIPs();
    Object.keys(serverIPs).forEach(interface => {
        console.log(`  ${interface}: ${serverIPs[interface].join(', ')}`);
    });
    console.log('================================');
}); 