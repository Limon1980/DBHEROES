window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const heroes = document.querySelector('.heroes');
  const options = document.querySelector('.options');
  const movieOptions = document.getElementById('movies');

  const heandler = (data, val) => {
    const movieMap = new Set();
    data.forEach((item) => {
      let {
        movies
      } = item;

      if (typeof movies === 'object') {
        movies.forEach((i) => {
          movieMap.add(i);
        });
      }
    });
    heroes.textContent = '';

    movieMap.forEach((item) => {
      if (item === val) {
        movieOptions.insertAdjacentHTML('beforeEnd', `<option value="${item}" selected>${item}</option>`);
        // console.log(item);
      } else {
        movieOptions.insertAdjacentHTML('beforeEnd', `<option value="${item}">${item}</option>`);
      }
    });




    const objHeroes = data.filter((item) => {

      if (typeof item.movies === 'object') {
        if (item.movies.join().match(val)) {
          return true;
        }
      }
    });
    // console.log(objHeroes[0].movies);


    objHeroes.forEach((item) => {
      if (item.movies) {
        item.movies.forEach((i) => {

          // console.log(i);

        });
      }
      let {
        name,
        species,
        gender,
        birthDay,
        deathDay,
        photo,
        movies,
        status,
        actors,
        citizenship


      } = item;

      if (typeof movies === 'object') {
        movies.forEach((item) => {
          movieMap.add(item);

        });
      }
      const hero = `
      <div class="hero">
          <div class="card-heading">
          <h3 class="card-title">${name} - ${citizenship}</h3>
          
           </div>
              <img src="${photo}" alt="image" class="hero-image" />
            <div class="card-text">
          
                  <div class="card-info">
                 
                
                  <div class="category"> gender:${gender}
                  species: ${species}<br>
                  birthDay: ${birthDay}
                  deathDay: ${deathDay}<br>
                  status: ${status} <br> актер: ${actors} <br>Movie: ${movies}</div>
                  
                  </div>
             </div>
      </div>
      </div>
            `;
      // вставляем карточку в верстку
      heroes.insertAdjacentHTML("beforeend", hero);
    });



  };

  const postData = (val) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        heandler(JSON.parse(request.response), val);
      }
    });
    request.open('GET', '/../dbHeroes.json');
    //request.setRequestHeader('Content-Type', 'multipart/form-data');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
    //request.send(formData);
  };

  options.addEventListener('change', (event) => {
    const target = event.target;
    const val = target.value;
    // console.log(val);
    movieOptions.textContent = '';
    postData(val);
  });

  postData();

});