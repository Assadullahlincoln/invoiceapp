
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members.js');
//get all members
router.get('/',(req,res)=>res.json(members));

//get a single member
router.get('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg: `No member with the ID of ${req.params.id}`});
    }
});

//create member
router.post('/',(req, res)=>{
    res.send(req.body);
    const newMember = {

        id: uuid.v4(),
        name:req.body.name,
        email: req.body.email,
        Payment: req.body.Payment,
        amount: req.body.amount,
        status: 'active'

    }

    if(newMember.name || !newMember.email){
        res.status(400).json({msg: 'Please fill the appropriate class'});
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});


//Update Member
router.put('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg: `No member with the ID of ${req.params.id}`});
    }
});

//Delete Member
router.delete('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({msg:'member deleted',
        members:members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg: `No member with the ID of ${req.params.id}`});
    }
});


module.exports = router;