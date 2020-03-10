// module.exports = {
//   // mongoURI: 'mongodb+srv://ivan:123456z@cluster0-dmk4e.mongodb.net/test?retryWrites=false&w=majority',
//   mongoURI: 'mongodb+srv://admin:admin@fullstackcluster-sjg3z.mongodb.net/test?&w=majority',
//   jwt: 'dev-jwt',
// };
if (procces.env.NODE_ENV === 'production') {
	module.exports = require('./keys.prod');
} else {
	module.exports = require('./keys.dev');
}
