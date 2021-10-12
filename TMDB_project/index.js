const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res)=>{
	res.render('home');
})

app.get('/tv-shows-airing-today', (req, res) =>{
	res.render('airingToday');
})

app.get('/tv-shows-presently-on-air', (req, res) =>{
	res.render('presentlyOnAir');
})

app.get('/popular-tv-shows', (req, res)=>{
	res.render('popularTvShows')
})


app.listen(8000, ()=>{
	console.log("LISTENING ON PORT 8000!")
})