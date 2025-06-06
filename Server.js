const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// =================================================================
// ROTA DE DEBUG - Adicione esta rota para inspecionar o script.js
app.get('/debug/script', (req, res) => {
    console.log('Rota de depuração /debug/script foi chamada.');
    const scriptPath = path.join(__dirname, 'src', 'View', 'script.js');
    fs.readFile(scriptPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o script.js para depuração:', err);
            return res.status(500).send('Erro ao ler o script.js para depuração.');
        }
        // Envia o conteúdo do script como texto puro, para que possamos vê-lo
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.send(data);
    });
});
// =================================================================


app.use(express.static(path.join(__dirname, 'src', 'View')));

app.get('/api/locadora', (req, res) => {
    const dataPath = path.join(__dirname, 'locadora.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro interno ao buscar os dados.' });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'View', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da aplicação rodando em http://localhost:${PORT}`);
});