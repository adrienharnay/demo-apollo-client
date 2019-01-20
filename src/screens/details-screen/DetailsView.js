import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TOGGLE_LIKE = gql`
  mutation toggleLikeCocktail($id: ID!) {
    toggleLikeCocktail(id: $id) {
      likes
      liked
    }
  }
`;

const DetailsView = ({
  cocktail: { id, likes, glassType, instructions, ingredients, liked },
}) => {
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
          <Mutation mutation={TOGGLE_LIKE}>
            {toggleLike => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleLike({ variables: { id } })}
              >
                <Text>{`${likes} ${liked ? '💜' : '💟'}`}</Text>
              </TouchableOpacity>
            )}
          </Mutation>
        </View>
      </View>
      <View style={styles.secondSection}>
        <Text>{instructions}</Text>
      </View>
      <View style={styles.thirdSection}>{IngredientsList}</View>
    </View>
  );
};

DetailsView.propTypes = {
  cocktail: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    glassType: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.string,
      }),
    ).isRequired,
    liked: PropTypes.bool.isRequired,
    bookmarked: PropTypes.bool.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
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

export default DetailsView;
