const express = require("express");
const {connectDB} = require("./connect");
const dotenv = require('dotenv').config();
const ShortUrl = require('./models/url');
const router = express.Router();


const app = express()
const PORT = process.env.PORT;

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

//home route
app.get('/', async (req, res)=>{
    const shortUrls = await ShortUrl.find()
    res.render("home",{shortUrls: shortUrls })
})

//actual post method that creates the short id
app.post("/shortUrls", async(req,res) => {
    
    
        const body = req.body;
        await ShortUrl.create({
            full: body.fullUrl
        });

        // if (!body.fullUrl) {
        //     return res.status(400).json({ error: 'url is required' });
        // }

        res.redirect('/') 

});


app.get( "/:shortUrl", async (req, res) =>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)
    
   shortUrl.clicks++
   shortUrl.save()
   res.redirect(shortUrl.full)
});


app.listen(PORT, ()=> console.log(`app running on ${PORT}`));
 