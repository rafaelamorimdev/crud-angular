const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

// Simulação de armazenamento em memória para os itens
let studentsList = [];

// Rota para obter todos os itens
app.get('/api/students', (req, res) => {
    res.json(studentsList);
});

// Rota para adicionar um novo item
app.post('/api/students', (req, res) => {
    const newItem = req.body;
    studentsList.push(newItem);
    res.status(201).json(newItem);
});

// Rota para obter um item por ID
app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = studentsList.find(item => item.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Rota para atualizar um item existente
app.put('/api/students/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const index = studentsList.findIndex(item => item.id === itemId);
    if (index !== -1) {
        studentsList[index] = { ...studentsList[index], ...updatedItem };
        res.json(studentsList[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Rota para excluir um item existente
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const index = studentsList.findIndex(item => item.id === itemId);
    if (index !== -1) {
        const deletedItem = studentsList.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
