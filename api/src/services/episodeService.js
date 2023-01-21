const utils = require('../utils/utils');
const { Anime } = require('../db.js');
const { default: axios } = require('axios');

exports.getEpisode= async (idAnime, idEpisode) => {
  try {
    let dbData = await Anime.findByPk(idAnime);
        if (!dbData) {
          throw new Error(`Anime with id ${idAnime} wasn't found. Not related episodes.`);

        } else {
          const episode = await utils.getEpisode(idAnime, idEpisode);
          return episode
        }
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.fillEpisodesAnime = async (id) => {
    try {
        let dbData = await Anime.findByPk(id);
        if (!dbData) {
          throw new Error(`Anime with id ${id} wasn't found. Not related episodes.`)
        }
        else {
          const episodes = await utils.getAllEpisodes(id);
          return episodes;
        }
        
      } catch (error) {
        throw new Error(error.message)
      }
};

exports.getNewestEpisodes = async (id) => {
  try {
    let dbData = await Anime.findByPk(id);
    if (!dbData) {
      throw new Error(`Anime with id ${id} wasn't found. Not related episodes.`)
    }
    else {
      let newestEpisodes = await utils.getAllEpisodes(id);

      newestEpisodes = newestEpisodes.sort((a, b) => b.id - a.id);

      return newestEpisodes;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.getEpisodeStreaming = async (searchName, episodeNumber) => {
  try {
    
    let searchRegex = /[^\w]/g;
    let searchMatcher = searchName.replace(searchRegex, "-");
    searchMatcher = searchMatcher.toLowerCase()
    let animesMatch = await axios.get(`https://gogoanime.consumet.org/search?keyw=${searchName}`);

    // let maxCoincideIndex = 0;
    // let matchIndex = animesMatch.data.map(anime => {
    //   let wordsIndexMatch = searchMatcher.split('-').map(word => {
    //     if (anime.animeId.includes(word)) return word;
    //   })
    //   let coincidenceIndex = wordsIndexMatch.length / anime.animeId.split('-').length ;
    //   let prevMaxCoincideIndex = maxCoincideIndex;
    //   maxCoincideIndex = coincidenceIndex > maxCoincideIndex ? coincidenceIndex: maxCoincideIndex;
    //   if (coincidenceIndex > prevMaxCoincideIndex) return anime.animeId;
    // })
    let searchId = animesMatch.data[1].animeId;
    let streamingUrl = await axios.get(`https://gogoanime.consumet.org/vidcdn/watch/${searchId}-episode-${episodeNumber}`);
    streamingUrl = streamingUrl.data.Referer;
    return streamingUrl;
  } catch(err) {
    console.log(err.message)
    throw new Error(err.message);
  }
}