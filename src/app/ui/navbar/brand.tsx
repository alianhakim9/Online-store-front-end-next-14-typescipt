import Link from "next/link";

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/home">
        <h4 className="font-bold text-black text-2xl md:text-3xl">OLSHOP</h4>
      </Link>
    </div>
  );
}
