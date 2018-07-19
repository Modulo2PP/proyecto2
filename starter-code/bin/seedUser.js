require('dotenv').config();

const mongoose = require("mongoose");
const User = require('../models/User');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const dburl = process.env.DBURL;
mongoose.connect(dburl).then(() => console.log(`Connected to: ${dburl} DB`));

const salt = bcrypt.genSaltSync(bcryptSalt);
const hashedPass = bcrypt.hashSync(`1111`, salt);

User.collection.drop()

User.create([
  {
    username: `Pedro`,
    password: hashedPass,
    email: `pedro@pedro.com`,
    albums: []
  },
  {
    username: `Carlota`,
    password: hashedPass,
    email: `carlota@carlo.com`,
    albums: []
  },
  {
    username: `Marc`,
    password: hashedPass,
    email: `boyander@marc.com`,
    albums: []
  }
])
.then( () => {  
  console.log("User created");
  mongoose.disconnect();
  console.log('moongose disconected')
})