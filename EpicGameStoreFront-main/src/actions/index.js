import axios from "axios";

export const SEND_EMAIL = "SEND_EMAIL";

export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getCartUser(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/cart/${id}`);
      return dispatch({
        type: "GET_CART_USER",
        payload: json.data[0]?.Videogames,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVideogamesByName(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/videogames?name=${payload}`);
      return dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    const json = await axios.get(`/genres`);
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function clear() {
  return async (distpach) => {
    distpach({ type: "CLEAR", payload: [] });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    const json = await axios.get(`/platforms`);
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}

export function getDetail(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/videogames/${payload}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCommentVideoGame(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/reviews/${payload}`);
      return dispatch({
        type: "GET_COMMENT_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const response = await axios.post(`/videogames`, payload);
    return response;
  };
}

export function filterVideogamesByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
  };
}

export function sortByRating(payload) {
  return {
    type: "SORT_BY_RATING",
    payload,
  };
}

export function sortByAlphabet(payload) {
  return {
    type: "SORT_BY_ALPHABET",
    payload,
  };
}

export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload,
  };
}

export function setOrigin(payload) {
  return {
    type: "SET_ORIGIN",
    payload,
  };
}
export function getDataUser(payload) {
  return {
    type: "GETDATAUSER",
    payload,
  };
}

export function sendEmail(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `/send-email/registersuccess`,
        payload
      );
      dispatch({
        type: SEND_EMAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function sendMailPaymentSuccess(Email) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `/send-email/paymentsuccess`,
        Email
      );
      dispatch({
        type: SEND_EMAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function setModalLogin(payload1, payload2) {
  return {
    type: "GET_MODAL_LOGIN",
    payload1: payload1,
    payload2: payload2,
  };
}
export function setModalRegister(payload1, payload2) {
  return {
    type: "GET_MODAL_REGISTER",
    payload1: payload1,
    payload2: payload2,
  };
}


export function getUsersAct(payload) {
    return async function (dispatch) {
      try {
        if (payload === "All") {
          return;
        }
        console.log(payload);
        const response = await axios.get(
          `/admin/users?active=${payload}`
        );
        return dispatch({
          type: "GETUSERSESTATUS",
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

export function setGameFavorite(payload){
  return {
    type: "GET_GAME_FAVORITES",
    payload: payload,
  };
}