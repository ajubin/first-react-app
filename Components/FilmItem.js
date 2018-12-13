import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    height: 190
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  contentContainer: {
    flex: 1,
    margin: 5
  },
  headerContainer: {
    flex: 3,
    flexDirection: "row"
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 5
  },
  voteText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666"
  },
  descriptionContainer: {
    flex: 7
  },
  descriptionText: {
    fontStyle: "italic",
    color: "#666"
  },
  dateContainer: {
    flex: 1
  },
  dateText: {
    textAlign: "right",
    fontSize: 14
  },
  favoriteImage: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});

class FilmItem extends Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      const sourceImage = require("../assets/ic_favorite.png");
      return <Image style={styles.favoriteImage} source={sourceImage} />;
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props;
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => displayDetailForFilm(film.id)}
      >
        <Image
          style={styles.image}
          source={{ uri: getImageFromApi(film.poster_path) }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            {this._displayFavoriteImage()}
            <Text style={styles.titleText}>{film.title}</Text>
            <Text style={styles.voteText}>{film.vote_average}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FilmItem;
