var input = document.querySelector("input");
var buttonSearch = document.getElementById("button-search");
var msgNone = document.querySelector(".msg-none-div");
var main = document.querySelector(".main");
var inputDiv = document.querySelector(".search-div");

var listaFilmesDisplay = document.querySelector(".film-list");

async function fetchApi(filmSearch) {
  let conexao = await fetch(
    `http://www.omdbapi.com/?s=${filmSearch}&apikey=fb3ff91b`
  );
  let conexaoConvertida = await conexao.json();

  if (conexaoConvertida.Response == "True")
    criaTemplate(conexaoConvertida.Search);

  let filmes = document.querySelectorAll(".film-item");
  filmes.forEach((filme) => {
    filme.addEventListener("click", async () => {
      listaFilmesDisplay.classList.add("inv");
      inputDiv.classList.add("inv");
      criaTemplateFocado(filme);
    });
  });
}

function criaTemplate(filmes) {
  listaFilmesDisplay.innerHTML = "";
  for (let idx = 0; idx < filmes.length; idx++) {
    const filme = filmes[idx];

    let filmeItemDisplay = document.createElement("div");
    filmeItemDisplay.classList.add("film-item");
    filmeItemDisplay.dataset.id = filme.imdbID;
    if (filme.Poster == "N/A") {
      filmePoster = "No_Image_Available.jpg";
    } else {
      filmePoster = filme.Poster;
    }
    filmeItemDisplay.innerHTML = `
    <img
      class="poster-filme"
      src=${filmePoster}
      alt="Film Poster"
    />
    <div>
      <h2 class="title-film">${filme.Title}</h2>
      <p class="isfilm">${filme.Type}</p>
    </div>
`;
    listaFilmesDisplay.appendChild(filmeItemDisplay);
  }
}

async function criaTemplateFocado(filme) {
  let conexao = await fetch(
    `http://www.omdbapi.com/?i=${filme.dataset.id}&apikey=fb3ff91b`
  );
  let conexaoConvertida = await conexao.json();
  console.log(conexaoConvertida);
  let filmeItemDisplayFocado = document.createElement("article");
  filmeItemDisplayFocado.classList.add("focus-film");
  if (conexaoConvertida.Poster == "N/A") {
    filmePoster = "No_Image_Available.jpg";
  } else {
    filmePoster = conexaoConvertida.Poster;
  }

  filmeItemDisplayFocado.innerHTML = `
  <div><button class="back-button" onclick="clicaVolta()"><i class="fa-solid fa-arrow-left"></i></button></div>
  <div class="flex">
        <img
          src="${filmePoster}"
          class="poster-filme"
          alt="Poster"
        />
        <div class="infos-film">
          <div class="title--info">
            <h2 class="title-film">${conexaoConvertida.Title}</h2>
            <div class="types">
              <p class="isfilm">${conexaoConvertida.Type}</p>
              <p class="year">${conexaoConvertida.Year}</p>
              <p class="runtime">${conexaoConvertida.Runtime}</p>
            </div>
          </div>
          <div class="genre--info">
            <p class="genre"><span>Genre: </span>${conexaoConvertida.Genre}</p>
            <p class="director"><span>Director: </span>${conexaoConvertida.Director}</p>
            <p class="writter">
              <span>Writer: </span>${conexaoConvertida.Writer}
            </p>
            <p class="actors">
              <span>Actors: </span>${conexaoConvertida.Actors}
            </p>
          </div>
          <div class="plot--info">
            <p class="plot">
              <span>Plot: </span>${conexaoConvertida.Plot}
            </p>
            <p class="awards">
              <i class="fa-solid fa-trophy"></i>
              ${conexaoConvertida.Awards}
            </p>
          </div>
        </div>
        </div>
`;

  main.appendChild(filmeItemDisplayFocado);
}

async function clicaVolta() {
  main.lastChild.remove();
  listaFilmesDisplay.classList.toggle("inv");
  inputDiv.classList.toggle("inv");
}

buttonSearch.addEventListener("click", () => {
  fetchApi(input.value.trim());
});
