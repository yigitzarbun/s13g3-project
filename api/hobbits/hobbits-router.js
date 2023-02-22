// 6.1-Export

const express = require('express');
const router = express.Router();

// hobbitler için middleware'lerimizi import ettik
const md = require("./hobbits-middleware");

let id = 0;
let getId = () => ++id;

let hobbits = [
    {
        id: getId(),
        name: "Sam"
    },
    {
        id: getId(),
        name: "Frodo"
    },
    {
        id: getId(),
        name: "Gandalf"
    },
    {
        id: getId(),
        name: "Aragorn"
    },
    {
        id: getId(),
        name: "Galadriel"
    }
]


router.get("/", (req,res)=> {
   
    let sortField = req.query.sirala || 'id';
    console.log(req.query)
    let response = hobbits.sort((a,b) => a[sortField] < b[sortField] ? -1: 1);
    res.status(200).json(response);
} )

router.get("/:id", md.parolaKontrol, md.logger, (req,res)=> {
    console.log(req.params);
    const {id} = req.params;
    const hobbit = hobbits.find(hobbit => hobbit.id == id);
    res.status(200).json(hobbit);
} )

router.post("/", (req,res)=> {
    console.log(req.body);
    const hobbit = req.body;
    //hobbits.push({id: getId(), name: hobbit.name});
    hobbits.push({...hobbit, id: getId()});
    res.status(200).json(hobbit);
} )

module.exports = router;