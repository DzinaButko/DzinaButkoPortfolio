//Dzina Butko ID 301215947  Assignment 2 Date  05/03/2021 

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//create reference to the model

let Contact = require('../models/contact');

module.exports.displayContactList = (req,res,next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
           
            res.render('contact/list', { title: 'Contact List', ContactList: contactList,displayName: req.user ? req.user.displayName : ""  });

        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add',{title: 'Add a Contact ',displayName: req.user ? req.user.displayName : "" });

}


module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email

    });

Contact.create(newContact, (err, Contact) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        //refresh the contact list
        res.redirect('/contact-list');
    }
})
}

module.exports.displayEditpage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if (err)
        {
                console.log(err);
                res.end(err);
        }
        else 
        {
                    //show the edit view
                    res.render('contact/edit',{title: 'Edit a Contact ', contact: contactToEdit,displayName: req.user ? req.user.displayName : "" });
        }
    });

}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
   
    let updateContact = Contact({
       "_id": id, 
       "name": req.body.name,
       "number": req.body.number,
       "email": req.body.email
    });
   
    Contact.updateOne({_id: id}, updateContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
             //refresh the contact list
           res.redirect('/contact-list');
        }
   
    });
}
   

module.exports.performDeletePage = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
             //refresh the contact list
           res.redirect('/contact-list');
        }
    });
}