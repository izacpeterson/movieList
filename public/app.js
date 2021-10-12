/** @format */
class MovieApp {
  constructor(name, movies) {
    this.name = name;
    this.movies = movies;
  }
  setUser(username) {
    localStorage.setItem("username", username);

    this.name = username;
    console.log(this.name);
    this.getMovies();
  }
  loadUsername() {
    let username = localStorage.getItem("username");
    console.log(username);
    if (username) {
      this.setUser(username);
      document.querySelector("#username").value = username;
    }
  }
  getMovies() {
    fetch(`/api/getUser?user=${this.name}`).then((data) => {
      data
        .json()
        .then((userInfo) => {
          console.log(userInfo.movies);
          this.movies = userInfo.movies;
          this.render();
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    });
  }
  addMovie(movieName) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user: this.name,
      movie: movieName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/addMovie", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    this.movies.push(movieName);
    this.render();
  }
  render() {
    document.querySelector("#movieList").innerHTML = "";
    this.movies.forEach((mv) => {
      fetch(`https://www.omdbapi.com/?t=${mv}&apikey=83c9e2b6`).then(
        (result) => {
          result.json().then((data) => {
            console.log(data);
            document.querySelector(
              "#movieList"
            ).innerHTML += `<li class="mvCard"><img src="${data.Poster}"><div class="mvInfo"><span class="mvTitle">${data.Title}</span><span>Year: ${data.Year} <br> Rated: ${data.Rated}</span></div></li>`;
          });
        }
      );
    });
  }
}
let app = new MovieApp();
app.loadUsername();
