import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class CocktailRow extends React.PureComponent {
  render() {
    const { id, name, imageURL } = this.props;

    return (
      <View key={id} style={styles.row}>
        <Text>{name}</Text>
        <Image style={styles.image} source={{ uri: `https://${imageURL}` }} />
      </View>
    );
  }
}

CocktailRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  image: {
    width: 110,
    height: 110,
  },
});
