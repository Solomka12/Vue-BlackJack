// Vue.component('playing-card', {
// 	props: ['card', ],
// 	template: `
// 		<div class="playing-card">
			
// 		</div>
// 	`
// })
var vm = new Vue({
	el: '#app',
	data: {

		deck: [
			{ name: 'two',		lable: '2', 	value: 2, 	suit: ''},
			{ name: 'three',	lable: '3', 	value: 3, 	suit: ''},
			{ name: 'four',		lable: '4', 	value: 4, 	suit: ''},
			{ name: 'five',		lable: '5', 	value: 5, 	suit: ''},
			{ name: 'six',		lable: '6', 	value: 6, 	suit: ''},
			{ name: 'seven',	lable: '7', 	value: 7, 	suit: ''},
			{ name: 'eight',	lable: '8', 	value: 8, 	suit: ''},
			{ name: 'nine',		lable: '9', 	value: 9, 	suit: ''},
			{ name: 'ten',		lable: '10', 	value: 10, 	suit: ''},
			{ name: 'jack',		lable: 'J', 	value: 10, 	suit: ''},
			{ name: 'queen',	lable: 'Q', 	value: 10, 	suit: ''},
			{ name: 'king',		lable: 'K', 	value: 10, 	suit: ''},
			{ name: 'ace',		lable: 'A', 	value: 11, 	suit: ''},
			//{ name: 'empty',		lable: '', 	value: 0, },
		],

		suits: ["spades", "clubs", "hearts", "diamonds"],

		playerHand: [],

		dealerHand: [],

		dealerPoints: 0,

		playerPoints: 0,

		chosenNum: 0,

	},

	methods: {

		getRandomInt: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		addCardToDealer: function() {
			this.dealerHand.push(this.addNewCard());
		},

		addCardToPlayer: function() {
			this.playerHand.push(this.addNewCard());
		},

		addNewCard: function () {
			do {
				var newObj = Object.assign({}, this.deck[this.getRandomInt(0, this.deck.length - 1)]);
				newObj.suit = this.suits[this.getRandomInt(0, 3)];
				//console.log('card has been been...');
			} while (this.checkCardClones(newObj));

			return newObj;
		},

		checkCardClones: function(gottenCard) {

			var usedCards = this.playerHand.concat(this.dealerHand);

			function func(elem){
				return JSON.stringify(elem) === JSON.stringify(gottenCard);
			};

			return usedCards.some(func);
		},

		startNewHand: function () {
			console.log('New game has been started');
			this.playerHand = [];
			this.dealerHand = [];

			this.addCardToDealer();
			this.addCardToPlayer();
			this.addCardToDealer();
			this.addCardToPlayer();
		},


	},

	computed: {
		getPlayerPoints: function() {
			return this.playerHand.reduce(function(sum, current) {
				return sum + current.value;
			}, 0);
		},

		getDealerPoints: function() {
			return this.dealerHand.reduce(function(sum, current) {
				return sum + current.value;
			}, 0);
		},
	}
})

/*<div v-bind:class="getSuit" class="playing-card">
			<img :src='path.image'>
		</div>*/