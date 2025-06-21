import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Auth } from '../configs/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Stack/Appnavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

export default function Login({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToRegister = () => {
        navigation.navigate('register');
    }

    const login = () => {
        if (email === '' || password === '') {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }
        signInWithEmailAndPassword(Auth, email, password)
            .then(() => {
                navigation.replace('addTaches');
            }).catch((error) => {
                console.error('Erreur de connexion:', error.message);
                Alert.alert('Erreur', 'Identifiants incorrects');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={navigateToRegister}>
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Créer un compte</Text>
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
        backgroundColor: '#e0f7fa',
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