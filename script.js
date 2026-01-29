class Movie {
  constructor(id,name,price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const container = document.querySelector('.container');
const movieSelect = document.getElementById('movie');
const countSpan = document.getElementById('count')
const totalSpan = document.getElementById('total');

let movies = []; //-- alla filmer lagras
let selectedMoviePrice = 0; //--Sprarar enbart priset

async function fetchMovies() { //-- hämtar filmer från backnd
  const response = await fetch('http://localhost:3000/movies');
  const data = await response.json();

  movies = [];

  for (let i = 0; i < data.length; i +=1) {
    const movie = new Movie(
      data[i].id,
      data[i].name,
      data[i].price
    );
    movies.push(movie);
  }
  createOptions();
}

function createOptions() {
  movieSelect.innerHTML = ''; //-- om funktionen körs igen,resnar tidigare allternativ

  for (let i = 0; i < movies.length; i +=1) {
    const option = document.createElement('option');
    option.value = movies[i].price;
    option.textContent =
     movies[i].name + '('+movies[i].price + 'kr)'; //-- visar både namn och pris

    movieSelect.appendChild(option);
  }

  selectedMoviePrice = Number(movieSelect.value); //--Första filmens pris
  updateTotal();
}

function changeMovie() {
  selectedMoviePrice = Number(movieSelect.value);
  updateTotal(); //--ändrar priset om man väljer ny film
}

function updateTotal() {
  const selectedSeats =
   container.querySelectorAll('.seat.selected');

  const count = selectedSeats.length;
  const total = count * selectedMoviePrice; //-- antal säten multipliceras med konstnaden av biljetten

  countSpan.textContent = count;
  totalSpan.textContent = total;
}

function seatClick(event) {
  const seat = event.target;

  if (seat.classList.contains('occupied')) {
    return;
  }

  if (seat.classList.toggle('selected')) 
    updateTotal();
}

container.addEventListener('click',seatClick);
movieSelect.addEventListener('change',changeMovie);

fetchMovies();