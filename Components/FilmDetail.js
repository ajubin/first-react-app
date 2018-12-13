import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";

import { connect } from "react-redux";

import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";

import moment from "moment";
import numeral from "numeral";
numeral.zeroFormat("N/A");

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  scrollViewContainer: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
    color: "#000",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  },
  overviewText: {
    fontStyle: "italic",
    color: "#666",
    margin: 5,
    marginBottom: 15
  },
  moreInfoText: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  }
});

class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    };
  }

  componentDidMount() {
    this._loadFilmDetail();
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

  _displayFilmDetail() {
    const film = this.state.film;
    if (!this.state.isLoading) {
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />
          <Text style={styles.titleText}>{film.title}</Text>
          <Text style={styles.overviewText}>{film.overview}</Text>
          <Text style={styles.moreInfoText}>
            Sorti le {moment(new Date(film.release_date)).format("L")}
          </Text>
          <Text style={styles.moreInfoText}>Note : {film.vote_average}</Text>
          <Text style={styles.moreInfoText}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.moreInfoText}>
            Budget : {numeral(film.budget).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.moreInfoText}>
            Revenues : {numeral(film.revenue).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.moreInfoText}>
            Genre(s) : {film.genres.map(g => g.name).join(", ")}
          </Text>
          <Text style={styles.moreInfoText}>
            Companie(s) {film.production_companies.map(g => g.name).join(", ")}
          </Text>
        </ScrollView>
      );
    }
  }

  _loadFilmDetail() {
    getFilmDetailFromApi(this.props.navigation.getParam("idFilm")).then(
      data => {
        this.setState({
          film: data,
          isLoading: false
        });
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._displayFilmDetail()}
        {this._displayLoading()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favoriteFIlms: state.favoritesFilm
  };
};
export default connect(mapStateToProps)(FilmDetail);
