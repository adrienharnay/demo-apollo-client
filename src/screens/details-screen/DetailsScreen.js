import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import DetailsContainer from './DetailsContainer';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({
    navigation: {
      state: {
        params: { name },
      },
    },
  }) => ({
    title: name,
  });

  render() {
    const {
      navigation: {
        state: {
          params: { id, imageURL, listQuery },
        },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} uri={`https://${imageURL}`} />
          </View>
          <DetailsContainer id={id} imageURL={imageURL} listQuery={listQuery} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});
