import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const GET_COCKTAIL = gql`
  query cocktail($id: ID!) {
    cocktail(id: $id) {
      likes
      glassType
      instructions
      ingredients {
        name
        quantity
      }
    }
  }
`;

const DetailsContainer = ({ id }) => (
  <Query query={GET_COCKTAIL} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading && !Object.keys(data).length) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        );
      }

      if (error) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Error :(</Text>
          </View>
        );
      }

      const {
        cocktail: { likes, glassType, instructions, ingredients },
      } = data;

      const IngredientsList = ingredients.map(({ name, quantity }, index) => (
        <Text key={index}>
          <Text>{'- '}</Text>
          {quantity && <Text style={styles.bold}>{`${quantity} `}</Text>}
          <Text>{name}</Text>
        </Text>
      ));

      return (
        <View style={styles.container}>
          <View style={styles.firstSection}>
            <View>
              <Text>{glassType}</Text>
            </View>
            <View>
              <Text>{`${likes} 💙`}</Text>
            </View>
          </View>
          <View style={styles.secondSection}>
            <Text>{instructions}</Text>
          </View>
          <View style={styles.thirdSection}>{IngredientsList}</View>
        </View>
      );
    }}
  </Query>
);

DetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  secondSection: {
    marginTop: 20,
  },
  thirdSection: {
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DetailsContainer;
