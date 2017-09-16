<template>
	<div id="playing-field">

		<div class="dealer-area">
			<transition name="fade">
				<div v-show="dealerPoints" class="dealer-points"><span class="points">{{ dealerPoints }}</span></div>
			</transition>
			<transition-group name="card-appear" tag="div" appear id="dealer-cards">
				<div 
					class="playing-card" 
					:class="[card.name, card.suit]" 
					v-for="(card, index) in dealer.hand" 
					:style="{margin: cardsMargin}"
					key="index">
				</div>
			</transition-group>
		</div>



		<div class="control-panel">
			<template v-if="betMade">
				<button v-on:click="takeCard" class="btn" :disabled="cantTakeMore"  key="TakeCard">More</button>
				<button v-on:click="startDealerPlay" class="btn" :disabled="cantTakeMore" key="Enough">Enough</button>
			</template>
			<template v-else>
				<input 
					type="range" 
					min="1" 
					:max="player.cash" 
					v-model="player.bet" 
					id="rangePicker" 
					step="1" 
					key="range">
				<input 
					v-model.number="player.bet" 
					type="number" 
					name="money" 
					min="1" 
					:max="player.cash" 
					step="1" 
					value="10" 
					key="bet" 
					:disabled="!player.cash">
				<button 
					v-on:click="giveOutCards()" 
					class="btn" 
					:disabled="player.bet < 1 || player.bet > player.cash" 
					key="startHand"
					>Bet
				</button>
			</template>
			<div class="player-cash">{{ player.cash + '$'}}</div>
			<!-- <button v-on:click="addCardTo(dealer)" class="btn" >Add Card To Dealer</button> -->
		</div>



		<div class="player-area">
			<transition name="fade">
				<div v-show="playerPoints" class="player-points"><span class="points">{{ playerPoints }}</span></div>
			</transition>
			<trend
			class="trend-chart"
			:data="historyCash || []"
			:gradient="['rgba(0,0,0,0)', 'rgba(40,40,40,0.4)']"
			auto-draw
			:padding="1"
			smooth>
		</trend>
			<transition-group name="card-appear" tag="div" appear id="player-cards">
				<div 
					class="playing-card" 
					:class="[card.name, card.suit]" 
					v-for="(card, index) in player.hand"
					:style="{margin: cardsMargin}"
					key="index">
				</div>
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

			player: { 
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

			history: [],
			historyCash: [1000],

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

			this.addCardTo(this.dealer);
			this.addCardTo(this.player);
			this.addCardTo(this.player);
			if (this.playerPoints === 21) this.startDealerPlay();
		},

		takeCard: function() {
			this.addCardTo(this.player);
			var points = this.playerPoints;
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
			} while (this.dealerPoints < 17);

			this.summarizing();
		},
		
		/*----------Сравниваются очки дилера и игрока-----------*/
		summarizing: function() {
			if (this.dealerPoints > 21 || this.playerPoints > this.dealerPoints) {
				this.player.cash += this.player.bet * 2;
				// console.info('You won ' + this.player.bet * 2 + '$');
				this.$notify({
					group: 'note-place',
					title: 'You won ' + this.player.bet * 2 + '$',
					type: 'my-success',
				});
				this.history.unshift(this.wrightToHistory('win'));
			} else if (this.playerPoints === this.dealerPoints) {
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
			this.historyCash.push(this.player.cash);
			return {
				cash: this.player.cash + '$',
				profit: (function() {
					if (status === 'lose') return '-' + that.player.bet + '$';
					else if (status === 'win') return '+' + (that.player.bet * 2) + '$';
					return '+' + that.player.bet + '$'; 
				})(),
				status: status,
				player: {
					points: this.playerPoints,
				},
				dealer: {
					points: this.dealerPoints,
				}
			};
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

		fetchLocalStorage: function() {
			var locStor = JSON.parse(localStorage.getItem('blackjack-game') || 'false');
			var that = this;
			if ( locStor ) {
				this.$modal.show('dialog', {
					title: 'Unfinished game',
					text: 'You played before.',
					buttons: [ 
						{ title: 'Continue',
							handler: function() {
								that.player.cash = locStor.cash;
								that.historyCash = locStor.history || [1000];
								that.$modal.hide('dialog')
							} 
						},
						{ title: 'New Game' }
					]
				})
			}
		},

		saveToLocalStorage: function(data) {
			localStorage.setItem('blackjack-game', JSON.stringify(data))
		},


		// changeCardsMargin: function(person) {
		// 	var fieldWidth = window.innerWidth;
		// 	var cards = person.hand.length;
		// 	var result = fieldWidth - (cards * 210 + 180);

		// 	if (result < 0) return '0 ' + (result / (cards*2)) + 'px';

		// 	//console.log('Number of Cards: ' + cards + ', Area Width: ' + fieldWidth + ' ' + result);
		// },
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
//	},
// },

	computed: {

		playerPoints: function() {
			return this.getPoints(this.player)
		},

		dealerPoints: function() {
			return this.getPoints(this.dealer)
		},

		cardsMargin: function() {
			var fieldWidth = window.innerWidth;
			var cards =  this.player.hand.length < this.dealer.hand.length ? this.dealer.hand.length : this.player.hand.length;
			var result = fieldWidth - (cards * 210 + 180);

			if (result < 0) return '0 ' + (result / (cards*2)) + 'px';
		},

	},

	watch: {

		player: {
			handler: function (val) {
				var that = this;
				this.saveToLocalStorage({
					cash: val.cash,
					history: this.historyCash,
				});
				if( val.cash < 1 && !this.betMade ) {
					this.$modal.show('dialog', {
						title: 'You run out of money!',
						text: 'Try again?',
						buttons: [ 
							{ title: 'Yes',
								handler: function() {
									val.cash = 1000; 
									that.$modal.hide('dialog');
									that.history = [];
									that.historyCash = [1000];
								} 
							},
							{ title: 'No' }
						]
					})
				} 
			},
			deep: true
		},
		history: function(val) {
			this.$emit('transferHistory', val);
		}
	},

	mounted: function() {
		this.fetchLocalStorage();
	}

}
</script>

<style scoped>

	.btn {
		background-color: rgba(255,255,255,0);
		border: 2px solid rgba(50,234,140,0.6);
		border-radius: 10px;
		box-shadow: inset 0 0 6px #666;
		text-shadow: 1px 1px 6px rgba(0,0,0,0.4);
		font-family: Arial;
		color: #eee;
		font-size: 18px;
		padding: 10px 20px 10px 20px;
		text-decoration: none;
		outline: none;
		min-width: 100px;
		min-height: 45px;
		cursor: pointer;
	}

	.btn:hover {
		/*background: rgba(50,227,126,0.6);*/
		border: 2px solid rgba(50,234,140,1);
		box-shadow: inset 0 0 8px #555;
	}

	.btn:active {
		background: rgba(50,227,126,1);
	}

	.btn[disabled], .btn[disabled]:hover {
		color: #ccc;
		background: rgba(70,70,70,0.2);
		border: 2px solid rgba(70,70,70,0.6);
		box-shadow: inset 0 0 6px #666;
	}

	#playing-field {
		/*margin-left: 20px;*/
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		/*	position: relative;*/
	}

	.player-area,
	.dealer-area {
		/*background-color: #19AF24;*/
		border: 2px solid rgba(0,0,0,0.06);
		border-radius: 10px;
		/*	overflow: hidden;*/
		flex: 1 1 auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.control-panel {
		/*background-color: #19AF24;*/
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		/*min-height: 55px;*/
		justify-content: center;
	}

	.playing-card {
		display: inline-block;
		background-size: 505% auto;
		width: 200px;
		height: 278px;
		margin: 5px;
		border: 0px solid black;
		border-radius: 18px;
		box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.3);
		transition-property: transform, box-shadow;
		transition-duration: 0.3s;
		transition-timing-function: ease-out;
	}

