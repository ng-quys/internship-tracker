import Link from 'next/link';
import {
  createApplication,
  deleteApplication,
  getApplications,
} from '@/actions/applicationActions';
import { ApplicationStatusFilter } from '@/components/ApplicationStatusFilter';
import { DeleteApplicationButton } from '@/components/DeleteApplicationButton';
import { SubmitButton } from '@/components/SubmitButton';

const statuses = ['Saved', 'Applied', 'Interview', 'Rejected', 'Offer'];

const statusStyles: Record<string, string> = {
  Saved: 'bg-gray-100 text-gray-700',
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-yellow-100 text-yellow-800',
  Rejected: 'bg-red-100 text-red-700',
  Offer: 'bg-green-100 text-green-700',
};

type Props = {
  searchParams: Promise<{
    status?: string;
    q?: string;
  }>;
};

export default async function ApplicationsPage({ searchParams }: Props) {
  const { status = 'All', q = '' } = await searchParams;
  const applications = await getApplications(status, q);
  const allApplications = await getApplications();

  const stats = {
    total: allApplications.length,
    Saved: allApplications.filter((app) => app.status === 'Saved').length,
    Applied: allApplications.filter((app) => app.status === 'Applied').length,
    Interview: allApplications.filter((app) => app.status === 'Interview').length,
    Rejected: allApplications.filter((app) => app.status === 'Rejected').length,
    Offer: allApplications.filter((app) => app.status === 'Offer').length,
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Applications</h1>
        <p className="mt-2 text-gray-600">
          Add, search, filter, and manage your internship applications.
        </p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        {statuses.map((item) => (
          <div key={item} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{item}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats[item as keyof typeof stats]}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Add application</h2>

        <form action={createApplication} className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            name="company"
            placeholder="Company"
            required
          />

          <input
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            name="position"
            placeholder="Position"
            required
          />

          <input
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            name="location"
            placeholder="Location"
          />

          <input
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            name="jobUrl"
            placeholder="Job URL"
          />

          <input
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            name="appliedDate"
            type="date"
          />

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            name="status"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <textarea
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 sm:col-span-2"
            name="notes"
            placeholder="Notes"
          />

          <SubmitButton pendingText="Adding...">Add job</SubmitButton>
        </form>
      </section>

      <form className="mt-8 flex gap-2" action="/applications">
        {status !== 'All' && <input type="hidden" name="status" value={status} />}

        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
          name="q"
          placeholder="Search by company or position..."
          defaultValue={q}
        />

        <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
          Search
        </button>

        {(q || status !== 'All') && (
          <Link
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
            href="/applications"
          >
            Clear
          </Link>
        )}
      </form>

      <ApplicationStatusFilter currentStatus={status} searchQuery={q} />

      <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {applications.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-4xl">📭</p>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">No applications found.</h3>
            <p className="mt-1 text-gray-600">
              Start tracking your internship applications by adding your first job.
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <article key={app.id} className="border-b border-gray-200 p-6 last:border-b-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">{app.position}</h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[app.status] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="mt-1 font-medium text-gray-700">{app.company}</p>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    {app.location && <p>📍 {app.location}</p>}

                    {app.appliedDate && <p>📅 Applied date: {app.appliedDate}</p>}

                    {app.jobUrl && (
                      <p>
                        🔗{' '}
                        <a
                          className="text-blue-600 underline hover:text-blue-800"
                          href={app.jobUrl}
                          target="_blank"
                        >
                          View job posting
                        </a>
                      </p>
                    )}
                  </div>

                  {app.notes && (
                    <p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                      {app.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    className="rounded-lg border border-blue-200 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50"
                    href={`/applications/${app.id}/edit`}
                  >
                    Edit
                  </Link>

                  <DeleteApplicationButton
                    action={async () => {
                      'use server';
                      await deleteApplication(app.id);
                    }}
                  />
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
