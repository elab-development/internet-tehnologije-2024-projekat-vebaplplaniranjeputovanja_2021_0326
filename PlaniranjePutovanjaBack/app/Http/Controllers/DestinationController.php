<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    // GET /api/destinations
    public function index()
    {
        return Destination::all();
    }

    // POST /api/destinations

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Samo admin može da kreira destinacije.'], 403);
        }
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $destination = Destination::create($data);

        return response()->json($destination, 201);
    }

    // GET /api/destinations/{destination}
    public function show(Destination $destination)
    {
        return $destination;
    }

    // PUT /api/destinations/{destination}
    public function update(Request $request, Destination $destination)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'country' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
        ]);

        $destination->update($data);

        return response()->json($destination);
    }

    // DELETE /api/destinations/{destination}
    public function destroy(Destination $destination)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $destination->delete();

        return response()->json(['message' => 'Destination deleted']);
    }
}
