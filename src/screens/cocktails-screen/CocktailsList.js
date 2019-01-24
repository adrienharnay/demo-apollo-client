import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { FlatList, StyleSheet, View } from 'react-native';

import CocktailRow from './CocktailRow';

export default class CocktailsList extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.cocktails !== this.props.cocktails) {
      this.list.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  }

  renderItem = ({ item }) => (
    <CocktailRow {...item} onPress={this.props.onRowPress} />
  );

  render() {
    const { cocktails, refetch } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          ref={r => {
            this.list = r;
          }}
          data={cocktails}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          onRefresh={refetch}
          refreshing={false}
          keyboardDismissMode="on-drag"
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
  onRowPress: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
