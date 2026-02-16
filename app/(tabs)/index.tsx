import { StyleSheet, View, FlatList, Dimensions, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';

const { width: screenWidth } = Dimensions.get('window');

const onboardingSlides = [
  {
    key: '1',
    title: 'Bienvenue sur votre carnet de santé',
    text: 'Toutes vos informations de santé, sécurisées et accessibles à tout moment.',
  },
  {
    key: '2',
    title: 'Partagez avec vos médecins',
    text: 'Partagez facilement votre dossier avec les professionnels de santé de votre choix.',
  },
  {
    key: '3',
    title: 'Prenez le contrôle de votre santé',
    text: 'Gérez vos rendez-vous, traitements et bien plus encore.',
  },
];

export default function HomeScreen() {
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const textColor = '#005A9C';
  const placeholderColor = '#6495ED';

  const allData = [...onboardingSlides, { key: 'form' }];

  const renderItem = ({ item }: { item: { key: string, title?: string, text?: string } }) => {
    if (item.key === 'form') {
      return (
        <View style={[styles.slide, { width: screenWidth }]}>
          <View style={styles.formContainer}>
            <ThemedText type="subtitle" style={{ color: textColor }}>
              Connectez-vous
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: placeholderColor,
                },
              ]}
              placeholder="Numéro d'assurance sociale"
              placeholderTextColor={placeholderColor}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: placeholderColor,
                },
              ]}
              placeholder="Mot de passe"
              placeholderTextColor={placeholderColor}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={() => router.push('/register')}>
              <Text style={[styles.buttonText, styles.outlineButtonText]}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.slide, { width: screenWidth }]}>
        <View style={styles.card}>
          <ThemedText type="title" style={{ color: textColor }}>
            {item.title}
          </ThemedText>
          <ThemedText style={[styles.slideText, { color: textColor }]}>{item.text}</ThemedText>
          <FontAwesome5 name="arrow-right" size={24} color={textColor} style={styles.arrowIcon} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blueWaveBackground} />
      <View style={styles.headerContainer}>
        <FontAwesome5 name="heartbeat" size={50} color="red" />
        <ThemedText type="title" style={[styles.appName, { color: textColor }]}>
          Santé Sénégal
        </ThemedText>
      </View>
      <FlatList
        ref={flatListRef}
        data={allData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueWaveBackground: {
    backgroundColor: '#87CEFA',
    height: '45%',
    width: '150%',
    position: 'absolute',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    transform: [{ translateX: -screenWidth * 0.25 }],
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  appName: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  flatList: {
    flex: 2,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  slideText: {
    textAlign: 'center',
    marginTop: 16,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 20,
    right: 25,
  },
  formContainer: {
    width: '90%',
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#005A9C',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#005A9C',
  },
  outlineButtonText: {
    color: '#005A9C',
  },
});
