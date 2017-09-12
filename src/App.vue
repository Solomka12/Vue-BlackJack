<template>
	<div id="app">
<!-- 		<side-nav>
			<div>First Text</div>
		</side-nav> -->
<!-- 		<modal name="dialog">
			Enter your name
		</modal> -->
		<v-dialog name="dialog" adaptive="true" clickToClose="false" draggable="true" />

		<notifications group="note-place" position="bottom center" classes="notes-style"/>
		<playing-field></playing-field>

	</div>
</template>

<script>
	import playingField from './components/playingField.vue';
	import sideHistoryLog from './components/sideHistoryLog.vue';
	

	export default {
		components: {
			'playing-field': playingField,
			'side-history-log': sideHistoryLog,
			// "side-nav": require("vue-side-nav")
		},

		name: 'app',
		data () {
			return {
				
			}
		},
		methods: {

		},
	}
</script>

<style>

	[v-cloak] { display: none; }

	body {
		background: linear-gradient(141deg, #1b9bc1, #11bd72, #0d96bf);
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

	.btn[disabled] {
		color: #ccc;
		background: rgba(70,70,70,0.2);
		border: 2px solid rgba(70,70,70,0.6);
	}

	.btn[disabled]:hover {
		color: #ccc;
		background: rgba(70,70,70,0.2);
		border: 2px solid rgba(70,70,70,0.6);
		box-shadow: inset 0 0 6px #666;
	}

	#app {
		display: flex;
		align-content: stretch;
		align-items: stretch;
		height: 100vh;
		padding: 20px;
		box-sizing: border-box;
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

	.history-block {
		max-width: 300px;
		border: 2px solid rgba(0,0,0,0.06);
		padding: 10px;
		border-radius: 10px;
		flex: 0 0 300px;
		overflow-x: hidden; /* Hide horizontal scrollbar */
		overflow-y: auto;
		z-index: 100;

		/*border-right: 3px solid rgba(60,240,80,0.3);*/
	}

	.history-header {
		text-align: center;
		text-transform: uppercase;
		font-weight: bold;
		margin: 5px 0 10px 0;
		color: #eee;
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
	background: rgba(36, 218, 126, 0.7);;
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

.playing-card:hover {
	transform: scale(1.04, 1.04);
	box-shadow: 0px 8px 3px 0px rgba(0,0,0,0.3);
}
.diamonds {
	background-image: url('assets/diamonds.png');
}
.clubs {
	background-image: url('assets/clubs.png');
}
.hearts {
	background-image: url('assets/hearts.png');
}
.spades {
	background-image: url('assets/spades.png');
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

/*-----------Стилизация сайдбара истории----------*/

.history-item {
	display: flex;
	flex-wrap: wrap;
	background-color: rgba(0, 0, 0, 0.1);
	border: 2px solid rgba(50,234,140,0.8);
	border-radius: 10px;
	box-shadow: inset 0 0 8px #000;
	padding: 10px;
	color: #ddd;
	margin-bottom: 5px;
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

.history-item .mini-card {
	display: inline-block;
	background-color: rgba(230, 230, 230, 1);
	border: 0px solid rgba(0, 0, 0, 1);
	border-radius: 20%;
	box-shadow: 0 0 3px #666;
	padding: 1px 2px;
}

.history-dealer-info {
	text-align: right;
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

/*------------------------------------------------*/

.v--modal-overlay {
  background: rgba(0,0,0,.7);
}

@media (max-width: 700px) {
	.history-block {
		display: none;
		position: absolute;
		left: -20%;
		width: 100%;
	}

	.playing-field {
		margin-left: 0;
	}

/*	.playing-card {
		transform: scale(0.8);
	}
	.playing-card:hover {
		transform: scale(0.85, 0.85);
	}*/
}

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


</style>
