

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const cors = require("cors");
const fs = require('fs');

//routes
const users = require('./routes/api/users');
const admins = require('./routes/api/admins');

const posts = require('./routes/api/posts');

const chats = require('./routes/api/chat');
const complaints = require('./routes/api/complaint'); 
const notifications = require('./routes/api/notification');
const reservation  = require('./routes/api/reservation ');

require('./config/passport')(passport);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

//const db = require('./config/keys').mongoURI;
/*mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() =>
        console.log('MongoDB successfully connected.')
    ).catch(err => console.log(err));
*/
mongoose.connect('mongodb://127.0.0.1:27017/personnel_Shoppers'
    , {
        useNewUrlParser: true,
        // useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('mongo connected')
    }).catch((err) => {
        console.log(err);
    })

app.use(passport.initialize());
//routes
app.use('/api/users', users);
app.use('/api/complaints', complaints);
app.use('/api/admins', admins);
app.use('/api/posts', posts);
app.use('/api/chats', chats);
app.use('/api/notifications', notifications);
app.use('/api/réservations', reservation);
app.use('/static', express.static('public'));
//server
//const port = process.env.PORT || 3000;
const port = 5000 ; 


app.listen(port, () => console.log(`Server up and running on port ${port} !`));

