import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { FlatList, StyleSheet, View } from 'react-native';

import CocktailRow from './CocktailRow';

export default class CocktailsList extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.cocktails !== this.props.cocktails) {
      this.list.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  }

  renderItem = ({ item }) => <CocktailRow {...item} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={r => {
            this.list = r;
          }}
          data={this.props.cocktails}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

CocktailsList.propTypes = {
  cocktails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
