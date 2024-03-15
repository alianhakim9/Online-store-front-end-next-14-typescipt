"use client";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="flex items-center justify-center flex-col h-[50vh] gap-2">
      <h1 className="text-5xl font-bold text-red-400">Terjadi Kesalahan</h1>
      <h3 className="text-2xl font-semibold">{error.message}</h3>
      <div>
        <Button onClick={reset} size="sm" className="rounded-xl shadow-sm">
          Refresh
        </Button>
      </div>
    </div>
  );
}
