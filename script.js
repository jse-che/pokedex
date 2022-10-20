const namepokemon = document.querySelector('.nome-pokemon')
const numpokemon = document.querySelector('.numero-pokemon')
const gifpokemon = document.querySelector('.pokemon-image')
const typokemon = document.querySelector('.type-pokemon')
const form = document.querySelector('.form')
const input_search= document.querySelector('.input_search')
const button_prev = document.querySelector('.button_prev')
const button_prox = document.querySelector('.button_nxt')

let searchPokemon = 1;

const prcPokemon = async(pokemon) => {
    const APIresponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if(APIresponse.status == 200){
        const dados = await APIresponse.json()
        return dados;
    }
}

const renderPokemon = async(pokemon) => {
    namepokemon.innerHTML = 'Searching...'
    numpokemon.innerHTML = ''
    typokemon.innerHTML= ''

    const dados = await prcPokemon(pokemon);

    if(dados){
        gifpokemon.style.display = 'block'
        namepokemon.innerHTML = dados.name;
        numpokemon.innerHTML = dados.id;
        typokemon.innerHTML = 
        dados.types.map(typeInfo => typeInfo.type.name)
        gifpokemon.src = dados['sprites']['front_default']

        input_search.value = '';
        searchPokemon = dados.id;
    }

    else{
        gifpokemon.style.display = 'none'
        namepokemon.innerHTML = 'Not found :('
        numpokemon.innerHTML = '';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input_search.value.toLowerCase());
})

button_prev.addEventListener('click', (event)=> {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
})

button_prox.addEventListener('click', (event)=> {
        searchPokemon += 1;
        renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)



