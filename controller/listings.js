const Listing = require("../models/listing.js")


const mapToken = process.env.MAP_TOKEN
const { geocoding, config } = require('@maptiler/client');

module.exports.index= async (req,res)=>{
       const allListings= await Listing.find({});
       res.render("listings/index.ejs",{allListings})
    };
module.exports.renderNewForm = (req,res)=>{
        res.render("listings/new.ejs");
    }
module.exports.renderShowForm = async (req,res)=>{
        let { id }=req.params;
        const listing = await Listing.findById(id).populate({path :"reviews", populate : { path : "author"}}).populate("owner");
        if(!listing){
            req.flash("error","Listing was not found");
            return res.redirect("/listings");
        }
        res.render("listings/show.ejs",{listing});
    }
    module.exports.createListing = async(req,res,next)=>{

            
        config.apiKey = mapToken;
        let response = await geocoding.forward(req.body.listing.location);

            let url = req.file.path;
            let filename = req.file.filename;
            const newListing=new Listing(req.body.listing);
            newListing.owner = req.user._id;
            newListing.image = {url,filename}
            newListing.geometry = response.features[0].geometry;
            await  newListing.save();
            req.flash("success","new Listing was added");
            res.redirect("/listings");
        }

module.exports.renderEditForm = async (req,res)=>{
        let { id }=req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error","Listing was not found");
            return res.redirect("/listings");
        }
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
        res.render("listings/edit.ejs",{listing,originalImageUrl});
    }

module.exports.updateListing = async (req, res) => {
    let id = req.params.id.trim();
    // let listing = await Listing.findById(id);
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
       url = req.file.path;
       filename = req.file.filename;
       listing.image = {url , filename};
       await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListing = async (req,res)=>
{
      let id = req.params.id.trim();
      let deletedlisting = await Listing.findByIdAndDelete(id);
     // console.log(deletedlisting);
     req.flash("success","Listing Deleted");
      res.redirect("/listings");

};

module.exports.iconListing = async (req, res) => {
    const category = req.params.category;
    const allListings = await Listing.find({ category });
    res.render("listings/icon.ejs", { allListings, category });
}

module.exports.searchListings = async (req, res) => {
    const query = req.query.query?.trim() || "";
    let results = [];

    if (query) {
        const searchRegex = new RegExp(query, "i");
        results = await Listing.find({
            $or: [
                { title: { $regex: searchRegex } },
                { location: { $regex: searchRegex } },
                { country: { $regex: searchRegex } }
            ]
        });
    }

    res.render("listings/search.ejs", { results, query });
}
