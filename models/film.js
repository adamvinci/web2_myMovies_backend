const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/film.json');

const defaultFilm = [
   

  ];

  function readAllPizza(paramOrder,paramSearch){
    const films= parse(jsonDbPath,defaultFilm)
    let orderedList;
    
    if(paramOrder){
        orderedList = [...films].sort((a, b) => a.duration.localeCompare(b.duration));
  if (paramOrder === '-duration') orderedList = orderedList.reverse();
return orderedList;

    }
     if(paramSearch){

        const filmOfIndex = [];
         for (let i = 0; i < films.length; i+=1) {
      const film = films[i].title?.toUpperCase();

      if (film?.startsWith(paramSearch.toUpperCase()))
        filmOfIndex.push(films[i]);
    }
    return filmOfIndex;
    }

    return films
  }

  function addOneDFilm(titre,budgetQ,linkQ,durationQ){
    const film=parse(jsonDbPath,defaultFilm)
    const filmAdded={id:getNextID(),title:titre,budget:budgetQ,link:linkQ,duration:durationQ}
    film.push(filmAdded)
    serialize(jsonDbPath,film)

    return filmAdded
  }
  function getNextID(){
    const film=parse(jsonDbPath,defaultFilm);
    const lastIndex= film?.length !== 0 ? film.length - 1 : undefined;
    if(!lastIndex) return -1;
    const lastID=film[lastIndex]?.id

    return lastID+1;
  }
  function getOneFilm(id){
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilm);
    const indexOfFilmFound = films.findIndex((f) => f.id === idNumber);
    if (indexOfFilmFound < 0) return undefined;
  
    return films[indexOfFilmFound];
  }
  function deleteOnePizza(id){
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilm);
    const indexOfFilmFound = films.findIndex((f) => f.id === idNumber);
    if (indexOfFilmFound < 0) return undefined;
    
    const itemsRemovedFromMenu = films.splice(indexOfFilmFound, 1);
    serialize(jsonDbPath,films)
    return itemsRemovedFromMenu

  }
function updateOneFilm(id,propertiesToUpdate){
    const idNumber=parseInt(id,10)
    const films=parse(jsonDbPath,defaultFilm);
    const indexFilm= films.findIndex((f)=>f.id === idNumber);
    if(indexFilm < 0) return undefined;
    const changedFilm= {...films[indexFilm],...propertiesToUpdate};
    films[indexFilm]=changedFilm;
    serialize(jsonDbPath,films);
    return changedFilm;

}
  module.exports ={
    readAllPizza,
    addOneDFilm,
    getOneFilm,
    deleteOnePizza,
    updateOneFilm
  }