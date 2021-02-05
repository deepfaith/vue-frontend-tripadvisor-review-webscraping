<template>
  <div class="list row">
    
    <div class="col-md-12 submit-form">
      <div class="input-group mb-3">
         <input type="text" class="form-control" placeholder="Place Restaurant TripAdvisor Url"
          v-model="restaurantUrl" data-vv-rules="{url: {require_protocol: true }}" 
          data-vv-validate-on="none" @focus="onFocus" />   
          <span>{{ errors.first('restaurantUrl') }}</span>  
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="saveRestaurant"
          >
            Choose Restaurant
          </button>
        </div>
      </div>
    </div>
    
    <div class="col-md-12">
      <div v-if="currentRestaurant">
        <h4>Restaurant</h4>
        <div>
          <label><strong>Restaurant:</strong></label> {{ currentRestaurant.restaurantName }}
        </div>
         <div>
          <label><strong>First Page Review Count:</strong></label> {{ currentRestaurant.totalReviews }}
        </div>  
        <div>
          <reviews />
        </div>             
        <div>
          <label><strong>Reviews JSON:</strong></label> {{ currentRestaurant.reviews }}
        </div>
      </div>
      <div v-else>
        <div v-if="errorFetching">
          <div class="alert alert-danger" role="alert">
            Error Getting Request!
          </div>
        </div>          
        <div class="alert alert-danger" role="alert">
          Please input a TripAdvisor restaurant url...
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DataService from "../services/DataService";
import Reviews from './Reviews'
import EventBus from "../services/EventBus";

export default {
  name: "home",
  components: {
      Reviews,
  },    
  data() {
    return {
      currentRestaurant: null,
      restaurantUrl: "",
      errorFetching: false
    };
  },
  methods: {
     setActiveRestaurant(restaurant) {
      this.currentRestaurant = restaurant;
      this.restaurantUrl = restaurant.restaurantUrl;  
    },
    onFocus() {
      this.restaurantUrl = '';
    },
    saveRestaurant() {
      EventBus.$emit("pageLoading", true); 
      var data = {
        restaurantUrl: this.restaurantUrl,
      };

      DataService.create(data)
        .then(response => {
          this.setActiveRestaurant(response.data);   
          setTimeout(function() {
            EventBus.$emit("finished", response.data.reviews);  
          }, 200);
          EventBus.$emit("pageLoading", false);
        })
        .catch(e => {
          this.currentRestaurant = "";
          this.errorFetching = e;
          EventBus.$emit("pageLoading", false);
        });        
  


    },
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
