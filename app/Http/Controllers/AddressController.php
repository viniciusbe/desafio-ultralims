<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $data = Address::all();
        return view('welcome', ['data' => $data]);
    }

    public function all()
    {
        $data = Address::all();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $adress = Address::create($request->all());
        return response()->json($adress, 201);
    }
}
