const mongoose = require('mongoose');
const databaseURL = process.env.DB_URL

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(databaseURL)
}