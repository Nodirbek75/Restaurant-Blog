var mongoose         = require("mongoose"),
    methodOverride   = require("method-override")
    bodyParser       = require("body-parser"),
    Blog             = require("./models/blog");
    express          = require("express"),
    app              = express();

mongoose.connect("mongodb://localhost/lempreinte_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


app.get("/", function(req,res){
    res.redirect("/blogs");
})

//Index route
app.get("/blogs", function(req,res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log("ERROR");
        }else{
            res.render("index", {blogs: blogs});
        }
    })
})

//New route
app.get("/blogs/new",function(req,res){
    res.render("new");
})

//Create route
app.post("/blogs", function(req,res){
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

//Show route
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log("ERROR");
        }else{
            res.render("show", {blog: foundBlog});
        }
    })
})

//Edit route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log("ERROR");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    })
})

//Update route
app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log("ERROR");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err, deleteBlog){
        if(err){
            console.log("ERROR");
        }else{
            res.redirect("/blogs");
        }
    })
})

app.listen(7000, function(){
    console.log("Server has started!");
});