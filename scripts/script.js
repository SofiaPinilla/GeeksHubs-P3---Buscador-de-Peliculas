const buscar = document.getElementById('buscar').addEventListener('keyup', getPeliculas) //aqui llamo al input, llamo al evento y ejecuto la función
let genres = []
    //enlace de las peliculas
const searchMovieURL = 'https://api.themoviedb.org/3/search/movie?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=es-ES&query='
    //enlace de los generos de las peliculas
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=en-US'
const form = document.getElementById('buscarForm') //aqui llamo al formulario

axios.get(genreURL) //axios de los generos
    .then(res => genres = res.data.genres)
    .catch(err => console.error(err))

//función para pintar las peliculas
const renderPeliculas = peliculas => {
    document.querySelector('.peliculas').innerHTML = '';
    peliculas.forEach(pelicula => {

        //codigo para sacar los generos
        const peliculaGenres = genres.filter(genre => pelicula.genre_ids.includes(genre.id))
            .map(genre => genre.name)
        let genresH3 = '';
        peliculaGenres.forEach(genre => genresH3 += `<h3 class="genre"> ${genre} </h3>`);
        console.log(genresH3);
        console.log(peliculaGenres)
            //condicional para evitar que me salga la imagen si es null
        const imagen = pelicula.poster_path ? `<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${pelicula.poster_path}"/>` : ''
            //llamo a peliculas para que me pinte los datos
        document.querySelector('.peliculas').innerHTML += `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h1>${pelicula.original_title}</h1>
                <div class="genres">
                   <h5> ${peliculaGenres}</h5>
                </div>
                <button onClick="verDescription(event,'${pelicula.overview}')" class="btn btn-secondary"> Ver descripción</button>
                <div class="descripcion">
                </div>
                <div class="card-img-top">
                ${imagen}
                </div>
                </div>   
            </div>
    `
    })
}

//función para que funcione el boton de buscar peliculas
form.addEventListener('submit', event => {
    event.preventDefault();
    const busqueda = event.target.buscar.value
    axios.get(searchMovieURL + busqueda)
        .then(res => {
            const peliculas = res.data.results;
            renderPeliculas(peliculas)
        })
})


//funcion para buscar las peliculas dando a intro
function getPeliculas(event) {
    if (event.key === 'Enter') {
        const busqueda = event.target.value
        axios.get(searchMovieURL + busqueda)
            .then(res => {
                const peliculas = res.data.results;
                renderPeliculas(peliculas)
            })
            .catch(err => console.error(err))
    }
};


//funcion para poder ver la descripción
function verDescription(event, descripcion) {
    console.log(event.target.nextElementSibling)
    event.target.nextElementSibling.innerHTML = descripcion
}