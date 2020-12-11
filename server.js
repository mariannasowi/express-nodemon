const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
var multer  = require('multer');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

const upload = multer({ dest: 'public/' })

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res, next) => {
  res.render('history');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('uploaded_file'), (req, res) => {
  const { author, sender, title, message } = req.body;
  console.log(req.file)
  
  if(author && sender && title && message && req.file.filename) {
    res.render('contact', {data: {isSent: true, filename: req.file.originalname}});
  }
  else {
    res.render('contact', {isError: true});
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});