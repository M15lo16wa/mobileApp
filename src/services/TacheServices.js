import axios from "axios";

// URL de l'API selon l'environnement
const API_URL =  "http://192.168.1.43:8000";  // Développement

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Fonction pour créer une tâche
export const createTaches = async (taches) => {
    try {
        const response = await api.post("/taches/", taches);
        return response.data;
    } catch (error) {
        console.error('Erreur:', error.response?.data || error.message);

        throw new Error(error.response?.data?.message || "Erreur lors de la création de la tâche");
    }
}

// Fonction pour récupérer toutes les tâches
export const getTaches = async () => {
    try {
        const response = await api.get("/taches/");
        return response.data;
    } catch (error) {
        console.error('Détails de l\'erreur:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw new Error(
            error.response?.data?.message || 
            `Erreur lors de la récupération des tâches: ${error.message}`
        );
    }
}

// Fonction pour récupérer une tâche spécifique
export const getTache = async (id) => {
    try {
        const response = await api.get(`/taches/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération de la tâche");
    }
}

// Fonction pour modifier une tâche
// export const updateTache = async (id, tache) => {
//     try {
//         const response = await api.put(`/taches/${id}`, tache);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || "Erreur lors de la modification de la tâche");
//     }
// }

// Fonction pour supprimer une tâche
export const deleteTache = async (id) => {
    try {
        const response = await api.delete(`/taches/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur lors de la suppression de la tâche");
    }
}