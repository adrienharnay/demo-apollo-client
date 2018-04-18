import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class CocktailRow extends React.PureComponent {
  handlePress = () => {
    const { onPress, ...params } = this.props;

    this.props.onPress(params);
  };

  render() {
    const { id, name, imageURL } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.handlePress}>
        <View key={id} style={styles.row}>
          <Text>{name}</Text>
          <Image style={styles.image} source={{ uri: `https://${imageURL}` }} />
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
  image: {
    width: 110,
    height: 110,
  },
});
