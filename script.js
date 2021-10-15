let mainBtn = document.getElementById('get-pokemon');

mainBtn.addEventListener('click', () => {
    getPokemon(userInput.value);
    userInput.value = "";
    document.getElementById('error-cont').setAttribute('style', 'display: none;');
})

let url = 'https://pokeapi.co/api/v2/pokemon/';
let urlEvo = 'https://pokeapi.co/api/v2/pokemon-species/';
let userInput = document.getElementById('pokemon-search');
async function getPokemon(searchTerm) {
    const response = await fetch(`${url}${searchTerm.toLowerCase()}`);
    if (response.status != 200) {
        // display error element 
        document.getElementById('error-cont').setAttribute('style', 'display: flex;');
    } else {
        const data = await response.json();
        console.log(data);
        // display the avatar of the pokemon
        document.querySelector('div.card-left img').setAttribute('src', data.sprites.front_default);
        // display the name
        document.getElementById('card-pokemon-name').textContent = data.name.toUpperCase();
        // display the id number
        document.getElementById('card-pokemon-id').textContent = `ID: ${data.id}`;
        // display 4 random moves or as many as he/she has if it has less then 4
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
            document.getElementById('move4').textContent = 'x';

        } else if (data.moves.length == 2) {
            document.getElementById('move1').textContent = data.moves[0].move.name;
            document.getElementById('move2').textContent = data.moves[1].move.name;
            document.getElementById('move3').textContent = 'x';
            document.getElementById('move4').textContent = 'x';

        } else if (data.moves.length == 1) {
            document.getElementById('move1').textContent = data.moves[0].move.name;
            document.getElementById('move2').textContent = 'x';
            document.getElementById('move3').textContent = 'x';
            document.getElementById('move4').textContent = 'x';

        } else {
            document.getElementById('move1').textContent = 'This pokemon has no moves';
            document.getElementById('move2').textContent = 'x';
            document.getElementById('move3').textContent = 'x';
            document.getElementById('move4').textContent = 'x';
        }

        async function getPokemonEvo() {
            const response = await fetch(`${urlEvo}${data.id}/`);
            if (response.status != 200) {
                console.log('Invalid pokemon name or id');
            }
            const dataEvo = await response.json();

            if (dataEvo.evolves_from_species != null) {
                let prevEvoName = dataEvo.evolves_from_species.name;
                async function getPrevious() {
                    const r = await fetch(`${url}${prevEvoName}`);
                    const dataPrev = await r.json();
                    document.getElementById('previous-evo-avatar').setAttribute('src', dataPrev.sprites.front_default);
                    document.getElementById('prev-pokemon').textContent = prevEvoName.toUpperCase();
                }
                getPrevious();
            } else {
                document.getElementById('previous-evo-avatar').setAttribute('src', '');
                document.getElementById('prev-pokemon').textContent = 'No previous evolution found';
            }
        }
        getPokemonEvo();
    }


    // document.getElementById('evo-btn-prev').addEventListener('click', () => {
    //     getPokemon();
    // })
}
