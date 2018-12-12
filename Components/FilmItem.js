import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    height: 190
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray"
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
  }
});

class FilmItem extends Component {
  render() {
    const film = this.props.film;
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={{ uri: "image" }} />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
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
      </View>
    );
  }
}

export default FilmItem;
