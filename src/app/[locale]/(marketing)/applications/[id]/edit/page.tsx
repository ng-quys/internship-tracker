import Link from 'next/link';
import { getApplicationById, updateApplication } from '@/actions/applicationActions';
import { SubmitButton } from '@/components/SubmitButton';

const statuses = ['Saved', 'Applied', 'Interview', 'Rejected', 'Offer'];

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({ params }: Props) {
  const { id } = await params;
  const application = await getApplicationById(Number(id));

  if (!application) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">Application not found</h1>
        <Link className="mt-4 inline-block text-blue-600 underline" href="/applications">
          Back to applications
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold">Edit application</h1>

      <form action={updateApplication} className="mt-8 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={application.id} />

        <input
          className="rounded border px-3 py-2"
          name="company"
          defaultValue={application.company}
          placeholder="Company"
          required
        />

        <input
          className="rounded border px-3 py-2"
          name="position"
          defaultValue={application.position}
          placeholder="Position"
          required
        />

        <input
          className="rounded border px-3 py-2"
          name="location"
          defaultValue={application.location ?? ''}
          placeholder="Location"
        />

        <input
          className="rounded border px-3 py-2"
          name="jobUrl"
          defaultValue={application.jobUrl ?? ''}
          placeholder="Job URL"
        />

        <input
          className="rounded border px-3 py-2"
          name="appliedDate"
          type="date"
          defaultValue={application.appliedDate ?? ''}
        />

        <select
          className="rounded border px-3 py-2"
          name="status"
          defaultValue={application.status}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <textarea
          className="rounded border px-3 py-2 sm:col-span-2"
          name="notes"
          defaultValue={application.notes ?? ''}
          placeholder="Notes"
        />

        <div className="flex gap-3 sm:col-span-2">
          <SubmitButton pendingText="Saving...">Save changes</SubmitButton>

          <Link className="rounded border px-4 py-2" href="/applications">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
