import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const PokemonImage = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    </View>
  );
};

const Grid = ({ pokemonList }) => {
  return (
    <View style={styles.gridContainer}>
      {pokemonList.map((pokemon, index) => (
        <PokemonImage key={index} imageUrl={pokemon.imageUrl} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});

export { PokemonImage, Grid };
