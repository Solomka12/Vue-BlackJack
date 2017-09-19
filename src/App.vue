<template>
	<div id="app">
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
				loading: true,
				history: [],
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

	/*-------------------- Cards Styling ------------------*/

.diamonds {
	background-image: url('./assets/diamonds.png');
}
.clubs {
	background-image: url('./assets/clubs.png');
}
.hearts {
	background-image: url('./assets/hearts.png');
}
.spades {
	background-image: url('./assets/spades.png');
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


	/*--------------------Notifications------------------*/

	.notes-style {
		padding: 10px 20px;
		margin: 15px;
		background-color: rgba(30, 30, 30, 0.4);
		box-shadow: 0 0 6px #666;
		color: #ddd;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
		text-align: center;
	}

	.notes-style.my-error {
		/*background-color: rgba(220, 65, 78, 0.6);*/
		border-left: 4px solid rgba(233, 12, 15, 1.0);
	}
	.notes-style.my-info {
		/*background-color: rgba(120, 195, 251, 0.6);*/
		border-left: 4px solid rgba(6, 128, 208, 1.0);
	}
	.notes-style.my-success {
		/*background-color: rgba(60, 196, 112, 0.6);*/
		border-left: 4px solid rgba(18, 191, 50, 1.0);
	}

	/*--------------------PreLoader------------------*/

/*	.preloader {
		width: 100px;
		height: 100px;
		margin: 30% auto;
		background-color: #333;

		border-radius: 100%;  
		-webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
		animation: sk-scaleout 1.0s infinite ease-in-out;
	}

	@-webkit-keyframes sk-scaleout {
		0% { -webkit-transform: scale(0) }
		100% {
			-webkit-transform: scale(1.0);
			opacity: 0;
		}
	}

	@keyframes sk-scaleout {
		0% { 
			-webkit-transform: scale(0);
			transform: scale(0);
			} 100% {
				-webkit-transform: scale(1.0);
				transform: scale(1.0);
				opacity: 0;
			}
		}
*/
		</style>
