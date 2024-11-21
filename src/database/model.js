import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Esquema de Blockchain
const BlockChainSchema = new Schema({
    index: {
        required: true,
        type: Number,
    },
    timestamp: {
        required: true,
        type: Date,
        default: Date.now, // Marca de tiempo por defecto
    },
    transactions: {
        required: true,
        type: [Object], // Array de transacciones (cada transacción es un objeto)
    },
    prevHash: {
        required: false,
        type: String,
    },
    hash: {
        required: true,
        type: String,
    },
});

export default mongoose.model("Blockchain", BlockChainSchema); // Exporta el modelo
