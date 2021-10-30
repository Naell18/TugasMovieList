let container = document.getElementById("container")
let detail = document.getElementById("detail")

function fetchMovie(movie){
    fetch("http://www.omdbapi.com/?apikey=6be89917&s="+movie)
        .then(response=>response.json())
            .then(data=>movies(data))
}

let idData=[]

function movies(data){
    let title = data.Search[0].Title
    let year = data.Search[0].Year
    let image = data.Search[0].Poster
    idData.push(data.Search[0].imdbID)

    container.innerHTML += `
        <div class="card">
            <div class="card-body">
                <div class="poster">
                    <img src="${image}">
                </div>
                <h3 class="title">${title}</h3>
                <span class="year"><i class="fa fa-calendar"></i> ${year}</span>
                <button type="button" class="detail-btn">See Details</button>
            </div>
        </div>
    `
}

function baruNgambilDetail() {
    const detailButton=document.getElementsByClassName("detail-btn")

    for (let i=0; i<detailButton.length; i++) {
        detailButton[i].addEventListener("click", function() {
            fetch(`https://omdbapi.com/?apikey=6be89917&i=${idData[i]}`)
                .then(response => response.json())
                .then(data => showMovieDetail(data))
        })
    }
}

function showMovieDetail(data) {
    console.log(data)
    let director = data.Director
    let duid = data.BoxOffice
    let actors = data.Actors
    detail.innerHTML = `
        <h3>${director}</h3>
        <h3>${actors}</h3>
        <h3>${duid}</h3>
    `;
}

fetchMovie("Avatar")
fetchMovie("Shawshank Redemption")
fetchMovie("The Godfather")
fetchMovie("The Dark Knight")
fetchMovie("Inception")
fetchMovie("Spongebob")
fetchMovie("Endgame")
setTimeout(() => {
    baruNgambilDetail()
}, 3000)