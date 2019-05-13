const express   = require('express');
const cors      = require('cors');
const api       = require('./api/v1');
const app       = express();
const PORT      = process.env.PORT || 3000;

const mongoose = require('mongoose');
const connection = mongoose.connection;
app.set('port', PORT);

app.use(cors());
app.use('/api/v1', api); // localhost:3000/api/v1
app.use((req, res) => {
    const err = new Error('404 - Not Found !!!')
    err.status = 404;
    res.json({msg: err.message, error: err});
});

mongoose.connect('mongodb://localhost/whiskycms', { useNewUrlParser: true});

connection.on('error', (err) => {
    console.error(`connection to mongodb error: ${err.message}`);
});

connection.once('open', () => {
    console.log('Connected to MongoDB')

    app.listen(app.get('port'), () => {
        console.log(`Express server listening on PORT: ${app.get('port')} !!`);
    });
});





