import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <Image
          src="/logo.png"
          alt="Zorig Online Logo"
          width={48}
          height={48}
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-2xl font-bold text-primary">
          Zorig Online
        </span>
        <span className="text-xs text-neutral-600">
          Bhutanese Crafts Marketplace
        </span>
      </div>
    </Link>
  );
}