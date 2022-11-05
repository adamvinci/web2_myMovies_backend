const express = require('express');


const { readAllPizza, addOneDFilm, deleteOnePizza,updateOneFilm, getOneFilm } = require('../models/film');
const { authorize } = require('../utils/auth');


const router = express.Router();



/* Read all the film from the menu
   GET /film?order=title:ascending orderbytitle
   GET /film?order=-title:descending orderbytitle
*/
router.get('/', (req, res) => {

  
 const pizzaList=readAllPizza(req?.query?.order,req?.query?.search)
 console.log(req?.query?.order,req?.query?.search)
    return res.json(pizzaList)
  


});

// Read the film identified by an id in the menu

// eslint-disable-next-line consistent-return
router.get('/:id', (req, res) => {
  const film=getOneFilm(req.params.id)

  if (!film) return res.sendStatus(404);

  res.json(film)
});


// Create a film to be added to the menu.
router.post('/',authorize, (req, res) => {
  const titleQ = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const durationQ = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budgetQ = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const linkQ = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!titleQ || !durationQ || !budgetQ || !linkQ) return res.sendStatus(400); // error code '400 Bad request'


  const newFilm = addOneDFilm(titleQ,budgetQ,linkQ,durationQ)

  return res.json(newFilm);
});

// Delete a film from the menu based on its id
router.delete('/:id',authorize, (req, res) => {

  const itemRemoved = deleteOnePizza(req.params.id)
  if (!itemRemoved ) return res.sendStatus(404);


  

  return res.json(itemRemoved);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id',authorize, (req, res) => {


  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if ((!title && !duration && !link && !budget)
    || title?.length === 0 || duration?.length === 0 || link?.length === 0 || budget?.length === 0) return res.sendStatus(400);

    const changeP= updateOneFilm(req.params.id,{title,duration,budget,link})

    if(!changeP) res.sendStatus(404);
  
  
    return res.json(changeP);
});

module.exports = router;
