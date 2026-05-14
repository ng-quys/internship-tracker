'use client';

import { useFormStatus } from 'react-dom';

type Props = {
  children: React.ReactNode;
  pendingText?: string;
};

export function SubmitButton({ children, pendingText = 'Saving...' }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-fit rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      disabled={pending}
    >
      {pending ? pendingText : children}
    </button>
  );
}
