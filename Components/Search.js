import React, { Component } from "react"; // export par défaut
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList
} from "react-native"; // exports nommés

import FilmItem from "./FilmItem";
import films from "../Helpers/filmsData";

// Stylesheet plus performant que juste un objet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  input: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 5,
    height: 50
  },
  button: {
    height: 50
  }
});

class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Titre du film" />
        <Button style={styles.button} title="Recherche" onPress={() => {}} />
        <FlatList
          data={films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
      </View>
    );
  }
}

export default Search;
