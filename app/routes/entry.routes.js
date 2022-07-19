module.exports = (app) => {
    const entrys = require('../controllers/entry.controller.js');

    // Create a new entry
    app.post('/entry', entrys.create);

    // Retrieve all entrys
    app.get('/entry', entrys.findAll);

    // Retrieve a single entry with entryId
    app.get('/entry/:entryId', entrys.findOne);

    // Update a entry with entryId
    app.put('/entry/:entryId', entrys.update);

    // Delete a entry with entryId
    app.delete('/entry/:entryId', entrys.delete);

    // Total no of customers in each city
    app.get('/city_sort', entrys.citySort);

    // Total no of registration month-wise
    app.get('/month_sort', entrys.monthSort);

}