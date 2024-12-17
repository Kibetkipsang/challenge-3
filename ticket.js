fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then((films) => {
    const movieList = document.getElementById("ourmovielist");
    films.forEach((film) => {
      const movieItem = document.createElement("li");  // Use <li> instead of <div>
      movieItem.textContent = film.title;
      movieItem.style.cursor = "pointer";               // Set pointer cursor for interactivity
      movieItem.addEventListener("click", () => showMovieDetails(film));  // Show movie details on click
      movieList.appendChild(movieItem);                 // Append <li> to movie list
    });
  });

// Display the movie details
function showMovieDetails(film) {
  document.getElementById("movie-title").textContent = film.title;
  document.getElementById("movie-poster").src = film.poster;
  document.getElementById("movie-runtime").textContent = `Runtime: ${film.runtime} mins`;
  document.getElementById("movie-showtime").textContent = `Showtime: ${film.showtime}`;
  document.getElementById("movie-description").textContent = film.description;
  const availableTickets = film.capacity - film.tickets_sold;
  document.getElementById("available-tickets").textContent = `Available Tickets: ${availableTickets}`;
  const buyButton = document.getElementById("buy-ticket");

  // Disable buy ticket button if tickets are sold out
  buyButton.disabled = availableTickets <= 0;

  buyButton.onclick = () => {
    if (availableTickets > 0) {
      film.tickets_sold++;
      updateTicketsSold(film);
      showMovieDetails(film); // Re-render updated ticket count
    }
  };
}

// Update number of tickets sold
function updateTicketsSold(film) {
  fetch(`http://localhost:3000/films/${film.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tickets_sold: film.tickets_sold }),
  });
}
