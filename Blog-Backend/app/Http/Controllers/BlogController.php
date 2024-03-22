<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blogs;

class BlogController extends Controller
{
    function blog(Request $req){
        $blog = new Blogs;
        $blog->title = $req->input("title");
        $blog->body = $req->input("body");
        $blog->author = $req->input("author");
        $blog->file_path = $req->file('file')->store('blogsImg'); 

        $blog->save();

        return response()->json($blog, 201);
    }
    function list(){
        return Blogs :: all();
    }
    function delete ($id){
        $result= Blogs :: where('id',$id)->delete();
        if ($result){
            return ["result=> Blog has been deleted"];
        }
        else{
        return ["result=> This blog already removed"];
        }
    }
    function getBlog($id){
        return Blogs :: find($id);
    }
    function updateBlog(Request $req, $id)
    {
        // Find the blog post by its ID
        $blog = Blogs::find($id);

        // Check if the blog post exists
        if (!$blog) {
            return response()->json(['error' => 'Blog post not found'], 404);
        }

        // Update the blog post with the new data from the request
        // Note: You can access the updated data from the request directly
        $blog->title = $req->input('title');
        $blog->body = $req->input('body');
        $blog->author = $req->input('author');
        $blog->save();

        // Return the updated blog post
        return response()->json($blog, 200);
    }
    function search ($key){
        return Blogs :: where ('title', 'Like',"%$key%")->get();

    }
} 
