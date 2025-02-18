
// screens/ProductDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
export function ProductDetailsScreen({ route }) {
  const { productId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dettagli Prodotto {productId}</Text>
      <Text style={styles.description}>
        Questo è un esempio di pagina dettaglio prodotto.
        Qui puoi aggiungere tutte le informazioni relative al prodotto selezionato.
      </Text>
    </View>
  );
}

export default ProductDetailsScreen;