/*.playing-card:first-child {
	margin-left: -70px !important;
}*/

.player-points,
.dealer-points {
	min-width: 70px;
	min-height: 70px;
	padding: 4px;
	background: rgba(36, 218, 126, 0.7);
	border-radius: 50%;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
	position: absolute;
	z-index: 120;
	/*left: -30px;*/
	text-align: center;
	flex: 0 1 auto;
	/*align-self: flex-start;*/
}

/*.player-points {
	align-self: flex-start;
	top: 20px;
}

.dealer-points {
	align-self: flex-end;
	top: -20px;
}*/

.points {
	font-size: 3.3rem;
	color: #eee;
	text-shadow: 1px 1px 8px rgba(0, 0, 0, 1);
}

.player-cash {
	font-size: 2.4rem;
	color: #eee;
}

.control-panel .btn {
	margin: 0 10px;
}

/*.playing-card:hover {
	transform: scale(1.04, 1.04);
	box-shadow: 0px 8px 3px 0px rgba(0,0,0,0.3);
}*/
.diamonds {
	background-image: url('../assets/diamonds.png');
}
.clubs {
	background-image: url('../assets/clubs.png');
}
.hearts {
	background-image: url('../assets/hearts.png');
}
.spades {
	background-image: url('../assets/spades.png');
}
.ace{
	background-position: 0 0;
}
.two{
	background-position: -202px 0;
}
.three{
	background-position: -404px 0;
}
.four{
	background-position: -606px 0;
}
.five{
	background-position: -808px 0;
}
.six{
	background-position: 0 -288px;
}
.seven{
	background-position: -202px -288px;
}
.eight{
	background-position: -404px -288px;
}
.nine{
	background-position: -606px -288px;
}
.ten{
	background-position: -808px -288px;
}
.jack{
	background-position: 0 -576px;
}
.queen{
	background-position: -202px -576px;
}
.king{
	background-position: -404px -576px;
}
.empty{
	background-position: -808px -576px;
}

