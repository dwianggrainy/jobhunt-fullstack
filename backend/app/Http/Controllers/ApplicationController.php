<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Job;
use App\Http\Requests\ApplyJobRequest;
use App\Http\Requests\UpdateApplicationStatusRequest;

class ApplicationController extends Controller
{
    public function apply(ApplyJobRequest $request, $id)
    {
        $validatedData = $request->validated();
        $job = Job::find($id);

        if (!$job) {
            return response()->json([
                'message' => 'Job tidak ditemukan'
            ], 404);
        }

        if ($request->user()->role !== 'job_seeker') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $alreadyApplied = Application::where('job_id', $job->id)
            ->where('applicant_id', $request->user()->id)
            ->exists();

        if ($alreadyApplied) {
            return response()->json([
                'message' => 'Kamu sudah melamar pekerjaan ini'
            ], 409);
        }

        $application = Application::create([
            'job_id' => $job->id,
            'applicant_id' => $request->user()->id,
            'cover_letter' => $validatedData['cover_letter'] ?? null,
        ]);

        return response()->json([
            'message' => 'Lamaran berhasil dikirim',
            'application' => $application
        ],201);
    }

    public function mine(Request $request)
    {
        $applications = Application::with('job')->where('applicant_id',$request->user()->id)->get();

        return response()->json([
            'applications' =>$applications
        ],200);
    }

    public function applicants(Request $request, $id)
    {
        $job=Job::find($id);
        if(!$job) {
            return response()->json([
                'message' => 'Job tidak ditemukan'
            ],404);
        }

        if ($job->recruiter_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $applications = Application::with('applicant')->where('job_id', $job->id)->get();

        return response()->json([
            'applications' => $applications
        ], 200);

    }

    public function updateStatus(UpdateApplicationStatusRequest $request, $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json([
                'message' => 'Lamaran tidak ditemukan'
            ], 404);
        }

        $job = Job::find($application->job_id);

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

        $application->update([
            'status' => $validatedData['status'],
        ]);

        return response()->json([
            'message' => 'Status lamaran berhasil diperbarui',
            'application' => $application
        ], 200);
    }
}
