import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth } from '../configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import { createTaches } from '../services/TacheServices';
import type { RootStackParamList } from '../Stack/Appnavigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'addTaches'>;
};

export const addTaches = ({ navigation }: Props) => {
    const [activite, setActivite] = useState('');
    const [description, setDescription] = useState('');
    const [lieu, setLieu] = useState('');
    const [date, setDate] = useState('');

    const enregistrement = async () => {
        if (!activite || !description || !lieu || !date) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        try {
            await createTaches({
                activite,
                description,
                lieu,
                date
            });
            Alert.alert('Succès', 'Tâche créée avec succès');
            // Réinitialiser les champs
            setActivite('');
            setDescription('');
            setLieu('');
            setDate('');
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Impossible de créer la tâche');
        }
    };

    const navigateToAddUsers = () => {
        navigation.navigate('getAllTaches');
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Ajouter une tâche</Text>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    value={activite}
                    onChangeText={setActivite}
                    placeholder="Nom de l'activité"
                    placeholderTextColor="#666"
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={4}
                />

                <TextInput
                    style={styles.input}
                    value={lieu}
                    onChangeText={setLieu}
                    placeholder="Lieu"
                    placeholderTextColor="#666"
                />

                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="Date (JJ/MM/AAAA)"
                    placeholderTextColor="#666"
                />

                <TouchableOpacity onPress={enregistrement} style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToAddUsers} style={styles.button}>
                    <Text style={styles.buttonText}>Afficher les tâches</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
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
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#333',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        color: '#2196F3',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});