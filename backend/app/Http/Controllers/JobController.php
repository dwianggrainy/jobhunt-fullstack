<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::withCount('applications');

        $search = $request->query('search');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        $type = $request->query('type');

        if ($type) {
            $query->where('type', $type);
        }

        $location = $request->query('location');

        if ($location) {
            $query->where('location', 'like', "%{$location}%");
        }

        $sort = $request->query('sort');

        if ($sort === 'newest') {
            $query->orderBy('created_at', 'desc');
        }

        if ($sort === 'most_applicants') {
            $query->orderBy('applications_count', 'desc');
        }

        $jobs = $query->paginate(10);

        return response()->json([
            'jobs' => $jobs
        ], 200);

    }

    public function store(StoreJobRequest $request)
    {
        $validatedData = $request->validated();

        $job=Job::create([
            'recruiter_id' => $request->user()->id,
            'title' => $validatedData['title'],
            'company' => $validatedData['company'],
            'location' => $validatedData['location'],
            'type' => $validatedData['type'],
            'description' => $validatedData['description'],
            'requirements' => $validatedData['requirements'] ?? null,
            'salary_min' => $validatedData['salary_min'] ?? null,
            'salary_max' => $validatedData['salary_max'] ?? null,
            'is_active' => $validatedData['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Job berhasil dibuat',
            'job' => $job
        ], 201);

    }

    public function show($id)
    {
        $job=Job::find($id);
        if(!$job){
            return response()->json([
                'message' => 'Job tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'job' => $job
        ], 200);
    }

    public function mine(Request $request)
    {
        $jobs = Job::where('recruiter_id', $request->user()->id)->get();

        return response()->json([
            'jobs' => $jobs
        ], 200);
    }

    public function update(UpdateJobRequest $request, $id)
    {
        $job = Job::find($id);

        if (!$job) {
            return response()->json([
                'message' => 'Job tidak ditemukan'
            ], 404);
        }

        if ($job->recruiter_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $validatedData = $request->validated();

        $job->update([
            'title' => $validatedData['title'],
            'company' => $validatedData['company'],
            'location' => $validatedData['location'],
            'type' => $validatedData['type'],
            'description' => $validatedData['description'],
            'requirements' => $validatedData['requirements'] ?? null,
            'salary_min' => $validatedData['salary_min'] ?? null,
            'salary_max' => $validatedData['salary_max'] ?? null,
            'is_active' => $validatedData['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Job berhasil diperbarui',
            'job' => $job
        ], 200);
    }

    public function destroy(Request $request,$id)
    {
        $job = Job::find($id);

        if (!$job){
            return response()->json([
                'message' => 'Job tidak ditemukan'
            ],404);
        }

        if ($job->recruiter_id !== $request->user()->id){
            return response()->json([
                'message' => 'Unauthorized'
            ],403);
        }

        $job->delete();

        return response()->json([
            'message' => 'Job berhasil dihapus'
        ],200);

    }
}
