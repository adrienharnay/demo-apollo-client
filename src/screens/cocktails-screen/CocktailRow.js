import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CocktailRow = ({ item: { id, name, imageURL } }) => (
  <View key={id} style={styles.row}>
    <Text>{name}</Text>
    <Image style={styles.image} source={{ uri: `https://${imageURL}` }} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CocktailRow;
