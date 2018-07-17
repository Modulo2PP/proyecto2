require('dotenv').config();

const mongoose = require("mongoose");
const Photo = require('../models/Picture');


const dburl = process.env.DBURL;
mongoose.connect(dburl).then(() => console.log(`Connected to: ${dburl} DB`));

Photo.collection.drop()


Photo.create([{
            path: "https://www.viajejet.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada-1440x810.jpg",
            name:""
        },
        {
            path: "https://gcdn.emol.cl/mascotas/files/2018/03/perro-raro.jpg",
            name: ""
        },
        {
            path: "https://cms.exchange4media.com/files/article/article_extra_large_image/1531334500_v8VH6T_cristiano_ronald-2.jpg",
            name:""
        }
    ])
    .then(() => {
        console.log("photos added");
        mongoose.disconnect();
        console.log('moongose disconected')
    })
    .catch(err=>{
        console.log('error seeding pictures')

    })