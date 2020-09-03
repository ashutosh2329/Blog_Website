// required the neccesary packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const load = require('lodash');
const mongoose = require("mongoose");
const app = express();
const posts = [];


// mongodb connection
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true });


// ejs setting
app.set('view engine', 'ejs');


// bodyparser use and ejs template 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// blog schema and model
const blogSchema = {
  title: String,
  content: String
};
const Blog = mongoose.model('Blog', blogSchema);


// post schema and model
const postSchema = {
  title: String,
  content: String,
  author: String
};
const Post = mongoose.model('Post', postSchema);



// creating default work item
const blog1 = new Blog({
	title: "homeContent",
	content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const blog2 = new Blog({
	title: "aboutContent",
	content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const blog3 = new Blog({
	title: "contactContent",
	content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});




// route starts 
// home route
app.get("/",function(req, res){
	Blog.find({title:"homeContent"},function(err,result){
		if(result.length === 0){
			blog1.save();
			res.redirect("/");
		}else{
			Post.find({},function(err,returnedPost){
				if(err){
					console.log(err);
				}else{
					res.render("home",{homeStartingContent:result, posts:returnedPost});
				}
				
			})
		}
	})
})



// contact route
app.get("/contact",function(req, res){
	Blog.find({title:"contactContent"},function(err,result){
		if(result.length === 0){
			blog3.save();
			res.redirect("/contact");
		}else{
			res.render("contact",{contactContent:result});
		}
	})
})




// about developer route
app.get("/about",function(req, res){
	Blog.find({title:"aboutContent"},function(err,result){
		if (result.length === 0) {
			blog2.save();
			res.redirect("/about");
		}else{
			res.render("about",{aboutContent:result});
		}
	})
})




// compose route
app.get("/compose",function(req, res){
	res.render("compose");
})



// dynamic route
app.get('/posts/:userId', function (req, res) {
   let title = load.upperFirst(load.lowerCase(req.params.userId));
   Post.find({title:title},function(err,requiredPost){
		res.render("post",{postRequired:requiredPost});
   })
   
})




// compose post route
app.post("/compose", function(req, res){
	const post = new Post({
		title: req.body.postTitle,
		content: req.body.postBody,
		author: req.body.author
	});
	post.save();
	res.redirect("/");
})




// server running port
app.listen(8000, function() {
  console.log("Server started on port 8000");
});




