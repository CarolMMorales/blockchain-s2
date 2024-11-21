import connectDB from './src/database/index.js'; // Conexión a la base de datos
import BlockChain from './src/blockchain.js'; // Importa la clase BlockChain

// Iniciar la conexión con la base de datos y ejecutar la lógica de la cadena de bloques
connectDB()
    .then(() => {
        // Crea una nueva instancia de la cadena de bloques
        let blockChain = new BlockChain();

        // Agregar transacciones a la cadena
        blockChain.addNewTransaction("islem", "alex", 200);
        blockChain.addNewTransaction('Bob', 'Charlie', 50);

        // Si la cadena está vacía, asignamos el bloque genético sin prevHash
        let prevHash = blockChain.isEmpty() ? null : blockChain.lastBlock().hash;

        // Agregar un nuevo bloque a la cadena
        const newBlock = blockChain.addNewBlock(prevHash);

        // Mostrar la cadena de bloques actualizada
        console.log("Cadena de bloques:", blockChain.chain);
    })
    .catch((err) => {
        console.error("Error en la aplicación:", err);
    });
