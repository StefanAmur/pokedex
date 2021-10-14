let mainBtn = document.getElementById('get-pokemon');

mainBtn.addEventListener('click', () => {
    getPokemon();
    userInput.value = "";
})

let url = 'https://pokeapi.co/api/v2/pokemon/';
let userInput = document.getElementById('pokemon-search');
async function getPokemon() {
    const response = await fetch(`${url}${userInput.value}`);
    if (response.status != 200) {
        console.log('Invalid pokemon name or id');
    }
    const data = await response.json();
    console.log(data);
    // display the avatar of the pokemon
    document.querySelector('div.card-left img').setAttribute('src', data.sprites.front_default);
    // display the name
    document.getElementById('card-pokemon-name').textContent = data.name.toUpperCase();
    // display the id number
    document.getElementById('card-pokemon-id').textContent = `ID: ${data.id}`;
    // display 4 random moves or as many as he has if it has less than 4
    if (data.moves.length >= 4) {
        // make an array that will contain 4 random id numbers from the entire moves array
        let arr = [];
        while (arr.length < 4) {
            let r = Math.floor(Math.random() * data.moves.length) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        document.getElementById('move1').textContent = data.moves[arr[0]].move.name;
        document.getElementById('move2').textContent = data.moves[arr[1]].move.name;
        document.getElementById('move3').textContent = data.moves[arr[2]].move.name;
        document.getElementById('move4').textContent = data.moves[arr[3]].move.name;

    } else if (data.moves.length == 3) {
        document.getElementById('move1').textContent = data.moves[0].move.name;
        document.getElementById('move2').textContent = data.moves[1].move.name;
        document.getElementById('move3').textContent = data.moves[2].move.name;

    } else if (data.moves.length == 2) {
        document.getElementById('move1').textContent = data.moves[0].move.name;
        document.getElementById('move2').textContent = data.moves[1].move.name;

    } else if (data.moves.length == 1) {
        document.getElementById('move1').textContent = data.moves[0].move.name;

    } else {
        document.getElementById('move1').textContent = 'This pokemon has no moves';
    }
}