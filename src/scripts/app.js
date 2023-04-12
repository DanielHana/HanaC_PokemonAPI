function FetchPokemon(pokemon) {
  return fetch(
    'https://pokeapi.co/api/v2/pokemon/' + pokemon + '?limit=649')
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}



function FetchLocation(id) {
  return fetch(
    'https://pokeapi.co/api/v2/pokemon/' + id + '/encounters' ) 
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}


function FetchEvolutionTree(id) {
  return fetch(
    'https://pokeapi.co/api/v2/evolution-chain/' + id)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

let searchText = document.getElementById("searchText");
let search = document.getElementById("search");
let pokemonInfo = document.getElementById("pokemonInfo");
let pokemonImg = document.getElementById("pokemonImg");
let randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", displayRandom);
search.addEventListener("click", displayPokemon);

async function displayRandom(){
  searchText.value = Math.floor(Math.random() * 649) + 1;
  displayPokemon();
}

async function displayPokemon() {
  let myPokemon = await FetchPokemon(searchText.value);
  // let evolutionTree = await FetchEvolutionTree(myPokemon.id);
  let location = await FetchLocation(myPokemon.id);


  let pokemonInfo1 = document.createElement("div");
  let pokemonInfo2 = document.createElement("div");
  let pokemonInfo3 = document.createElement("div");
  let pokemonInfo4 = document.createElement("div");
  let pokemonInfo5 = document.createElement("div");
  let pokemonInfo6 = document.createElement("div");

  let pokemonImg1 = document.createElement("img");
  let pokemonImg2 = document.createElement("img");

  pokemonInfo.innerHTML = '';
  pokemonImg.innerHTML = '';
  
  pokemonInfo1.innerHTML = "Abilities: "

  for(let i = 0; i < myPokemon.abilities.length; i++)
  {
    pokemonInfo1.innerHTML += myPokemon.abilities[i].ability.name;

    if(i < myPokemon.abilities.length - 1)
    {
      pokemonInfo1.innerHTML += ', ';
    }
  }

  pokemonInfo3.innerHTML = "Moves: "

  for(let i = 0; i < myPokemon.moves.length; i++)
  {
    pokemonInfo3.innerHTML += myPokemon.moves[i].move.name;

    if(i < myPokemon.moves.length - 1)
    {
      pokemonInfo3.innerHTML += ', ';
    }
  }

  pokemonInfo4.innerHTML = "Element Type: "

  for(let i = 0; i < myPokemon.types.length; i++)
  {
    pokemonInfo4.innerHTML +=  myPokemon.types[i].type.name;

    if(i < myPokemon.types.length - 1)
    {
      pokemonInfo4.innerHTML += ', ';
    }
  }

  pokemonInfo2.innerHTML = myPokemon.forms[0].name.toUpperCase();
  // pokemonInfo3.innerHTML = myPokemon.moves[0].move.name;
  if(location[0]) {
    pokemonInfo5.innerHTML = "Location: " + location[0].location_area.name;
  } else {
    pokemonInfo5.innerHTML = "Location: N/A";
  }
  // pokemonInfo.innerHTML = "Evolution :" + evolutionTree.

  pokemonImg1.src = myPokemon.sprites.front_default;
  pokemonImg2.src =myPokemon.sprites.front_shiny;

  pokemonInfo.appendChild(pokemonInfo2);
  pokemonInfo.appendChild(pokemonInfo1);
  pokemonInfo.appendChild(pokemonInfo4);
  pokemonInfo.appendChild(pokemonInfo5);
  pokemonInfo.appendChild(pokemonInfo3);

  pokemonImg.appendChild(pokemonImg1);
  pokemonImg.appendChild(pokemonImg2);
 

  
  console.log(myPokemon);
  // console.log(evolutionTree);
  console.log(location);
}