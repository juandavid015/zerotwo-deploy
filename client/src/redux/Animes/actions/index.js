import * as types from "../types";
import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';
export const getAllAnimes = ()=> {
  return (dispatch) =>
    axios
      .get(`${API_ENDPOINT}/animes?page=1`)
      .then((response) => {
        dispatch({
          type: types.GET_ALL_ANIMES,
          payload: response.data,
        });
      })
      .catch((error) => {
        return { error: { message: "Not found" } };
      });
}
export const getAnimes = () => {
  return (dispatch) =>
    axios
      .get(`${API_ENDPOINT}/animes`)
      .then((response) => {
        dispatch({
          type: types.GET_ANIMES,
          payload: response.data,
        });
      })
      .catch((error) => {
        return { error: { message: "Not found" } };
      });
};

export function searchAnimeName(name) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        `${API_ENDPOINT}/animes?name=${name}`
      );
      return dispatch({ type: types.SEARCH_ANIMES, payload: response.data });
    } catch {
      return { error: { message: "Not found" } };
    }
  };
}

export const getAnimeById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/animes/${id}`);
      dispatch({ type: types.GET_ANIME_BY_ID, payload: response.data });
    } catch (err) {
      return {
        error: {
          message: `The anime with id ${id} doesn't exist. Try with another one`,
        },
      };
    }
  };
};

export const getAnimeEpisodes = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/episodes/${id}`);
      dispatch({ type: types.GET_ANIME_EPISODES, payload: response.data });
    } catch (err) {
      return { error: { message: `Not available episodes for anime ${id}` } };
    }
  };
};

export const filterAndSortAnimes = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/animes?${query}`);
      dispatch({ type: types.FILTER_AND_SORT_ANIMES, payload: response.data });
    } catch (err) {
      return { error: { message: `Not found` } };
    }
  };
};

export const getAnimeGenres = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/genres`);
      dispatch({ type: types.GET_ANIME_GENRES, payload: response.data });
    } catch (err) {
      return { error: { message: `Not found` } };
    }
  };
};

export const getAnimeNewest = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/animes/newest`);
      dispatch({ type: types.GET_ANIME_NEWEST, payload: response.data });
    } catch (err) {
      return { error: { message: "Not found" } };
    }
  };
};

export const getAnimeOldest = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/animes/oldest`);
      dispatch({ type: types.GET_ANIME_OLDEST, payload: response.data });
    } catch (err) {
      return { error: { message: "Not found" } };
    }
  };
};
