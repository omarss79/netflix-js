document.body.onload = function() {
    
    let token = localStorage.getItem('tmbd_user_token');
    console.log(token);
    if(token == "" || token == undefined) location.href = 'login.html';
    
    let movie = getUrl();
    getItemSingle(movie);
}

function getUrl(){
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let movie = urlParams.get('movie_id');
    return movie;
}

async function getItemSingle(movie){
    // Item Principal
    let moviePrincipal = await getItemSingleTMDB(movie);
    console.log(moviePrincipal);
    // Update page
    document.getElementById("titlePrincipal").innerHTML = moviePrincipal.title;
    // document.getElementById("imagePrincipal").src = API_IMAGE_ORIGINAL + moviePrincipal.backdrop_path;
    let urlImagePrincipal = API_IMAGE_ORIGINAL + moviePrincipal.backdrop_path;
    document.getElementById("seccionPrincipal").style.backgroundImage = "url('"+urlImagePrincipal+"')";

    // Details
    document.getElementById("sinopsisPrincipal").innerHTML = moviePrincipal.overview;
    let generos = moviePrincipal.genres;
    let generosTxt = "";
    generos.forEach(element => {
        generosTxt += element.name + ' ';
    });
    document.getElementById("generoPrincipal").innerHTML = generosTxt;
    let date = moviePrincipal.release_date
    date = date.substring(0, 4);
    document.getElementById("datePrincipal").innerHTML = date;
}

async function getItemSingleTMDB(movie) {
    try {
        // get data
        let url = API_URL+'/3/movie/'+movie+'?api_key='+API_KEY+'&language=en-US';
        let result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.log(error);
        console.log("Error al acceder a la API");
        return false;
    }
}