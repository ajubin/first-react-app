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
import { getFilmsFromApiWithQuery } from "../API/TMDBApi";

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
  constructor(props) {
    super(props);
    this.state = { films: [] };
    this.searchedText = ""; // pas dans le state, car ne nécessite pas un rendu
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _loadFilms() {
    console.log("Recherche du film", this.searchedText);
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithQuery(this.searchedText).then(data => {
        this.setState({ films: data.results });
      });
    }
  }

  render() {
    console.log("RENDERING");
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Titre du film"
          onChangeText={text => this._searchTextInputChanged(text)}
        />
        <Button
          style={styles.button}
          title="Recherche"
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
      </View>
    );
  }
}

export default Search;