/*--------------Стилизация ползунка---------------*/

input[type=range] {
	-webkit-appearance: none;
	margin: 10px 20px 20px;
	max-width: 400px;
	flex: 1 1 300px;
	background-color: rgba(0, 0, 0, 0);
}

input[type=range]:focus {
	outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 8px;
	cursor: pointer;
	background-color: rgba(256,256,256,0.2);
	box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.2);
	border-radius: 25px;
}

input[type=range]::-webkit-slider-thumb {
	box-shadow: 0px 0px 6px #0d0d0d, inset 0 0 2px #0d0d0d;
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: rgba(60,255,180,0.8);
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -11px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
	background-color: rgba(256,256,256,0.3);
}

input[type=range]::-moz-range-track {
	width: 100%;
	height: 8px;
	cursor: pointer;
	background-color: rgba(256,256,256,0.2);
	box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.2);
	border-radius: 25px;
}

input[type=range]::-moz-range-thumb {
	box-shadow: 0px 0px 6px #0d0d0d, inset 0 0 2px #0d0d0d;
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: rgba(60,255,180,0.8);
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -11px;
}
/*------------------------------------------------*/

input[type='number'] {
	background-color: rgba(13, 13, 13, 0.15);
	border: 2px solid rgb(36, 209, 143);
	border-radius: 10px;
	width: 100px;
	color: #eee;
	padding: 7px;
	margin: 0 10px;
	font-size: 1.4rem;
}

/*--------------- Анимации и переходы ----------------*/

.card-appear-enter-active, .card-appear-leave-active {
	transition: all .5s cubic-bezier(.16,.11,.29,.96);
}
.card-appear-leave-to {
	transform: translateY(-1000px);
}
.card-appear-enter{
	transform: translateY(-1000px) rotate(200deg);
}
.card-appear-move {
	transition: transform .3s;
}

.fade-enter-active, .fade-leave-active {
	transition: all .4s;
}
.fade-enter, .fade-leave, .fade-leave-to {
	opacity: 0;
}

/*------------------------------------------------*/

/*@media (max-width: 700px) {
	.history-block {
		display: none;
		position: absolute;
		left: -20%;
		width: 100%;
	}
*/
	.playing-field {
		margin-left: 0;
	}

/*	.playing-card {
		transform: scale(0.8);
	}
	.playing-card:hover {
		transform: scale(0.85, 0.85);
	}*/

@media (max-height: 700px) {
	.playing-card {
		transform: scale(0.65);
	}
	.playing-card:hover {
		transform: scale(0.7, 0.7);
	}
}

@media (max-height: 520px) {
	.playing-card {
		transform: scale(0.4);
	}

	.playing-card:hover {
		transform: scale(0.45, 0.45);
	}

	.btn {
		font-size: 14px;
		padding: 5px;
		min-width: 60px;
		min-height: 30px;
	}
	.player-points,
	.dealer-points {
		min-width: 40px;
		min-height: 40px;
		padding: 2px;
		background: rgba(36, 218, 126, 0.7);
		border-radius: 50%;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
		position: absolute;
		z-index: 120;
		/*left: -30px;*/
		text-align: center;

		/*align-self: flex-start;*/
	}

	.points {
		font-size: 2rem;
		color: #eee;
		text-shadow: 1px 1px 8px rgba(0, 0, 0, 1);
	}
	.player-cash {
		font-size: 1.6rem;
		color: #eee;
	}
}

.trend-chart {
	position: absolute;
	z-index: -1;
}


</style>