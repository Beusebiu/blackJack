// BLACK  JACK

// Cards
let colors = ["Inima", "Frunza", "Romb", "Trefla"];
let values = ["As", "Doi", "Trei", "Patru",
			"Cinci", "Sase", "Sapte", "Opt", "Noua",
			"Zece", "Jalet", "Dama", "Popa"];

//DOM Variables
let startGame = document.getElementById("start-game"),
 	hitGame = document.getElementById("hit-game"),
	stayGame = document.getElementById("stay-game"),
	stats = document.getElementById("stats");

// Game variables
let gameStarted = false,
	gameOver = false,
	playerWon = false,
	dealerCards = [],
	playerCards = [],
	dealerScore = 0,
	playerScore = 0,
	deck = [];

	hitGame.style.display = 'none';
	stayGame.style.display = 'none';
	showStatus();

startGame.addEventListener('click', function(){
	gameStarted = true;
	gameOver = false;
	playerWon = false;

	deck = createDeck();
	shuffleDeck(deck);
	playerCards = [getNextCard(),getNextCard()];
	dealerCards = [getNextCard(),getNextCard()];

	startGame.style.display = 'none';
	hitGame.style.display = 'inline';
	stayGame.style.display = 'inline';
	showStatus();
})

hitGame.addEventListener('click', function(){
	playerCards.push(getNextCard());
	checkForEndOfGame();
	showStatus();
});

stayGame.addEventListener('click', function(){
	gameOver = true;
	checkForEndOfGame();
	showStatus();
});

function createDeck(){
	let i,j;
	for(i = 0; i < colors.length; i++){
		for(j = 0; j < values.length; j++){
			let card = {
				color: colors[i],
				value: values[j]
			}
			deck.push(card);
		}
	}
	return deck;
}

function getCardString(card){
		return card.value + ' de ' + card.color;
}

function showStatus(){
	if(!gameStarted){
		stats.innerHTML = 'Welcome Bitch!';
		return;
	}

	let dealerCardString ='';
	for(let i = 0; i < dealerCards.length; i++){
		dealerCardString += getCardString(dealerCards[i]) + '<br>';
	}

	let playerCardString ='';
	for(let i = 0; i < playerCards.length; i++){
		playerCardString += getCardString(playerCards[i]) + '<br>';
	}

	uppdateScore();

	stats.innerHTML = 
		'Dealer has: <br>'+
		dealerCardString +
		'(score: '  + dealerScore + ')\n\n<br><br>' +

		'Player has: <br>\n'+
		playerCardString +
		'(score: ' + playerScore + ')\n\n<br>';

		if(gameOver){
			if(playerWon){
				stats.innerHTML += "<br>You won Bitch!";
			}
			else{
				stats.innerHTML += "<br>You lose sucker!";
			}
			startGame.style.display = 'inline';
			hitGame.style.display = 'none';
			stayGame.style.display = 'none';
			}
		}

function checkForEndOfGame(){
	uppdateScore();

	if(gameOver){
		while(dealerScore < playerScore
			&& playerScore <= 21
			&&dealerScore <= 21){
			dealerCards.push(getNextCard());
		uppdateScore();
		}
	}

	if(playerScore > 21){
		playerWon = false;
		gameOver = true;
	}
	else if(dealerScore > 21){
		playerWon = true;
		gameOver = true;
	}
	else if(gameOver){

		if(playerScore > dealerScore){
			playerWon =true;
		}
			else{
				playerWon = false;
			}

	}
}

function uppdateScore(){
	dealerScore = getScore(dealerCards);
	playerScore =getScore(playerCards);
}

function getScore(cardArray){
	let score = 0;
	let hasAs = false;
	for(let i = 0; i<cardArray.length; i++){
		let card = cardArray[i];
		score += getCardNumericValue(card);
		if(card.value === 'As'){
			hasAs = true;
		}
	}
	if(hasAs && score +10 <= 21){
		return score +10;
	}
	return score;
}

function getCardNumericValue(card){
	switch(card.value){
		case 'As':
			return 1;
		case 'Doi':
			return 2;
		case 'Trei':
			return 3;
		case 'Patru':
			return 4;
		case 'Cinci':
			return 5;
		case 'Sase':
			return 6;
		case 'Sapte':
			return 7;
		case 'Opt':
			return 8;
		case 'Noua':
			return 9;
		default:
			return 10;


	}
}

function shuffleDeck(deck){
	let i;
	for(i = 0; i < deck.length; i++)
	{
		let swapIdx = Math.trunc(Math.random() * deck.length);
		let tmp = deck[swapIdx];
		deck[swapIdx] = deck[i];
		deck[i] = tmp;
	}
}

function getNextCard(){
	return deck.shift();
}


// END BLACK JACK