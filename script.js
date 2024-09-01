const nomePokemon = document.querySelector('.nomepokemon');
const idPokemon = document.querySelector('.idpokemon');
const fotoPokemon = document.querySelector('.fotopokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const botaoP = document.querySelector('.botao1');
const botaoA = document.querySelector('.botao2');

let procurarPokemon = 1;

const linkarAPI = async (pokemon) => {
    const APIlink = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIlink.status === 200) {
        const dados = await APIlink.json();
        return dados;
      }
    }

const pegarDados = async (pokemon) => {
    nomePokemon.innerHTML = 'Carregando..';
    idPokemon.innerHTML = '';
    const dados = await linkarAPI(pokemon);
    if (dados) {
        fotoPokemon.style.display = 'block';
        nomePokemon.innerHTML = dados.name;
        idPokemon.innerHTML = dados.id;
        fotoPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        procurarPokemon = dados.id;
    } else{
        fotoPokemon.style.display = 'none';
        nomePokemon.innerHTML = 'Não listado';
        idPokemon.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    pegarDados(input.value.toLowerCase());
});

botaoP.addEventListener('click', () => {
    if (procurarPokemon > 1) {
        procurarPokemon -= 1;
        pegarDados(procurarPokemon);
    }
});

botaoA.addEventListener('click', () => {
    procurarPokemon += 1;
    pegarDados(procurarPokemon);
});

pegarDados(procurarPokemon);
