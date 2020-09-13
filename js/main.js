window.addEventListener('DOMContentLoaded', () => {
  "use strict";



  const heroes = document.querySelector('.heroes');
  const options = document.querySelector('.options');
  const movieOptions = document.getElementById('movies');
  console.log(movieOptions);



  const heandler = (data, name, val) => {

    heroes.textContent = '';
    movieOptions.textContent = '';
    const movieMap = new Set();
    const objHeroes = data.filter((item) => {
      if (item[name] === val) {
        return true;
      }
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
      // console.log(name, species, gender, birthDay, deathDay, photo, movies, status, actors);
      if (!birthDay) {
        birthDay = 'не дано';
      }
      if (!deathDay) {
        deathDay = 'не дано';
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
    movieMap.forEach((item) => {
      movieOptions.insertAdjacentHTML('beforeEnd', `<option value="${item}">${item}</option>`);
    });

  };

  const postData = (name, val) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {

        heandler(JSON.parse(request.response), name, val);
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
    const name = target.name;
    const val = target.value;
    console.log(target.value);
    postData(name, val);
  });





});