<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers;
    protected $redirectTo = '/';

    protected function authenticated(Request $request, $user)
    {
        if ($user->isAdmin()) {
           $this->redirectTo = '/fragrances'; 
        } else {
           $this->redirectTo = '/';
        }
    }
}
