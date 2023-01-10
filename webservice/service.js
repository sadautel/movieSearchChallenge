import axios from 'axios'
import express from 'express'


export default {
  
  data() {
    return {
      movies: [],
      searchedMovies: [],
      searchInput: '',
    }
  },

  //implment fetch
    async fetch() {
    if (this.searchInput === '') {
      await this.getMovies()
      return
    }
      await this.searchMovies()
  },

  fetchDelay: 1000,
  methods: {
    async getMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=256a4b90221a95ebda851d77d4aef524&language=en-US&page=1`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
    },
    async searchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=256a4b90221a95ebda851d77d4aef524&language=en-US&page=1&query=${this.searchInput}`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie)
      })
    },
    clearSearch() {
      this.searchInput = ''
      this.searchedMovies = []
    },
  },
}