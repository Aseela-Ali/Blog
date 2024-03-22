<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Change "Users" to "User" for consistency and correct class name
use Illuminate\Support\Facades\Hash; // Add semicolon at the end

class UserController extends Controller
{
    function register(Request $req){ // Correct capitalization of "Request" and "$req"
        $user = new User; // Change "Users" to "User"
        $user->name = $req->input("name");
        $user->email = $req->input("email");
        $user->password = Hash::make($req->input("password")); // Correct capitalization of "Hash" and "::"
        $user->save();
        return $user;
    }

    function login(Request $req){
        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return ["error" => "Email or Password does not match"]; // Added semicolon at the end of the line
        }
        return $user;
    }
}
