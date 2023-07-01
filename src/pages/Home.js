import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, PanResponder,  Platform } from 'react-native';
import axios from 'axios';
import SearchBar from '../components/searchBar/SearchBar';
import { Grid } from '../components/pokemons/Pokemons';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollOffsetValue = useRef(new Animated.Value(0)).current;
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=203');
        const results = response.data.results;

        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const speciesResponse = await axios.get(pokemon.url);
            const imageUrl = speciesResponse.data.sprites.other['official-artwork'].front_default;

            return {
              name: pokemon.name,
              imageUrl,
            };
          })
        );

        setPokemonList(pokemonData);
        setFilteredPokemonList(pokemonData);
      } catch (error) {
        console.log('Error fetching Pokémon data:', error);
      }
    };
    fetchPokemonList();
  }, []);
  
  const handleScroll = ({ nativeEvent }) => {
    setScrollOffset(nativeEvent.contentOffset.y);
  };

  const handleSearch = (text) => {
    if (text) {
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPokemonList(filteredList);
    } else {
      setFilteredPokemonList(pokemonList);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 10,
      onPanResponderMove: (_, { dy }) => {
        scrollOffsetValue.setValue(dy);
      },
      onPanResponderRelease: () => {
        Animated.spring(scrollOffsetValue, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...panResponder.panHandlers}
      >
        <Animated.View style={{ marginTop: Platform.OS === 'android' ? scrollOffsetValue._value : 0 }}>
          <View style={styles.pokemonList}>
            <Grid pokemonList={filteredPokemonList} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  pokemonList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
