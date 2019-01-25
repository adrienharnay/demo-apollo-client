import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

export default class CocktailRow extends React.PureComponent {
  handlePress = () => {
    const { id, name, imageURL } = this.props;

    this.props.onPress({ id, name, imageURL });
  };

  render() {
    const { id, name, imageURL } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.handlePress}>
        <View key={id} style={styles.row}>
          <Text style={styles.text}>{name}</Text>
          <Image style={styles.image} uri={`https://${imageURL}`} />
        </View>
      </TouchableOpacity>
    );
  }
}

CocktailRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  text: {
    flex: 1,
  },
  image: {
    width: 110,
    height: 110,
  },
});
