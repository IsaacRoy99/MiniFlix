const movies = [
{ id:1, title:'Fantastic Four: First Steps', genre:'Sci-Fi', poster:'fantastic-four.jpg', src:'fantastic-four.mp4', description:'4 Fantastic Heroes.' },
{ id:2, title:'Mission Impossible: The Final Reckoning', genre:'Action', poster:'mi8.jpg', src:'mi8.mp4', description:'Tom Cruise risks it all.' },
{ id:3, title:'Avengers Endgame', genre:'Sci-Fi', poster:'endgame.jpg', src:'endgame.mp4', description:'Thanos makes his Last Stand.' },
{ id:4, title:'No Time To Die', genre:'Action', poster:'bond.jpg', src:'bond.mp4', description:'James Bond on another death-defying mission.' },
{ id:5, title:'F1', genre:'Action', poster:'f1.jpg', src:'f1.mp4', description:'A thrilling adventure.' },
{ id:6, title:'Fast And Furious', genre:'Action', poster:'fast.jpg', src:'fast.mp4', description:'Dom and Brian bring down a cartel.' },
{ id:7, title:'Bad Boys', genre:'Comedy', poster:'bad-boys.jpg', src:'bad-boys.mp4', description:'The Bad Boys are back and funnier.' },
{ id:8, title:'Superman', genre:'Sci-Fi', poster:'superman.jpg', src:'superman.mp4', description:'A new take on Superman.' }
];

// render grid
function renderMovies(list){
const grid = document.getElementById('moviesGrid');
if(!grid) return;
grid.innerHTML='';
list.forEach(m =>{
const col = document.createElement('div'); col.className='col-6 col-md-3';
col.innerHTML = `
    <div class="card card-movie p-2" data-id="${m.id}">
        <img src="${m.poster}" alt="${m.title}" />
        <div class="p-2">
        <div class="movie-title">${m.title}</div>
    <div class="d-flex justify-content-between align-items-center mt-2">
    <small class="text-muted">${m.genre}</small>
    <div>
        <button class="btn btn-sm btn-outline-light me-1" onclick="openDetails(${m.id})">Details</button>
            <button class="btn btn-sm btn-danger" onclick="playMovie(${m.id})">Play</button>
            </div>
            </div>
            </div>
        </div>
`       ;
        grid.appendChild(col);
    });
}

// search
const searchInput = document.getElementById('searchInput');
if(searchInput){
searchInput.addEventListener('input', ()=>{
const q = searchInput.value.toLowerCase();
renderMovies(movies.filter(m=>m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)));
});
}

// details modal
function openDetails(id){
const m = movies.find(x=>x.id===id);
if(!m) return;
document.getElementById('modalPoster').src=m.poster;
document.getElementById('modalTitle').innerText=m.title;
document.getElementById('modalDesc').innerText=m.description;
document.getElementById('modalGenre').innerText=m.genre;
document.getElementById('playBtn').href='watch.html?movie='+m.id;
document.getElementById('downloadBtn').href=m.src;
document.getElementById('addWatchBtn').onclick=()=>{addToWatchlist(m.id)};
const modal = new bootstrap.Modal(document.getElementById('movieModal'));
modal.show();
}


// play -> navigate to watch page
function playMovie(id){
window.location.href='watch.html?movie='+id;
}


// watchlist via localStorage
function getWatchlist(){
return JSON.parse(localStorage.getItem('watchlist')||'[]');
}
function setWatchlist(arr){
localStorage.setItem('watchlist',JSON.stringify(arr));
updateWatchCount();
}
function addToWatchlist(id){
const list = getWatchlist();
if(!list.includes(id)){ list.push(id); setWatchlist(list); alert('Added to watchlist'); }
}
function updateWatchCount(){
const el = document.getElementById('watchCount'); if(el) el.innerText = getWatchlist().length;
}
updateWatchCount();


// on load
document.addEventListener('DOMContentLoaded', ()=>{ renderMovies(movies); updateWatchCount(); });


// watch.html player logic
if(window.location.pathname.endsWith('watch.html')){
const params = new URLSearchParams(window.location.search); const id = Number(params.get('movie'));
const movie = movies.find(m=>m.id===id) || movies[0];
const playerArea = document.getElementById('playerArea');
playerArea.innerHTML = `
<h3>${movie.title}</h3>
<video controls class="w-100 mt-3 rounded" src="${movie.src}"></video>
<p class="text-muted mt-2">${movie.description}</p>
`;

}
