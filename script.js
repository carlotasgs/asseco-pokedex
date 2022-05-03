"use strict";

let pokemonJson = [];

const pokemons = async function () {
  try {
    const poke = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    if (!poke.ok) throw new Error("Problem getting location poke");
    const pokeJson = await poke.json();
    pokemonJson = pokeJson.results;
    renderPokemon(pokeJson.results);
  } catch (err) {
    console.log(`${err.message}`);
    throw err;
  }
};

pokemons();

const pokemonsConteiner = document.querySelector(".grid-container");

const renderPokemon = async function (pokeJson, className = "") {
  for (let pokemon of pokeJson) {
    const rest = await fetch(`${pokemon.url}`);
    const restJson = await rest.json();
    const html = `
      <div id="di-pokemons" class="grid-item">
        <div id="name">${
          pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
        }</>
        <br/>
        <img id="image" src="${restJson.sprites.front_default}">
      </div>
    `;
    pokemonsConteiner.insertAdjacentHTML("beforeend", html);
  }
};

function mySearchFunction() {
  let input = document.getElementById("myInput");
  let filter = input.value.toLowerCase();
  let grid = document.querySelector(".grid-container");
  let items = grid.getElementsByClassName("grid-item");

  for (let poke in pokemonJson) {
    if (pokemonJson[poke].name.indexOf(filter) > -1) {
      items[poke].style.display = "";
    } else {
      items[poke].style.display = "none";
    }
  }
}

//const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
