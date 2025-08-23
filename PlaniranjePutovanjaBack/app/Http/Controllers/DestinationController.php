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
        foreach ($destinations as $dest) {
            if ($dest->image) {
                $dest->image = asset('storage/' . $dest->image);
            }
        }

        return response()->json($destinations);
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
            'image' => 'nullable|image|max:2048'
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('destinations', 'public');
            $data['image'] = $path;
        }


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
    public function destroy($id)
    {
        $dest = Destination::findOrFail($id);
        $dest->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
