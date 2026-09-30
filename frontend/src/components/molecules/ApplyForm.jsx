import { useState } from "react";
import Button from "../atoms/Button";
import { applyJob } from "../../services/applicationService";

function ApplyForm({ jobId }) {
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await applyJob(jobId, {
        cover_letter: coverLetter,
      });

      console.log("Lamaran berhasil:", data);
    } catch (error) {
      console.error("Gagal mengirim lamaran:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Apply</p>

        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Lamar Pekerjaan</h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">Tulis pesan singkat untuk memperkenalkan dirimu kepada recruiter.</p>
      </div>

      <div className="mt-6">
        <label htmlFor="cover-letter" className="mb-2 block text-sm font-semibold text-slate-700">
          Cover Letter
        </label>

        <textarea
          id="cover-letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Tulis alasan kamu tertarik dengan pekerjaan ini..."
          rows={6}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div className="mt-5 flex justify-end">
        <Button type="submit" className="bg-blue-600 px-6 py-2.5 hover:bg-blue-500">
          Kirim Lamaran
        </Button>
      </div>
    </form>
  );
}

export default ApplyForm;
