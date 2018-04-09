import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const GET_COCKTAILS = gql`
  query {
    cocktails {
      id
      name
      imageURL
    }
  }
`;

const CocktailsList = () => (
  <Query query={GET_COCKTAILS}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
      }

      if (error) {
        return (
          <View>
            <Text>Error :(</Text>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <FlatList
            data={data.cocktails}
            keyExtractor={item => item.id}
            renderItem={({ item: { id, name, imageURL } }) => (
              <View key={id} style={styles.row}>
                <Text>{name}</Text>
                <Image
                  style={styles.image}
                  source={{ uri: `https://${imageURL}` }}
                />
              </View>
            )}
          />
        </View>
      );
    }}
  </Query>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CocktailsList;
