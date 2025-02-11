<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected function registered(Request $request, $user)
    {
        if ($user->isAdmin()) {
            // ... any admin-specific registration logic
        } else {
            // ... any customer-specific registration logic
        }
    }
}
