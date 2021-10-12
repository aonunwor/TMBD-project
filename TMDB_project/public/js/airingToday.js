const airingTodayContainer = document.querySelector("#tv-shows-airing-today-container");
const image_url = `https://image.tmdb.org/t/p/w500/`;
const generateUrl = (path)=>{
	const url = `https://api.themoviedb.org/3${path}?api_key=f88c22800764a9c0d2b8f31c4b1ac92f&language=en-US&page=1`;
	return url;
}

//To get images
const tvShowsImages = (tvShows)=>{
	// console.log(tvShows);
	return tvShows.map((tvShow) =>{
		return `<img src=${image_url+tvShow.poster_path}
		data-tvShow-id=${tvShow.id}
		/><span class="content"><span id="content-close">X</span></span>`
	})
}

//Create Section tags for implementing the image
const createTvShowsContainer = (tvShows)=>{
	const tvShowsElement = document.createElement('div');
	tvShowsElement.setAttribute('class','tv-shows');
	const tvShowsTemplate=`<Section class="section">${tvShowsImages(tvShows)}</section>`
	tvShowsElement.innerHTML = tvShowsTemplate;
	return tvShowsElement;
}


// //To Remove Extras
const toClearExtras = ()=>{
 	const extras= document.querySelectorAll('.content');
 	for(let comma of extras){
 	comma.nextSibling.data='';
	};
}


//Inserting the image section in the div
const renderTvShowsAiringToday =(data) =>{
	const tvShows = data.results;
	const tvShowsBlock = createTvShowsContainer(tvShows);
	airingTodayContainer.appendChild(tvShowsBlock);
	toClearExtras();
}


//A Higher Order Function To Automatically Fetch Url and render Api
const requestTvShowsUrl = (url, onComplete, onError) =>{
	fetch(url)
	.then((res) =>res.json())
	.then(onComplete)
	.catch(onError)
};

//For Handling Error
const handleError = (error)=>{
	console.log('Error: ', error);
}


//Get URL
const getTvShowsAiringToday =()=>{
	const path = `/tv/airing_today`;
	const url = generateUrl(path);
	requestTvShowsUrl(url, renderTvShowsAiringToday, handleError);
}
getTvShowsAiringToday();


// TO CREATE DETAILS
const createDetails = (data)=>{
	const detailsContainer = document.createElement('div');
	const details = document.createElement('section');
	details.innerHTML = `
					<h3>Title: ${data.name}</h3>
					<h4>Time: ${data.episode_run_time}m</h4>
					<p><p>Overview: </b>${data.overview}</p>
					<p><b>Current Airing Episode: </b>${data.last_episode_to_air.episode_number}</p>
					<small><b>Number of Episodes: </b>${data.number_of_episodes}</small>`


	detailsContainer.appendChild(details);
	return detailsContainer;
}




// Event Delegation
const img = document.querySelector('img');

// lISTEN ON THE ENTIRE DOCUMENT INSTEAD
document.addEventListener(`click`, (event)=>{
	// console.log('CLICKED ON IMAGE')
	// console.log("EVENT: ", event);
	const target = event.target;
	if(target.tagName.toLowerCase() === 'img'){

		const content = target.nextElementSibling;
		content.classList.toggle('content-display');

		const tvShowId = target.dataset.tvshowId;
		const path = `/tv/${tvShowId}`
		const url = generateUrl(path)

		// Fetch movie details
		fetch(url)
		.then((res) => res.json())
		.then((data) =>{
			content.appendChild(createDetails(data));
		})
		.catch((error)=>{
				console.log('Error', error)
		})
	}

	//To target the (X)
	if(target.id === 'content-close'){
		const content = target.parentElement;
		content.classList.remove('content-display');
	}
})


// //Movie Details
// const createDetails = (data)=>{
// 	const detailsContainer=document.createElement('div');
// 	const details = documen.createElement('section');

// 		details.innerHTML =`
// 				<h3>Title: ${data.name}</h3>
// 				<h4>Time: ${data.episode_run_time}m</h4>
// 				<p><b>Overview: </b>${data.overview}</p>
// 				<p><b>Current Airing Episode: </b>${data.last_episode_to_air.episode_number}</p>
// 				<small><b>Number Of Episodes:</b> ${data.number_of_episodes}</small>`;

// 	detailsContainer.appendChild(details);
// 	return detailsContainer;
// 		}
	
// //TO GET MOVIE DETAILS
// //EVENT DELEGATION
// document.addEventListener('click', (event)=>{
// 	const target = event.target;
// 	console.log(target.dataset);
// 	if(target.tagName.toLowerCase() === 'img'){
// 		const tvShowId = target.dataset.tvShowId;
// 		const path = `/tv/${tvShowId}`;
// 		const url = generateUrl(path);

// 		// console.log('TvShowId: ', tvShowId);
// 		const content = target.nextElementSibling;
// 		content.classList.toggle('content-display');

// 		//fetch movie details
// 		fetch(url)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				//TODO
// 				//display tv details
// 					content.appendChild(createDetails(data));
// 			})
// 			.catch((error) =>{
// 				console.log('Error',error);
// 			})

// 	}
// 	if(target.id === 'content'){
// 		const content = target.parentElement;
// 		content.classList.remove('content-display');
// 	}


// })
