const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=> res.render('index', {
    title: 'Invoice App',
    members
}));

//init middleware  
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({extended: false}));



/* reason is when we deploy it the server might not run it on the giving port so it will first
check then if no port is available it will deploy on our port*/
const PORT = process.env.PORT || 5050;
//use for static folder
app.use(express.static(path.join(__dirname, 'public')));
//Members API routes
app.use('/api/members', require('./routes/api/members'));


app.listen(PORT, () => console.log(`server started on ${PORT}`));