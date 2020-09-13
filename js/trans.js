window.addEventListener('DOMContentLoaded', () => {
	"use strict";



	const heroes = document.querySelector('.heroes');

	const heandler = (data, fields) => {
		const movie = 'Doctor Strange';
		// const objHeroes = data.filter((item) => item.gender === 'female');
		// console.log(objHeroes[0].movies);





		console.log(newHeroes);
		objHeroes.forEach((item) => {
			// if (item.movies) {
			//   item.movies.forEach((i) => {

			//     console.log(i);

			//   });
			// }
			let {
				name,
				species,
				gender,
				birthDay,
				deathDay,
				photo,
				movies,
				status,
				actors


			} = item;

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
          <h3 class="card-title">${name}</h3>
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

	const postData = (cb) => {
		const request = new XMLHttpRequest();

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) {
				return;
			}
			if (request.status === 200) {

				cb(JSON.parse(request.response));
			}
		});

		request.open('GET', '/../dbHeroes.json');
		//request.setRequestHeader('Content-Type', 'multipart/form-data');
		request.setRequestHeader('Content-Type', 'application/json');


		request.send();
		//request.send(formData);
	};



	postData(data => {
		console.log(data);
	});

	// const projection = (fields, obj) => Object.keys(obj)
	//   .filter(item => fields.includes(item))
	//   .reduce((newObj, key) => {
	//     newObj[key] = obj[key];
	//     return newObj;
	//   }, {});

	const projection = meta => {
		const keys = Object.keys(meta);

		// return obj => {
		//   const newObj = {};
		//   keys.forEach(key => {
		//     const def = meta[key];
		//     const [field, fn] = def;
		//     const val = obj[field];
		//     newObj[key] = fn ? fn(val) : val;
		//   });
		//   return newObj;
		// };
		// ИЛИ ВОТ ТАК
		return obj => keys.reduce((newObj, key) => {
			newObj[key] = meta[key].reduce((val, fn, i) => i ? fn(val) : obj[fn], null);
			return newObj;
		}, {});
	};

	const metaData = {
		hero: ['name', item => item.toUpperCase()],
		gender: ['gender'],
		nationality: ['citizenship', item => (item ? item : 'no data')],
		movies: ['movies', item => {
			if (typeof item === 'object') {
				console.log(item.join().match('Doctor Strange'));
				if (item.join().match('Doctor Strange')) {
					return item.join();
				}

			}
		}]
	}

	postData(data => {
		const proMetaData = projection(metaData);
		const newHeroes = data.map(proMetaData);
		console.log(newHeroes);
	});


});