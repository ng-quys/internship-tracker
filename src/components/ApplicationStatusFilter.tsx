'use client';

import { useRouter } from 'next/navigation';

const statuses = ['Saved', 'Applied', 'Interview', 'Rejected', 'Offer'];

type Props = {
  currentStatus: string;
  searchQuery: string;
};

export function ApplicationStatusFilter({ currentStatus, searchQuery }: Props) {
  const router = useRouter();

  return (
    <div className="mt-4">
      <label className="font-medium">Filter by status: </label>

      <select
        className="ml-2 rounded border px-3 py-2"
        value={currentStatus}
        onChange={(e) => {
          const params = new URLSearchParams();

          if (e.target.value !== 'All') {
            params.set('status', e.target.value);
          }

          if (searchQuery) {
            params.set('q', searchQuery);
          }

          router.push(`/applications?${params.toString()}`);
        }}
      >
        <option value="All">All</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
