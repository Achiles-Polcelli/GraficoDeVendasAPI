import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import VendaMensal from './vendaMensal.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API de vendas está funcionando' });
});


// CREATE
app.post('/vendas', async (req, res) => {
  try {
    const novaVendaMensal = await VendaMensal.create(req.body);
    res.json(novaVendaMensal);
  } catch (error) {
    console.error('Erro inserindo venda:', error);
    res.status(500).json({ error: 'Erro ao inserir venda' });
  }
});

// READ
app.get('/vendas', async (req, res) => {
  try {
    const vendasMensais = await VendaMensal.find();
    res.json(vendasMensais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//UPDATE
app.put('/vendas/:id', async (req, res) => {
  try {
    const novavendasMensais = await VendaMensal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(novavendasMensais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//DELETE
app.delete('/vendas/:id', async (req, res) => {
  try {
    const vendaExcluida = await VendaMensal.findByIdAndDelete(
      req.params.id,
    );
    res.json(vendaExcluida);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.use((req, res) => {
  res.status(404).json({ error: '0Rota no encontrada' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('0Falha ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
