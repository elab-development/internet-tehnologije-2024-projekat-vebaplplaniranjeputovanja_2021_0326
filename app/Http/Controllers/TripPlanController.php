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
        return TripPlan::all();

    }

    // POST /api/trip-plans
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'budget' => 'required|numeric',
            'destination_id' => 'required|exists:destinations,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $tripPlan = TripPlan::create([
            'user_id' => $request->user()->id, // NE uzima iz body-ja
            'title' => $data['title'],
            'budget' => $data['budget'],
            'destination_id' => $data['destination_id'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
        ]);

        return response()->json($tripPlan, 201);
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

