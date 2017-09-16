<template>
	<div id="app">
<!-- 		<side-nav>
			<div>First Text</div>
		</side-nav> -->
<!-- 		<modal name="dialog">
			Enter your name
		</modal> -->
		<v-dialog name="dialog" adaptive="true" :clickToClose="clickToClose" draggable="true" />
		
		<notifications group="note-place" position="bottom center" classes="notes-style"/>
		<side-log :history="history"></side-log>
		<playing-field @transferHistory="updateHistory($event)"></playing-field>

	</div>
</template>

<script>
	import playingField from './components/playingField.vue';
	import sideHistoryLog from './components/sideHistoryLog.vue';

	export default {
		components: {
			'playing-field': playingField,
			'side-log': sideHistoryLog,
		},

		name: 'app',
		data () {
			return {
				clickToClose: false,
				history: [
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
					{cash: '100$', status: 'win', profit: '50$', player: {points: 21}, dealer: {points: 19}},
				],
			}
		},
		methods: {
			updateHistory: function(data) {
				this.history = data;
			}
		},
	}
</script>

<style>

		[v-cloak] { display: none; }

	body {
		background: linear-gradient(141deg, #0d96bf, #11bd72, #0d96bf);
		background-size: 600% 600%;
		margin: 0;
		font-family: Arial;

		animation: BackgroundChanging 20s ease infinite;
	}

	@keyframes BackgroundChanging { 
		0%{background-position:50% 0%}
		50%{background-position:50% 100%}
		100%{background-position:50% 0%}
	}

	hr {
		border: 0;
		height: 1px;
		margin: 4px -4px;
		background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
	}

	#app {
		display: flex;
		align-content: stretch;
		align-items: stretch;
		height: 100vh;
		padding: 20px;
		box-sizing: border-box;
	}

.v--modal-overlay {
  background: rgba(0,0,0,.7);
}

/*--------------------Notifications------------------*/

.notes-style {
	padding: 10px 20px;
	margin: 15px;
	border-radius: 5px;
	box-shadow: 0 0 10px #666;
	color: #ddd;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
	text-align: center;
}

.notes-style.my-error {
	background-color: rgba(220, 65, 78, 0.6);
	border: 2px solid rgba(149, 29, 43, 1.0);
}
.notes-style.my-info {
	background-color: rgba(120, 195, 251, 0.6);
	border: 2px solid rgba(6, 108, 177, 1.0);
}
.notes-style.my-success {
	background-color: rgba(60, 196, 112, 0.6);
	border: 2px solid rgba(18, 109, 50, 1.0);
}


</style>
