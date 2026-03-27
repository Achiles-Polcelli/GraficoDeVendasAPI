import mongoose from 'mongoose';

const vendaSchema = new mongoose.Schema({
  data: String,
  valorVendido: Number,
  tipoVenda: String,
  quantidadeVendida: Number,
  produtos: String,
});

export default mongoose.model('VendaMensal', vendaSchema);
