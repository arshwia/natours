const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Tour } = require('./../../modules/tourModule');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('db connection successful!'));

//READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA TOIN DATABASR
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('data successfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany({});
        console.log('data successfully deleteed');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('\n\n\n\n\n\n\ninter --import or --delete\n\n\n\n\n\n\n');
    process.exit();
}
