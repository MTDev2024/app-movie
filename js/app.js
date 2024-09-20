let movieTitleRef = document.getElementById("movie-title");
let searchButton = document.getElementById("search-btn");
let result = document.getElementById("search-result");

let getTitle = () => {
    let movieTitle = movieTitleRef.value; 
    let url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=a8b32cce`; 

    // Si l'input est vide
    if (movieTitle.length <= 0) {
        result.innerHTML = `<h3 class="msg">Entrez un titre de film</h3>`;
    } else {
        fetch(url)
            .then((response) => response.json())
            .then((data) => { 

                // Si le film existe
                if (data.Response == "True") {
                    result.innerHTML = `
                                        <div class="info">
                                            <div>
                                                <h2>${data.Title}</h2>
                                                <div class="rating">
                                                <img src="./assets/star-icon.svg" alt="star">
                                                <h4>${data.imdbRating}</h4>
                                            </div>
                                            <div class="details">
                                            <span>${data.Rated}</span>
                                            <span>${data.Year}</span>
                                            <span>${data.Runtime}</span>
                                            </div>
                                            <div class="genre">
                                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                                            </div>
                                            <div class="content">
                                            <h3>Synopsis :</h3>
                                            <p>${data.Plot}</p>
                                            <h3>Casting :</h3>
                                            <p>${data.Actors}</p>
                                        </div>
                                        </div>
                                        <img src="${data.Poster}" class="poster">
                                        </div>`;
                }
                // Si le film n'existe pas
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Une erreur s'est produite</h3>`;
            });
    }
};

// Ajout d'un écouteur d'événement pour déclencher la recherche lors du clic
searchButton.addEventListener("click", getTitle);

window.addEventListener("load", getTitle);
