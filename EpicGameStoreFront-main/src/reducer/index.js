import { filterByOrigin } from "./filterByOrigin.js";

const initialState = {
  modalLogin: false,
  modalRegister: false,
  usersFiltra : [],
  cartUser: [],
  commentVideoGame: [],
  videogames: [],
  dataUser: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  detail: [],
  gameFavorites: [],
  currentPage: 1,
  origin: "all"
};
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload // Update the allVideogames property with the initial videogames array
      };
      case "GET_CART_USER":
        return {
          ...state,
          cartUser: action.payload,
        };

    case "GET_VIDEOGAMES_NAME":
      return{
        ...state,
        videogames: action.payload
      };
      case "GET_COMMENT_DETAIL":
      return{
        ...state,
        commentVideoGame: action.payload
      };

      case "GET_MODAL_LOGIN":
      return{
        ...state,
        modalLogin: action.payload1,
        modalRegister: action.payload2
      };
      case "GET_MODAL_REGISTER":
      return{
        ...state,
        modalRegister: action.payload1,
        modalLogin: action.payload2
      };

    case "POST_VIDEOGAME":
      return{
        ...state
      }

    case "SET_ORIGIN":
      return{
        ...state,
        origin : action.payload
      }
    
    case "GET_GENRES":
      return{
        ...state,
        genres: action.payload
      };

    case "GET_PLATFORMS":
      return{
        ...state,
        platforms: action.payload
      };

    case "GET_DETAIL":
      return{
        ...state,
        detail: action.payload
      };
  
    case "FILTER_BY_ORIGIN":
      const origin = action.payload;
      const allVideogames = state.allVideogames; // Access the original array of all videogames
      const filteredVideogames = filterByOrigin(allVideogames, origin);
      return {
        ...state,
        videogames: origin === "all" ? allVideogames : filteredVideogames
      };
  
    case "SORT_BY_RATING":
      const ratingOrder = action.payload;
      const sortedByRating = [...state.videogames]; // Create a copy of the videogames array
  
      sortedByRating.sort((a, b) => {
        if (ratingOrder === "lToH") {
          return a.rating - b.rating; // Sort in ascending order (lowest to highest)
        } else if (ratingOrder === "hToL") {
          return b.rating - a.rating; // Sort in descending order (highest to lowest)
        } else {
          return 0; // No sorting required
        }
      });
  
      return {
        ...state,
        videogames: sortedByRating
      };

    case "SET_CURRENT_PAGE": 
      return{
        ...state,
        currentPage: action.payload
      }
  
    case "SORT_BY_ALPHABET":
      const alphabetOrder = action.payload;
      const sortedByAlphabet = [...state.videogames]; // Create a copy of the videogames array
  
      sortedByAlphabet.sort((a, b) => {
        if (alphabetOrder === "aToZ") {
          return a.name.localeCompare(b.name); // Sort in ascending order (A to Z)
        } else if (alphabetOrder === "zToA") {
          return b.name.localeCompare(a.name); // Sort in descending order (Z to A)
        } else {
          return 0; // No sorting required
        }
      });

      case "GETDATAUSER": 
      return{
        ...state,
        dataUser: action.payload
      }

      case "CLEAR":
      return {
        ...state,
        detail: action.payload,
      };
      case "GETUSERSESTATUS":
        return{
          ...state,
          usersFiltra: action.payload
        }
      case "SEND_EMAIL":
      return {
        ...state,
      };

      case "GET_GAME_FAVORITES":
        return{
          ...state,
          gameFavorites : action.payload
        }
    default:
      return state;
  };
};
  
export default reducer;