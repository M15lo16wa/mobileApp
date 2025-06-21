import { createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Auth } from '../configs/firebaseConfig';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    login: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

interface RegisterProps {
    navigation: RegisterScreenNavigationProp;
}

export default function Register({ navigation }: RegisterProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToLogin = () => {
        navigation.navigate('login');
    }

    const register = () => {
        if (email === '' || password === '') {
            Alert.alert('Veuillez remplir tous les champs');
            return;
        }
        createUserWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                console.log('User registered:', userCredential.user);
                Alert.alert('Inscription réussie');
                navigateToLogin();
            }).catch((error) => {
                console.error('Registration error:', error.message);
                Alert.alert('Inscription échouée', error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#90a4ae"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#90a4ae"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={navigateToLogin}>
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Retour à la connexion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#e0f7fa', // bleu très clair
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#00796b',
        letterSpacing: 2,
    },
    input: {
        width: 300,
        height: 48,
        marginVertical: 10,
        backgroundColor: '#fff',
        color: '#333',
        borderColor: '#00bcd4',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        width: 300,
        height: 48,
        backgroundColor: '#00bcd4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 16,
        marginBottom: 8,
        shadowColor: '#00bcd4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#00bcd4',
    },
    secondaryButtonText: {
        color: '#00bcd4',
    },
});