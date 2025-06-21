import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth } from '../configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import type { RootStackParamList } from '../Stack/Appnavigation';
import { getTaches, deleteTache } from '../services/TacheServices';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'getAllTaches'>;
};

type Tache = {
    id: string;
    activite: string;
    description: string;
    lieu: string;
    date: string;
};

export const getAllTaches = ({ navigation }: Props) => {
    const [taches, setTaches] = useState<Tache[]>([]);

    const fetchTaches = async () => {
        try {
            const data = await getTaches();
            setTaches(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
            Alert.alert('Erreur', 'Impossible de récupérer les tâches');
        }
    };

    useEffect(() => {
        fetchTaches();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteTache(id);
            Alert.alert('Succès', 'Tâche supprimée avec succès');
            // Rafraîchir la liste après la suppression
            fetchTaches();
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Impossible de supprimer la tâche');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(Auth);
            navigation.replace('login');
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
            Alert.alert('Erreur', 'Impossible de se déconnecter');
        }
    };

    const renderTache = ({ item }: { item: Tache }) => (
        <View style={styles.tacheCard}>
            <View style={styles.tacheHeader}>
                <Text style={styles.tacheTitle}>{item.activite}</Text>
                <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                >
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.tacheDescription}>{item.description}</Text>
            <View style={styles.tacheDetails}>
                <Text style={styles.tacheDetail}>📍 {item.lieu}</Text>
                <Text style={styles.tacheDetail}>📅 {item.date}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Liste des tâches</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={taches}
                renderItem={renderTache}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Aucune tâche disponible</Text>
                }
                refreshing={false}
                onRefresh={fetchTaches}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('addTaches')}
            >
                <Text style={styles.addButtonText}>Ajouter une tâche</Text>
            </TouchableOpacity>
            {/* button camera */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Camera')}
            >
                <Text style={styles.addButtonText}>Scan</Text>
            </TouchableOpacity>
            {/* button scan */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('qrCode')}
            ><Text style={styles.addButtonText}>Scan qrCode</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        padding: 8,
    },
    logoutButtonText: {
        color: '#ff4444',
        fontSize: 16,
    },
    list: {
        padding: 16,
    },
    tacheCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tacheHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    tacheTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        color: '#ff4444',
        fontSize: 14,
    },
    tacheDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    tacheDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tacheDetail: {
        fontSize: 14,
        color: '#888',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 32,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


