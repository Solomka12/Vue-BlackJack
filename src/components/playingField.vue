<template>
	<div id="playing-field">

		<div class="dealer-area">
			<transition name="fade">
				<div v-show="setDealerPoints" class="dealer-points"><span class="points">{{setDealerPoints}}</span></div>
			</transition>
			<transition-group name="card-appear" tag="div" appear id="dealer-cards">
				<div class="playing-card" v-bind:class="[card.name, card.suit]" v-for="(card, index) in dealer.hand" key="index"></div>
			</transition-group>
		</div>



		<div class="control-panel">
			<template v-if="betMade">
				<button v-on:click="takeCard" class="btn" v-bind:disabled="cantTakeMore"  key="TakeCard">More</button>
				<button v-on:click="startDealerPlay" class="btn" v-bind:disabled="cantTakeMore" key="Enough">Enough</button>
			</template>
			<template v-else>
				<input type="range" min="1" :max="player.cash" v-model="player.bet" id="rangePicker" step="1" key="range">
				<input v-model.number="player.bet" type="number" name="money" min="1" :max="player.cash" step="1" value="10" key="bet">
				<button v-on:click="giveOutCards()" class="btn" v-bind:disabled="player.bet < 1 || player.bet > player.cash" key="startHand">Bet</button>
			</template>
			<div class="player-cash">{{ player.cash + '$'}}</div>
			<!-- <button v-on:click="addCardTo(dealer)" class="btn" >Add Card To Dealer</button> -->
		</div>



		<div class="player-area">
			<transition name="fade">
				<div v-show="setPlayerPoints" class="player-points"><span class="points">{{player.points}}</span></div>
			</transition>
			<transition-group name="card-appear" tag="div" appear id="player-cards">
				<div class="playing-card" v-bind:class="[card.name, card.suit]" v-for="(card, index) in player.hand" key="index"></div>
				<!-- <playing-card v-bind:class="[card.name, card.suit]" v-for="card in playerHand" :card="card"></playing-card> -->
			</transition-group>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'playingField',
		data () {
			return {

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
				cash: 1000,
				points: 0,
				bet: 50,
			},

			dealer: {
				hand: [],
				points: 0,
			},

			betMade: false,
			cantTakeMore: false,

			history : [],

		}
	},
	methods: {

		getRandomInt: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		addCardTo: function(person) {
			// var that = this;
			// setTimeout(function(){
			// 	console.log(that.addNewCard());
			// }, 1000)
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
			this.cantTakeMore = false;
			this.betMade = false;
			this.player.hand = [];
			this.dealer.hand = [];
		},

		giveOutCards: function() {
			this.player.cash -= this.player.bet;
			this.betMade = true;
			console.log('New game has been started');

			this.addCardTo(this.dealer);
			this.addCardTo(this.player);
			this.addCardTo(this.player);
			if (this.getPoints(this.player) === 21) this.startDealerPlay();
		},

		takeCard: function() {
			this.addCardTo(this.player);
			var points = this.getPoints(this.player);
			if (points === 21) this.startDealerPlay();
			else if (points > 21) { 
				this.cantTakeMore = true;
				// console.warn('Going bust! You Lose...');
				this.$notify({
					group: 'note-place',
					title: 'Going bust! You Lose...',
					type: 'my-error',
				});
				this.history.unshift(this.wrightToHistory('lose'));
				setTimeout(this.startNewHand, 2000);
			}
		},

		startDealerPlay: function() {
			this.cantTakeMore = true;

			/*----------Дилер добирает карты-----------*/
			do {
				this.addCardTo(this.dealer);
			} while (this.getPoints(this.dealer) < 17);

			this.summarizing();
		},
		
		/*----------Сравниваются очки дилера и игрока-----------*/
		summarizing: function() {
			if (this.getPoints(this.dealer) > 21 || this.getPoints(this.player) > this.getPoints(this.dealer)) {
				this.player.cash += this.player.bet * 2;
				// console.info('You won ' + this.player.bet * 2 + '$');
				this.$notify({
					group: 'note-place',
					title: 'You won ' + this.player.bet * 2 + '$',
					type: 'my-success',
				});
				this.history.unshift(this.wrightToHistory('win'));
			} else if (this.getPoints(this.player) === this.getPoints(this.dealer)) {
				this.player.cash += +this.player.bet;
				// console.warn('Draw');
				this.$notify({
					group: 'note-place',
					title: 'Draw',
					type: 'my-info',
				});
				this.history.unshift(this.wrightToHistory('draw'));
			} else {
				// console.warn('You Lose...');
				this.$notify({
					group: 'note-place',
					title: 'You Lose...',
					type: 'my-error',
				});
				this.history.unshift(this.wrightToHistory('lose'));
			}
			setTimeout(this.startNewHand, 2000);
		},

		wrightToHistory: function(status) {
			var that = this;
			return {
				cash: this.player.cash + '$',
				profit: (function() {
					if (status === 'lose') return '-' + that.player.bet + '$';
					else if (status === 'win') return '+' + (that.player.bet * 2) + '$';
					return '+' + that.player.bet + '$'; 
				})(),
				status: status,
				player: {
					points: this.getPoints(this.player),
				},
				dealer: {
					points: this.getPoints(this.dealer),
				}
			};
		},

			// var points = this.getPoints(this.dealer);
			// var i = 0;
			// do {
			// 	setTimeout(function(that) {
			// 		return function() {
			// 			console.log(that);
			// 			that.addCardTo(that.dealer);
			// 		}; 
			// 	}(this), 1000*i);
			// 	points = this.getPoints(this.dealer);
			// 	i++;
			// }	while (points < 17);

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

// directives: {
// 	changeCardsMargin: {
// 		bind: function(el, binding) {
// 			var fieldWidth = el.clientWidth;
// 			console.log(el);
// 			var cards = binding.value.handLength;
// 			var result = fieldWidth - (cards * 210 + 180);

// 			if (result < 0) return {margin: '0 ' + (result / (cards*2)) + 'px'}
// 		}
// 	},
// },

computed: {

	setPlayerPoints: function() {
			// if (this.getPoints(this.player) < 21 && this.getPoints(this.player) > this.getPoints(this.dealer)) console.info('You won!');
			// else if (this.getPoints(this.player) > 21) console.warn('Overfull! You lose...');
			// else console.warn('You lose(');
			this.player.points = this.getPoints(this.player);
			// console.log(this.player.points);
			return this.player.points;
		},
		
		setDealerPoints: function() {
			this.dealer.points = this.getPoints(this.dealer);
			return this.dealer.points;
		},

	}

}
</script>

<style scoped>

</style>