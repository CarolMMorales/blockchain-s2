import hash from "object-hash"; // Asegúrate de que object-hash esté importado
import {proofOfWork} from "./validator.js"; // Importación de funciones específicas
import blockChainModel from "./database/model.js"; // Modelo de la base de datos para guardar bloques
import chalk from "chalk";

class BlockChain {
    constructor() {
        this.chain = []; // Cadena de bloques en memoria
        this.curr_transactions = []; // Transacciones temporales
    }

    // Método para agregar una nueva transacción
    addNewTransaction(sender, recipient, amount) {
        this.curr_transactions.push({ sender, recipient, amount });
    }

    // Método para agregar un nuevo bloque
    addNewBlock(prevHash) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(), // Usar Date.now() para la marca de tiempo
            transactions: this.curr_transactions, // Las transacciones actuales del bloque
            prevHash: prevHash || null, // El hash del bloque anterior
        };

        // Verificar que el bloque es válido usando Proof of Work
        if (proofOfWork() == 1560) { // Suponiendo TARGET_HASH = 1560
            block.hash = hash(block); // Calcular el hash del bloque

            // Guardar el bloque en la base de datos
            const newBlock = new blockChainModel(block);
            newBlock.save((err) => {
                if (err) {
                    console.log(chalk.red("No se puede guardar el bloque en la base de datos", err.message));
                } else {
                    console.log(chalk.green("Bloque guardado en la base de datos"));
                }
            });
        }

        // Agregar el bloque a la cadena
        this.chain.push(block);

        // Limpiar las transacciones para el siguiente bloque
        this.curr_transactions = [];
        return block;
    }

    // Método para obtener el último bloque de la cadena
    lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Método para verificar si la cadena está vacía
    isEmpty() {
        return this.chain.length === 0;
    }
}

export default BlockChain;
