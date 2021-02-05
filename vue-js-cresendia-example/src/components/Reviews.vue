<template> 
<div v-if="reviewFilterWithLikeHoods.length !== 0 && reviewFilterWithLikeHoods[0].reviewerName">
	<label><strong>Reviews with joyLikeHood or sorrowLikeHood: ({{reviewFilterWithLikeHoods.length}})</strong></label> 
	<ul class="list-group">
		<li class="list-group-item"
			v-for="(review, index) in (reviewFilterWithLikeHoods ? reviewFilterWithLikeHoods : [])"
			:key="index">
			<strong>Name: </strong> {{ review.reviewerName }}<br>
			<strong>Review: </strong> {{ review.review }}<br>
			<img :src="review.reviewerPhoto"><br>
			<span :class="[likehood.likeHood == 'joy' ? 'badge badge-primary mr-2' : 'badge badge-danger mr-2']" 
				v-for="(likehood, indexL) in review.reviewLikehoods" 
				:key="indexL">{{ likehood.likeHood }}: {{ likehood.rating }}
			</span>		  
		</li>
	</ul>  
</div>
</template>

<script>
// Import eventbus to listen to the emmited event
import EventBus from "../services/EventBus";

export default {
	name: "reviews-list",
	data() {
		return {
			reviews: [{
				reviewerName: null,
				reviewLikehoods:[{}]
			}],
		};
	},
	computed: {
		reviewFilterWithLikeHoods: function() {
			return this.reviews.filter(function(review) {
				return review.reviewLikehoods.length !== 0
			})
		}	 
	}, 	
	methods: {
		getReviews() {
			EventBus.$on("finished", eventData => {
				this.reviews = eventData;
			});
		},
	},
	created() {
		this.getReviews();
	},
};
</script>