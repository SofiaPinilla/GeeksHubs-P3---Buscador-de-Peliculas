const inicio = document.getElementById('inicio')
const inicioJ = document.getElementById('inicioJavi')
const buscar = document.getElementById('buscar').addEventListener('keyup', getPeliculas)

const URL = 'https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query='
btn.addEventListener('click', getPeliculas)
inicioJ.addEventListener('click', verInicio)

function verInicio() {
    inicio.className += 'visible';
}

function getPeliculas(event) {
    if (event.key === 'Enter') {
        const busqueda = event.target.value
        document.getElementById('btn')
        axios.get(URL + busqueda)
            .then(res => {
                const peliculas = res.data.results;
                document.querySelector('.peliculas').innerHTML = '';
                peliculas.forEach(pelicula => {
                    document.querySelector('.peliculas').innerHTML += `<h1>${pelicula.original_title}</h1><h2>${pelicula.genre_ids}</h2><p>${pelicula.overview}</p><img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${pelicula.poster_path}"/>
            `
                });
            })
    }
};