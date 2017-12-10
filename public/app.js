var pokemon;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  pokemon = JSON.parse(jsonString);
  saveAllPokemon();
  forEachPokemon(pokemon.results, displayAllPokemon);


};

var onePokemonRequestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  pokemondetails = JSON.parse(jsonString);
}

var loadAllPokemon = function(){
  var url = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  makeRequest(url, requestComplete);
}

function loadAPokemonsDetail(pokemon){
  var name = pokemon.name;
  var url = `https://pokeapi.co/api/v2/pokemon/${name}/?limit=150`;
  makeRequest(url, onePokemonRequestComplete);
}

function forEachPokemon(array, callback){
  array.forEach(function(pokemon){
    callback(pokemon);
  })
};

function createNewParagraph(text){
  var newP = document.createElement('p');
  newP.innerText = text;
  return newP;
}

function createDiv(){
  var newDiv = document.createElement('div');
  return newDiv;
}

function createHeader(type, text){
  var newHeader = document.createElement(type);
  newHeader.innerText = text;
  return newHeader;
}

function createOption(text){
  var newOption = document.createElement('option');
  newOption.innerText = text;
  return newOption;
}

function appendChild(parent, child){
  parent.appendChild(child);
}

function displayPokemon(pokemon){
  var mainDiv = document.getElementById('pokemon');
  var div = createDiv();
  var hPokemonName = createHeader("h4", pokemon.name);

  appendChild(mainDiv, div);
  appendChild(div, hPokemonName);
}

function popualteSelect(pokemon){
  var mainSelect = document.getElementById('select-pokemon');
  var newOpt = createOption(pokemon.name);
  appendChild(mainSelect, newOpt);
}

function saveAllPokemon(){
  var jsonString = JSON.stringify(pokemon);
  localStorage.setItem('allPokemon', jsonString);
}

function getAllPokemonFromStorage(){
  var jsonString = localStorage.getItem('allPokemon');
  return JSON.parse(jsonString);
}

var app = function(){


  // loadAllPokemon();
  pokemon = getAllPokemonFromStorage();
  forEachPokemon(pokemon.results, popualteSelect);


  // loadAPokemonsDetail(pokemon.results[0])







}

window.addEventListener('load', app);
