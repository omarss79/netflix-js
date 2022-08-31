let itemPrincipal = 75174;
let movies = [];


document.body.onload = function() {
    getItemPrincipal();
    let listTopRated = getListTopRated();
    console.log(listTopRated.results);
}

async function getItemPrincipal(){
    // Item Principal
    let moviePrincipal = await getItemPrincipalTMDB(itemPrincipal);
    // Update page
    document.getElementById("titlePrincipal").innerHTML = moviePrincipal.title;
    document.getElementById("imagePrincipal").src = API_IMAGE_ORIGINAL + moviePrincipal.backdrop_path;
    let urlImagePrincipal = API_IMAGE_ORIGINAL + moviePrincipal.backdrop_path;
    document.getElementById("seccionPrincipal").style.backgroundImage = "url('"+urlImagePrincipal+"')";
}

async function getItemPrincipalTMDB(movie_id) {
    try {
        // get data
        let url = API_URL+'/3/movie/'+movie_id+'?api_key='+API_KEY+'&language=en-US';
        let result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.log(error);
        console.log("Error al acceder a la API");
        return false;
    }
}



async function getListTopRated(){
    // Listado Top Rated
    let movieTopRated = await getTopRatedTMDB();
    return movieTopRated;
}

async function getTopRatedTMDB(movie_id) {
    try {        
        let url = API_URL+'/3/movie/top_rated?api_key='+API_KEY+'&language=en-US&page=1';
        const response = await axios.get(url);
        if (response) { 
            return response.data;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}








// async function getListTopRated(){
//     // Item Principal
//     let moviePrincipal = await getListTopRatedTMDB();
//     //     return movieTopRated;
// }

// async function getListTopRatedTMDB() {
//     try {
//         let url = API_URL+'/3/movie/top_rated?api_key='+API_KEY+'&language=en-US&page=1';
//         let response = await axios.get(url);
//         return response.data.results;
//     } catch (error) {
//         console.log(error);
//         console.log("Error al acceder a la API");
//         return false;
//     }
// }


// async function getListTopRated(){
//     // Item Principal
//     let movieTopRated = await getListTopRatedTMDB();
//     return movieTopRated;
// }

// async function getListTopRatedTMDB() {
//         let url = API_URL+'/3/movie/top_rated?api_key='+API_KEY+'&language=en-US&page=1';
//         return axios.get(url).then(response => response.data.results)
// }

// let masInfoPrincipal = document.getElementById('masInfoPrincipal');
// masInfoPrincipal.addEventListener('click', (e) => {
//     location.href = 'single.html?movie_id='+itemPrincipal;
// })
