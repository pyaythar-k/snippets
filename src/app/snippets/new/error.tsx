'use client';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: Props) {
  return <div>Something went wrong! Try again!</div>;
}
