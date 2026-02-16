import { StyleSheet } from 'react-native';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function DossierScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Dossier Médical Partagé</ThemedText>
      <ThemedText style={styles.text}>Consultez vos examens et antécédents ici.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});
