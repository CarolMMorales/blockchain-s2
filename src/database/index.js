import mongoose from "mongoose";
import chalk from "chalk";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/blockchainDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(chalk.green("Conectado a MongoDB exitosamente"));
    } catch (error) {
        console.error(chalk.red("Error conectando a MongoDB:", error.message));
        throw error;
    }
}

export default connectDB;
