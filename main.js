const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWI5ZDY4NjdjZWY0M2ZkNzAwMjZiNTNjYmE5M2RlZCIsIm5iZiI6MTcyMTczMjgzNi4zODU4OTksInN1YiI6IjY2OWY4ZDU5YWZlNmQwYThhNzdkNDZhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSDKNP8urGGoA9gYw0IrVWHkUEz8XCPKRewat1oHrFE'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        const movieContainer = document.getElementById('card-list');
        movies.forEach(movie => {
            const card = createMovieCard(movie);
            movieContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error:', error));



function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.overview}</p>
          <span>Rating: ${movie.vote_average}</span>
        `;
    card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
    return card;
}

const btn = document.getElementById('search-btn');
btn.addEventListener('click', () => {
    const query = document.getElementById('movie-title-search').value.toLowerCase();

    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();

        if (title.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
