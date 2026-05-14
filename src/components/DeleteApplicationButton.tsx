'use client';

type Props = {
  action: () => Promise<void>;
};

export function DeleteApplicationButton({ action }: Props) {
  return (
    <form action={action}>
      <button
        className="rounded border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
        onClick={(e) => {
          const confirmed = window.confirm('Are you sure you want to delete this application?');

          if (!confirmed) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}
