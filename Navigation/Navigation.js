import { createStackNavigator, createAppContainer } from "react-navigation";
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";

const SearchStackNavigator = createStackNavigator({
  SearchVue: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher"
    }
  },
  FilmDetailVue: {
    screen: FilmDetail
  }
});

const AppContainer = createAppContainer(SearchStackNavigator);

export default AppContainer;
