import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Qual pokemon você quer encontrar?"
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 55,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    // flex: 1,
    height: 40,
    width: '80%',
    marginLeft: 10,
  },
  buttonSearch:{ 
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SearchBar;
