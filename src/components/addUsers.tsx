import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createTaches } from '../services/TacheServices';
import { signOut } from 'firebase/auth';
import { Auth } from '../configs/firebaseConfig';
import type { RootStackParamList } from '../Stack/Appnavigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'addUsers'>;
};

export const addUsers = ({ navigation }: Props) => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        if (!nom || !email) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        try {
            await createTaches({
                nom,
                email
            });
            Alert.alert('Succès', 'Utilisateur ajouté avec succès');
            setNom('');
            setEmail('');
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Impossible d\'ajouter l\'utilisateur');
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Ajouter un utilisateur</Text>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    value={nom}
                    onChangeText={setNom}
                    placeholder="Nom de l'utilisateur"
                    placeholderTextColor="#666"
                />

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Retour</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 8,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#999',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});