
    let contador = 0;
    const pokemonListBody = document.getElementById("pokemon-list");
    const pokemonContainer = document.querySelector("pokemon-container")

    function fetchPokemonList() {
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then((res) => res.json())
        .then((data) => {
            crearPokemon(data);
        });
    }

     function crearPokemon(pokemon){
        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;

        const h3 = document.createElement('h3');
         h3.textContent = pokemon.name;

        const div = document.createElement('div');
        div.appendChild(img);
        div.appendChild(h3);

        pokemonContainer.appendChild(div);


     }

     traerPokemon();


    document.getElementById("siguiente").addEventListener("click", () => {
        contador += 20;
        fetchPokemonList();
    });

    document.getElementById("atras").addEventListener("click", () => {
        if (contador >= 20) {
            contador -= 20;
            fetchPokemonList();
        }
    });
   

    pokemonListBody.addEventListener("click", event => {
        const row = event.target.closest("tr");
        if (row) {
            const pokemonId = parseInt(row.children[0].textContent);
            fetch(`${pokeapi}/${pokemonId}`)
                .then(response => response.json())
                .then(data => {
                    const pokemonInfo = `
                        <h2>${data.name}</h2>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <p>Height: ${data.height}</p>
                        <p>Weight: ${data.weight}</p>
                    `;
                    document.getElementById("pokemon-info").innerHTML = pokemonInfo;
                })
                .catch(error => console.error("Error al obtener la información del Pokemon:", error));
        }
    });



