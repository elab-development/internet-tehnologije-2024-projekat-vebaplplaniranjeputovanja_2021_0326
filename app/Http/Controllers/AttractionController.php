<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use Illuminate\Http\Request;

class AttractionController extends Controller
{
    // GET /api/attractions
    public function index()
    {
        return Attraction::all();
    }

    // POST /api/attractions
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'nullable|string',
        ]);

        $attraction = Attraction::create($data);

        return response()->json($attraction, 201);
    }

    // GET /api/attractions/{attraction}
    public function show(Attraction $attraction)
    {
        return $attraction;
    }

    // PUT /api/attractions/{attraction}
    public function update(Request $request, Attraction $attraction)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|integer',
            'destination_id' => 'sometimes|exists:destinations,id',
            'description' => 'sometimes|string',
        ]);

        $attraction->update($data);

        return response()->json($attraction);
    }

    // DELETE /api/attractions/{attraction}
    public function destroy(Attraction $attraction)
    {
        $attraction->delete();

        return response()->json(['message' => 'Attraction deleted']);
    }
}
