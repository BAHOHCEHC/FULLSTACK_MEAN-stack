const app = require('./app');
const port = process.env.port || 6666

app.listen(port, () => {
  console.log(`****SERVER WORK****${port}`);
});
