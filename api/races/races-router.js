const express = require('express');
const router = express.Router();


let races = ["Wizards", "Orcs", "Dwarfs", "Elves", "Ents"];

router.get("/", (req,res)=> {

    let response = races.sort((a,b) => a < b ? -1: 1);
    res.status(200).json(response);

} )


router.post("/", (req,res)=> {

    const race = req.body.race;
    races.push(race);
    res.status(200).json(race);
    
} )


module.exports = router;