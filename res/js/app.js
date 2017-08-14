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

		player:{ 
			hand: [],
			points: 0,
		},

		dealer: {
			hand: [],
			points: 0,
		}



	},

	methods: {

		getRandomInt: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		addCardTo: function(person) {
			person.hand.push(this.addNewCard());
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

			var usedCards = this.player.hand.concat(this.dealer.hand);

			return usedCards.some(function(elem){
				return JSON.stringify(elem) === JSON.stringify(gottenCard);
			});
		},

		startNewHand: function () {
			console.log('New game has been started');
			this.player.hand = [];
			this.dealer.hand = [];

			this.addCardTo(this.dealer);
			this.addCardTo(this.player);
			this.addCardTo(this.dealer);
			this.addCardTo(this.player);
		},

		checkBast: function(person) {
			if (this.getPoints(person) > 21) {
				console.log('Overfull!');
			}
		},

		showPoints: function(person) {
			person.points = this.getPoints(person);
		},

		getPoints: function(person) {
			var ace = 0;

			return person.hand.reduce(function(sum, currentCard) {
				if(currentCard.name === 'ace') {
					ace++;
					if(sum + currentCard.value > 21) {
						ace--;
						return sum + currentCard.value - 10;
					} else { return sum + currentCard.value; }
				} else if (sum + currentCard.value > 21) {
					if (ace > 0) {
						ace--;
						return sum + currentCard.value - 10;
					}
				}
				return sum + currentCard.value;
			}, 0);
		},



	},

	computed: {

		setPlayerPoints: function() {
			// if (this.getPoints(this.player) < 21 && this.getPoints(this.player) > this.getPoints(this.dealer)) console.info('You won!');
			// else if (this.getPoints(this.player) > 21) console.warn('Overfull! You lose...');
			// else console.warn('You lose(');

			this.player.points = this.getPoints(this.player);
			//console.log(this.player.points);
			return this.getPoints(this.player);
		},
		
		setDealerPoints: function() {
			return this.getPoints(this.dealer);
		},


	}
})

/*<div v-bind:class="getSuit" class="playing-card">
			<img :src='path.image'>
		</div>*/