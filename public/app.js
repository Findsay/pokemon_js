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
  displayPokemon(pokemondetails);

}

var loadAllPokemon = function(){
  var url = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  makeRequest(url, requestComplete);
}

function loadAPokemonsDetail(pokemonName){
  var url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
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

function displayPokemon(pokemonDetails){
  var pPokemonName = createNewParagraph(pokemonDetails.id);
  var mainDiv = document.getElementById('pokemon');
  appendChild(mainDiv, pPokemonName);
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

  var mainSelect = document.getElementById('select-pokemon');
  mainSelect.addEventListener('change', function(){
    var name = this.value
    loadAPokemonsDetail(name);

  })









}

window.addEventListener('load', app);
