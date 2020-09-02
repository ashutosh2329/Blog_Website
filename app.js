// required the neccesary packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const load = require('lodash');
const mongoose = require("mongoose");
// provided default constant  
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac asndkl sdfbjks habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// app created
const app = express();
const posts = [];
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
app.get("/",function(req, res){
	Blog.find({title:"homeContent"},function(err,result){
		if(result.length === 0){
			Blog.insertOne(blog1, function(err){
				if(err){
					console.log(err);
				}else{
					console.log("Data saved");
				}
			})
			res.redirect("/");
		}else{
			res.render("home",{homeStartingContent:result, posts:posts});
		}
	})

})
// contact route
app.get("/contact",function(req, res){
	res.render("contact",{contactContent:contactContent});
})
// about developer route
app.get("/about",function(req, res){
	res.render("about",{aboutContent:aboutContent});
})

// compose route
app.get("/compose",function(req, res){
	res.render("compose");
})
// dynamic route
app.get('/posts/:userId', function (req, res) {
   let title = load.upperFirst(load.lowerCase(req.params.userId));
   let postRequired  =  posts.filter(function(post) {
	return post.postTitle == title;
});
   res.render("post",{postRequired:postRequired});
})
// compose post route
app.post("/compose", function(req, res){
	const post = {
		postTitle: req.body.postTitle,
		postBody: req.body.postBody
	};
	posts.push(post);
	res.redirect("/");
})
// server running port
app.listen(8000, function() {
  console.log("Server started on port 8000");
});




