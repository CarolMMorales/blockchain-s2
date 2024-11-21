import hash from "object-hash";

const TARGET_HASH = 1560; // Hash objetivo predeterminado

// Función para verificar el proof
export const validProof = (proof, target = TARGET_HASH) => {
    const guessHash = hash(proof);
    console.log("Hashing:", guessHash); // Muestra el hash generado
    return guessHash === hash(target);
};

// Función para encontrar un proof que cumpla con la condición
export const proofOfWork = (target = TARGET_HASH) => {
    let proof = 0;
    while (true) {
        if (!validProof(proof, target)) {
            proof++;
        } else {
            break;
        }
    }
    return hash(proof);
};
