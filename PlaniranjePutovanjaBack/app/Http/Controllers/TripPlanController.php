<?php

namespace App\Http\Controllers;

use App\Models\TripPlan;
use Illuminate\Http\Request;

class TripPlanController extends Controller
{
    // GET /api/trip-plans
    public function index(Request $request)
    {
        // Vrati samo planove za logovanog usera
        //return TripPlan::where('user_id', $request->user()->id)->get();
        $plans = TripPlan::with(['destinations', 'attractions'])
            ->where('user_id', $request->user()->id)
            ->get();
        return response()->json($plans);

    }

    // POST /api/trip-plans
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'budget' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'destination_ids' => 'array',
            'destination_ids.*' => 'exists:destinations,id',
            'attraction_ids' => 'array',
            'attraction_ids.*' => 'exists:attractions,id',
        ]);

        $tripPlan = TripPlan::create([
            'user_id' => $request->user()->id, // Sanctum
            'title' => $validated['title'],
            'budget' => $validated['budget'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);

        if (!empty($validated['destination_ids'])) {
            $tripPlan->destinations()->sync($validated['destination_ids']);
        }

        if (!empty($validated['attraction_ids'])) {
            $tripPlan->attractions()->sync($validated['attraction_ids']);
        }

        return response()->json($tripPlan->load('destinations','attractions'), 201);
    }


    // GET /api/trip-plans/{id}
    public function show(TripPlan $tripPlan)
    {
        return $tripPlan;
    }

    // PUT /api/trip-plans/{id}
    public function update(Request $request, TripPlan $tripPlan)
    {
        $this->authorizeTripPlan($tripPlan, $request);

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'budget' => 'sometimes|numeric',
            'destination_id' => 'sometimes|exists:destinations,id',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        $tripPlan->update($data);

        return response()->json($tripPlan);
    }

    // DELETE /api/trip-plans/{id}
    public function destroy(Request $request, TripPlan $tripPlan)
    {
        $this->authorizeTripPlan($tripPlan, $request);

        $tripPlan->delete();

        return response()->json(['message' => 'Trip plan deleted']);
    }

    private function authorizeTripPlan(TripPlan $tripPlan, Request $request)
    {
        if ($tripPlan->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized');
        }
    }
}

