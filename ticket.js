fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then((films) => {
    const movieList = document.getElementById("ourmovielist");
    films.forEach((film) => {
      const movieItem = document.createElement("div");
      movieItem.textContent = film.title;
      movieItem.style.cursor = "pointer";
      movieItem.addEventListener("click", () => showMovieDetails(film));
      movieList.appendChild(movieItem);
    });
  });

// Display the movies details
function showMovieDetails(film) {
  document.getElementById("movie-title").textContent = film.title;
  document.getElementById("movie-poster").src = film.poster;
  document.getElementById("movie-runtime").textContent = `Runtime: ${film.runtime} mins`;
  document.getElementById("movie-showtime").textContent = `Showtime: ${film.showtime}`;
  document.getElementById("movie-description").textContent = film.description;
  const availableTickets = film.capacity - film.tickets_sold;
  document.getElementById("available-tickets").textContent = `Available Tickets: ${availableTickets}`;
  const buyButton = document.getElementById("buy-ticket");

  // Disable buy ticket if tickets are sold out
  buyButton.disabled = availableTickets <= 0;


  buyButton.onclick = () => {
    if (availableTickets > 0) {
      film.tickets_sold++;
      updateTicketsSold(film);
      showMovieDetails(film); 
    }
  };
}

// update number of tickets
function updateTicketsSold(film) {
  fetch(`http://localhost:3000/films/${film.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tickets_sold: film.tickets_sold }),
  });
}

