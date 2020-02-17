const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const dinosaure = mongoose.model('dinosaure');

router.get('/', (req, res) => {
    res.render("dinosaure/addOrEdit", {
        viewTitle: "Insert dinosaure"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var dinosaure = new dinosaure();
    dinosaure.Age = req.body.Age;
    dinosaure.Famille = req.body.Famille;
    dinosaure.Race = req.body.Race;
    dinosaure.Nourriture = req.body.Nourriture;
    dinosaure.save((err, doc) => {
        if (!err)
            res.redirect('dinosaure/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("dinosaure/addOrEdit", {
                    viewTitle: "Insert dinosaure",
                    dinosaure: req.body
                });
            }
            else
                console.log('Erreur d insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    dinosaure.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('dinosaure/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("dinosaure/addOrEdit", {
                    viewTitle: 'Update dinosaure',
                    dinosaure: req.body
                });
            }
            else
                console.log('Erreur de update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    dinosaure.find((err, docs) => {
        if (!err) {
            res.render("dinosaure/list", {
                list: docs
            });
        }
        else {
            console.log('Erreur dans list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Age':
                body['AgeError'] = err.errors[field].message;
                break;
            case 'Famille':
                body['FamilleError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    dinosaure.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("dinosaure/addOrEdit", {
                viewTitle: "Update dinosaure",
                dinosaure: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    dinosaure.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/dinosaure/list');
        }
        else { console.log('Erreur dans la suppression :' + err); }
    });
});

module.exports = router;
