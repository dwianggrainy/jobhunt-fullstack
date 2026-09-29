<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Job;
use App\Http\Requests\ApplyJobRequest;
use GuzzleHttp\Promise\Create;

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

        $apply = Application::create([
            'job_id' => $job->id,
            'applicant_id' => $request->user()->id,
            'cover_letter' => $validatedData['cover_letter'] ?? null,
        ]);

        return response()->json([
            'message' => 'Lamaran berhasil dikirim',
            'application' => $apply
        ],201);
    }
}
