const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// for conncted db shell : mongosh "mongodb+srv://natours.sbib7js.mongodb.net/" --apiVersion 1 --username admin
// for start DATABASE : sudo systemctl start mongod
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('db connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
