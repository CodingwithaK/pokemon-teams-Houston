const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(res => res.json())
.then(trainerCards => renderCards(trainerCards))


function renderCards(trainers)
{
    trainers.forEach(trainer => { 
        //name
        let innerText = trainer.name 
        
        //trainercard
        const trainerCard = document.createElement("div")
        trainerCard.className = "card"
        
        //trainer tags
        let trainerNameTag = document.createElement("p")
        trainerNameTag.innerText = trainer.name
        trainerCard.append(trainerNameTag)
        
        // add pokemon button
        let addPokemonButton = document.createElement("button")
        addPokemonButton.innerText = "Add a Pokemon"
        addPokemonButton.addEventListener("click",()=> {fetch(POKEMONS_URL, 
        {
        
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"trainer_id":trainer.id})
        })
        .then(res=> res.json())
        .then(data => pokemonRender(data))
        })
        trainerCard.append(addPokemonButton)
        
        //pokemon
        pokemonsRender()
        //append to the html
        const mainTag = document.querySelector("main")
        mainTag.append(trainerCard)
        
        
        function pokemonRender(pokemon)
        {

            let  pokemonTag = document.createElement("li")
            pokemonTag.innerText =  pokemon.nickname + "(" + pokemon.species + ")" 
            trainerCard.append(pokemonTag)
            let releasePokemonButton = document.createElement("button")
            releasePokemonButton.className = "release"
            releasePokemonButton.innerText = "Release Pokemon"
            releasePokemonButton.addEventListener("click", () => {fetch(POKEMONS_URL + "/"+pokemon.id, {
                    method: "DELETE",
                    
                })
                pokemonTag.remove()
            }
            )
                pokemonTag.append(releasePokemonButton)
        }
        
        function pokemonsRender (pokemon){
        trainer.pokemons.forEach(pocketMon => { 
            pokemonRender(pocketMon)
            
        })
}
        
    })
}
