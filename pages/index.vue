
<template>
   <div class="movieHome">
    
    <!-- Search -->
    <div class="container search">
      <h2>Movie Search</h2>
     
      <!-- Allows user to search by hitting enter instead of having to click a button.
           Preffered for accessibility -->
      <input
        type="text"
        placeholder="Search"
        @keyup.enter="$fetch" 
        v-model.lazy="searchInput"
      />
      
      <!--Clears input and search-->
      <button v-show="searchInput !== ''" @click="clearSearch" class="button">
        Clear Search
      </button>
    </div>

    <!-- Movies -->
    <div class="container movies">
      <!-- Search movie Results -->
      <div id="movie-grid" v-if="searchInput !== ''" class="movies-grid">
        <div
          class="movie"
          v-for="(movie, index) in searchedMovies"
          :key="index"
        >
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title"><b>
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </b></p>          
          </div>
        </div>
      </div> 
      </div>
    </div>
</template>

<!--Working on separating the frontend and backend for this app
    as I am tryng to find the correct syntax-->
<script>
import axios from 'axios'
export default {
  
  data() {
    return {
      movies: [],
      searchedMovies: [],
      searchInput: '',
    }
  },

  //implment fetch for search
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
</script>
