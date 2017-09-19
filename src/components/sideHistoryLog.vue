<template>
	<div id="side-log" class="side-log history-block user-scrollbar" :class="{'side-log-open': isOpened}">
		<h2 class="icon icon-lab history-header">History Log</h2>
		<transition-group name="list-history" tag="div" v-if="isOpened">
			<div v-for="item in history" class="history-item" v-bind:class="item.status" :key="JSON.stringify(item)">
				
				<div class="history-main-info">
					<span class="profit-info">Gain: <strong class="history-profit-amount">{{item.profit}}</strong></span>
					<span class="total-info">Total: <strong class="history-cash-amount">{{item.cash}}</strong></span>
					<hr/>
				</div>
				
				<div class="player-title">Player <strong class="history-points">{{item.player.points}}</strong></div>
				
				<div class="history-dealer-info"><strong class="history-points">{{item.dealer.points}}</strong> Dealer</div>
				
			</div>
		</transition-group>
		
		<div class="open-button" @click="isOpened = !isOpened" :class="{ 'open-button-active': isOpened }">{{ isOpened ? '&#10060;' : '&#9776;' }}</div>
	</div>
</template>

<script>

	export default {
		name: 'sideHistoryLog',

		props: {
			history: {
				type: Array
			}
		},

		data () {
			return {
				isOpened: false,
			}
		},

		// created: function() {
		// 	bus.$on('transferHistory', function (data) {
		// 		this.history = data || [];
		// 		console.log(data);
		// 	})		
		// },
	}
</script>

<style scoped>

.open-button {
	position: fixed;
	top: 8px;
	left: 84%;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 50%;
	padding: 5px 11px 8px;
	cursor: pointer;
	font-size: 1.4em;

/*	border: 2px solid rgba(50,234,140,0.6);
	border-left: 0;*/
}

.side-log {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.0);
	visibility: hidden;
	width: 300px;
	height: 100%;
	-webkit-transition: all 0.5s;
	transition: all 0.5s;
	/*border-right: 2px solid rgba(50,234,140,0.6);*/
	/*box-shadow: 0 0 20px rgba(0,0,0,0.3);*/
}

.side-log {
	visibility: visible;
	-webkit-transform: translate3d(-80%, 0, 0);
	transform: translate3d(-80%, 0, 0);
}

.side-log-open {
	background-color: rgba(0, 0, 0, 0.3);
	visibility: visible;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}


/*-----------Стилизация сайдбара истории----------*/

.history-block {
	overflow-x: hidden; /* Hide horizontal scrollbar */
	overflow-y: auto;
	/*border-right: 3px solid rgba(60,240,80,0.3);*/
}

.history-header {
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;
	margin: 20px 0 10px 0;
	color: #eee;
}

.history-item {
	display: flex;
	flex-wrap: wrap;
	border-bottom: 2px solid rgba(50,234,140,0.8);
	padding: 10px;
	color: #ddd;
}


.history-item:first-child {
	border-top: 2px solid rgba(50,234,140,0.8);
}

.history-item.win:hover {
	/* box-shadow: inset 0 0 8px #5c5; */
	background-color: rgba(100, 200, 100, 0.4);
}

.history-item.lose:hover {
	background-color: rgba(200, 100, 100, 0.8);
}

.win .history-profit-amount {
	color: #1B2;
}

.lose .history-profit-amount {
	color: #E95C5C;
}

.history-profit-amount,
.history-cash-amount,
.history-points {
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
}

.history-main-info {
	flex: 1 1 100%;
}

.history-player-info,
.history-dealer-info{
	flex: 1 1 auto;
}

.history-dealer-info {
	text-align: right;
}

/*--------------------Scrollbar------------------*/

.user-scrollbar::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: rgba(0,0,0,0.1);
}

.user-scrollbar::-webkit-scrollbar {
	width: 12px;
}

.user-scrollbar::-webkit-scrollbar-thumb {
	border-radius: 10px;
	margin: 20px 0;
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
	background-color: rgba(30,220,140,.6);
}

/*--------------- Анимации и переходы ----------------*/

.history-item {
	transition: all .3s;
}
.list-history-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
	opacity: 0;
	transform: translateY(-50px);
}
.list-history-leave-active {
	position: absolute;
}

/*.open-button-active {
	top: 10px;
	left: 80%;
	border-radius: 50%;
	border-left: 2px solid rgba(30,220,140,.6);
}
*/
</style>