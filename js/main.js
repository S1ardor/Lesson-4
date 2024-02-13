const elResult = document.querySelector(".js-movies-result");
const elTemplate = document.querySelector(".js-template").content;
const elModal = document.querySelector(".modal");
const movieInformation = movies.slice(0, 100);

// movies data ni render qilish dom ga
function moviesData(array, node) {
  const docFrg = document.createDocumentFragment();
  array.forEach((movie) => {
    const moviesClone = elTemplate.cloneNode(true);
    moviesClone.querySelector(
      ".js-img"
    ).src = `https://img.youtube.com/vi/${movie.ytid}/0.jpg`;
    moviesClone.querySelector(".js-movies-title").textContent =
      movie.Title.toString().split(" ").length > 2
        ? movie.Title.toString().split(" ").slice(0, 2).join("")
        : movie.Title;
    moviesClone.querySelector(".js-movies-rating").textContent =
      movie.imdb_rating;
    moviesClone.querySelector(".js-movies-time").textContent = movie.movie_year;
    moviesClone.querySelector(".js-movies-year").textContent = `${Math.round(
      movie.runtime / 60
    )} h ${movie.runtime % 60} m`;
    moviesClone.querySelector(".js-movies-categories").textContent =
      movie.Categories.replaceAll("|", " ").slice(0, 24);

    moviesClone.querySelector(".js-modal-btn").dataset.modalIndex =
      movie.imdb_id;

    docFrg.appendChild(moviesClone);
  });
  node.appendChild(docFrg);
}
moviesData(movieInformation, elResult);

// modal
const modalBtn = document.querySelector(".js-modal");
const modalDeleteBtn = document.querySelector(".js-modal-delete-btn");

modalDeleteBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalBtn.style.display = "none";
});

elResult.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-modal-btn")) {
    const modalAdd = evt.target.dataset.modalIndex;
    modalBtn.style.display = "block";
    const find = movies.find((item) => item.imdb_id == modalAdd);
    elModal.querySelector(
      ".js-movie-image"
    ).src = `https://img.youtube.com/vi/${find.ytid}/0.jpg`;
    elModal.querySelector(".js-movie-title").textContent = find.Title;
    elModal.querySelector(".js-movies-rating").textContent = find.imdb_rating;
    elModal.querySelector(".js-movies-year").textContent = `${Math.round(
      find.runtime / 60
    )} hur ${find.runtime % 60} min`;
    elModal.querySelector(".js-movies-time").textContent = find.movie_year;
    elModal.querySelector(".js-movies-categories").textContent =
      find.Categories.replaceAll("|", ", ");
    elModal.querySelector(".js-modal-full-title").textContent = find.fulltitle;
  }
  moviesData(movieInformation, elResult);
});
