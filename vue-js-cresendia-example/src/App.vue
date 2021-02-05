<template>
  <div id="app">
    <loading :active.sync="isLoading" 
      :is-full-page="fullPage"></loading>    
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Cresendia Test</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import EventBus from "./services/EventBus";

export default {
  name: "app",
  components: {
    Loading
  },  
  data() {
      return {
          isLoading: false,
          fullPage: true
      }
  },
  methods: {
    isPageLoading() {
			EventBus.$on("pageLoading",loading => {
				this.isLoading = loading;
			})      
    }
  },  
	created() {
    this.isPageLoading();
	}    
};
</script>
