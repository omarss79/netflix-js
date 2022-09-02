let itemPrincipal = 75174;
// let movies = [];
let movies = [];

document.body.onload = async function() {    
    let token = localStorage.getItem('tmbd_user_token');
    if(token == "" || token == undefined) location.href = 'login.html';

    getItemPrincipal();
    let listTopRated = await getListTopRated();
    movies = listTopRated;
    console.log(movies);


    const slider = document.querySelector(".slider");
    const btnLeft = document.getElementById("moveLeft");
    const btnRight = document.getElementById("moveRight");
    const indicators = document.querySelectorAll(".indicator");

    let baseSliderWidth = slider.offsetWidth;
    let activeIndex = 0; // the current page on the slider

    
    // Fill the slider with all the movies in the "movies" array
    function populateSlider() {
        // console.log(movies);
        movies.forEach((movie) => {
            // Clone the initial movie thats included in the html, then replace the image with a different one
            const newMovie = document.getElementById("movie0");
            // ✅ Remove ID attribute
            // newMovie.removeAttribute('id');

            // ✅ Or set the attribute to another value
            // box.setAttribute('id', 'another-id');
            let clone = newMovie.cloneNode(true);
            let img = clone.querySelector("img");
            let src = API_IMAGE_500 + movie.backdrop_path;
            img.src = src;

            let title = clone.querySelector(".movie__title");
            title.innerHTML = movie.title;
            
            let desc = clone.querySelector(".description__match");
            desc.innerHTML = movie.vote_average;
            
            let date = clone.querySelector(".description__length");
            date.innerHTML = movie.release_date;

            let raiting = clone.querySelector(".description__rating");
            let familiar = "";
            if(movie.adult == true) familiar = "Adultos";
            else familiar = "Familiar";
            
            raiting.innerHTML = familiar;

            console.log("id1: " + movie.id);
            clone.addEventListener('click', (e) => {
                location.href = 'single.html?movie_id='+movie.id;
                console.log("id2: " + movie.id);
            })


            slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1]);
        });
    }

    populateSlider();

    // delete the initial movie in the html
    const initialMovie = document.getElementById("movie0");
    initialMovie.remove();

    // Update the indicators that show which page we're currently on
    function updateIndicators(index) {
        indicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });
        let newActiveIndicator = indicators[index];
        newActiveIndicator.classList.add("active");
    }

    // Scroll Left button
    btnLeft.addEventListener("click", (e) => {
        let movieWidth = document.querySelector(".movie").getBoundingClientRect()
            .width;
        let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

        slider.scrollBy({
            top: 0,
            left: -scrollDistance,
            behavior: "smooth",
        });
        activeIndex = (activeIndex - 1) % 3;
        console.log(activeIndex);
        updateIndicators(activeIndex);
    });

    // Scroll Right button
    btnRight.addEventListener("click", (e) => {
        let movieWidth = document.querySelector(".movie").getBoundingClientRect()
            .width;
        let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

        console.log(`movieWidth = ${movieWidth}`);
        console.log(`scrolling right ${scrollDistance}`);

        // if we're on the last page
        if (activeIndex == 2) {
            // duplicate all the items in the slider (this is how we make 'looping' slider)
            populateSlider();
            slider.scrollBy({
            top: 0,
            left: +scrollDistance,
            behavior: "smooth",
            });
            activeIndex = 0;
            updateIndicators(activeIndex);
        } else {
            slider.scrollBy({
            top: 0,
            left: +scrollDistance,
            behavior: "smooth",
            });
            activeIndex = (activeIndex + 1) % 3;
            console.log(activeIndex);
            updateIndicators(activeIndex);
        }
    });

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

async function getTopRatedTMDB() {
    try {        
        let url = API_URL+'/3/movie/popular?api_key='+API_KEY+'&language=en-US&page=1';
        // let url = API_URL+'/3/movie/top_rated?api_key='+API_KEY+'&language=en-US&page=1';
        const response = await axios.get(url);
        if (response) { 
            return response.data.results;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}


let masInfoPrincipal = document.getElementById('masInfoPrincipal');
masInfoPrincipal.addEventListener('click', (e) => {
    location.href = 'single.html?movie_id='+itemPrincipal;
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtnLogout");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Get the button that opens the modal
var btnCerrarSesion = document.getElementById("cerrarSesion");
btnCerrarSesion.onclick = function() {
    localStorage.removeItem('tmbd_user_token');
    console.log("Cerro sesion");
    modal.style.display = "none";
    location.href = 'login.html';
}
