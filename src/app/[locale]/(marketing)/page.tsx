export default function IndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Internship Application Tracker</h1>

      <p className="mt-4 text-lg text-gray-600">
        Track your internship and job applications in one place.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Add applications</h2>
          <p className="text-sm text-gray-600">Save company, role, status, and notes.</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Filter by status</h2>
          <p className="text-sm text-gray-600">Saved, Applied, Interview, Rejected, Offer.</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Dashboard</h2>
          <p className="text-sm text-gray-600">View stats for your applications.</p>
        </div>
      </div>
    </main>
  );
}
