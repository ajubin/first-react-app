import React, { Component } from "react"; // export par défaut
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native"; // exports nommés

import FilmItem from "./FilmItem";

import { getFilmsFromApiWithQuery } from "../API/TMDBApi";

// Stylesheet plus performant que juste un objet
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { films: [], isLoading: false };
    this.searchedText = ""; // pas dans le state, car ne nécessite pas un rendu
    this.page = 0;
    this.totalPages = 0;
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => {
        this._loadFilms();
      }
    );
  }

  _loadFilms() {
    console.log("Recherche du film", this.searchedText);
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithQuery(this.searchedText, this.page + 1).then(data => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          films: [...this.state.films, ...data.results], // garder les films récupérés précédemment, equivalent à un concat
          isLoading: false
        });
      });
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _displayDetailForFilm = idFilm => {
    this.props.navigation.navigate("FilmDetailVue", { idFilm: idFilm });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Titre du film"
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={text => this._searchTextInputChanged(text)}
        />
        <Button
          style={styles.button}
          title="Recherche"
          onPress={() => this._searchFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.films.length > 0 && this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

export default Search;
