const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
  console.log('All');
  next();
});

const cb = (req, res, next) => {
  console.log('CB');
  next();
}

app.route('/user')
  .get('/hello', (req, res) => {
    res.send('Привет!');
  })
  .post('/hello', (req, res) => {
    res.send('Привет!');
  });



app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

// clinic doctor --on-port 'autocannon -m POST localhost:8000/users/register' -- node dist/main.js
