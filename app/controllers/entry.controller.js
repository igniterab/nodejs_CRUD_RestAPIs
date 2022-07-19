const Entry = require('../models/entry.model.js');

// Create and Save a new entry
exports.create = (req, res) => {
    // Validate request
    if(!req.body.city) {
        return res.status(400).send({
            message: "Entry city can not be empty"
        });
    }

    // Create a Note
    const entry = new Entry({
        name: req.body.name || "Untitled entry", 
        city: req.body.city,
        registration_date: req.body.registration_date
    });

    // Save Note in the database
    entry.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


// Retrieve and return all entrys from the database.
exports.findAll = (req, res) => {
    Entry.find()
    .then(entrys => {
        res.send(entrys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entrys."
        });
    });
};



// Find a single entry with a entryId
exports.findOne = (req, res) => {
    Entry.findById(req.params.entryId)
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "entry not found with id " + req.params.entryId
            });            
        }
        res.send(entry);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entry not found with id " + req.params.entryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving entry with id " + req.params.entryId
        });
    });
};



// Update a entry identified by the entryId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.city) {
        return res.status(400).send({
            message: "entry content can not be empty"
        });
    }

    // Find entry and update it with the request body
    Entry.findByIdAndUpdate(req.params.entryId, {
        name: req.body.name || "Untitled entry", 
        city: req.body.city,
        registration_date: req.body.registration_date
    }, {new: true})
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "entry not found with id " + req.params.entryId
            });
        }
        res.send(entry);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entry not found with id " + req.params.entryId
            });                
        }
        return res.status(500).send({
            message: "Error updating entry with id " + req.params.entryId
        });
    });
};


// Delete a entry identified by the entryId in the request
exports.delete = (req, res) => {
    Entry.findByIdAndRemove(req.params.entryId)
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "entry not found with id " + req.params.entryId
            });
        }
        res.send({message: "entry deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "entry not found with id " + req.params.entryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete entry with id " + req.params.entryId
        });
    });
};


// Aggregate entry identified by City and return
exports.citySort = (req, res) => {
    Entry.aggregate([
        {
            $group:
            {
                _id: { city: "$city" },
                totalCustomer: { $sum: 1 },
            }
        }
    ])
    .then(entrys => {
        res.send(entrys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entrys."
        });
    });
};


// Aggregate entry identified by Registration date and return
exports.monthSort = (req, res) => {
    Entry.aggregate([
        {
            $group:
            {
                _id: { "month": { $substrCP: [ "$registration_date", 0, 7 ] }},
                totalRegistration: { $sum: 1 },
            }
        }
    ])
    .then(entrys => {
        res.send(entrys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entrys."
        });
    });
};