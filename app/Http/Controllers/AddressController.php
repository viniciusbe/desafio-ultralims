<?php

namespace App\Http\Controllers;

use App\Exceptions\AddressException;
use App\Models\Address;
use Illuminate\Database\QueryException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    public function all(Request $request)
    {
        $order_by = $request->query->get('order_by');
        $order_type = $request->query->get('order_type');

        if (empty($order_by)) {
            $order_by = 'created_at';
        }

        if (empty($order_type)) {
            $order_type = 'asc';
        }

        $data = DB::table("addresses")->orderBy($order_by, $order_type)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        try {
            $address = Address::create($request->all());
            return response()->json($address, 201);
        } catch (UniqueConstraintViolationException $err) {
            throw AddressException::zipCodeAlreadyExists();
        } catch (QueryException $err) {
            throw AddressException::invalidFields();
        }
    }
}
