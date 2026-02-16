import { ThemedText } from '@/components/ThemedText';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [consentDMP, setConsentDMP] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const textColor = '#005A9C';
  const placeholderColor = '#6495ED';

  const handleRegister = () => {
    const { firstName, lastName, idNumber, email, password, confirmPassword } = formData;

    // Vérification des champs textuels
    if (!firstName || !lastName || !idNumber || !email || !password || !confirmPassword) {
      Alert.alert('Champs manquants', 'Merci de remplir toutes les informations personnelles.');
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      Alert.alert('Mot de passe', 'Les mots de passe ne sont pas identiques.');
      return;
    }

    // Vérification des consentements légaux
    if (!consentDMP || !acceptTerms) {
      Alert.alert(
        'Action requise',
        'Veuillez accepter les conditions et consentir à la création du DMP pour continuer.'
      );
      return;
    }

    // Si tout est OK
    Alert.alert('Félicitations', 'Votre compte DMP a été créé avec succès.');
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={20} color={textColor} />
          </TouchableOpacity>
          <ThemedText type="title" style={{ color: textColor }}>Inscription DMP</ThemedText>
        </View>

        <View style={styles.form}>
          <ThemedText style={styles.sectionTitle}>Informations Personnelles</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Prénom"
            placeholderTextColor={placeholderColor}
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor={placeholderColor}
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Numéro d'Identification Nationale (NIN)"
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            value={formData.idNumber}
            onChangeText={(text) => setFormData({ ...formData, idNumber: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <ThemedText style={styles.sectionTitle}>Sécurité</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor={placeholderColor}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={placeholderColor}
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          />

          <View style={styles.legalSection}>
            <ThemedText type="subtitle" style={styles.legalHeader}>Engagement Légal & Consentement</ThemedText>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                Je consens explicitement à la création de mon Dossier Médical Partagé (DMP).
              </Text>
              <Switch
                value={consentDMP}
                onValueChange={setConsentDMP}
                trackColor={{ false: '#767577', true: textColor }}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                J'accepte les Conditions Générales d'Utilisation.
              </Text>
              <Switch
                value={acceptTerms}
                onValueChange={setAcceptTerms}
                trackColor={{ false: '#767577', true: textColor }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegister}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>je m'inscris</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  form: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#005A9C',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#6495ED',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#005A9C',
  },
  legalSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f7ff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d0e3ff',
  },
  legalHeader: {
    fontSize: 16,
    marginBottom: 15,
    color: '#005A9C',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#005A9C',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
