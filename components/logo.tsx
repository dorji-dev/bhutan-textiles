import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <Image
          src="/logo.png"
          alt="Bhutan Art Logo"
          width={48}
          height={48}
          priority
        />
      </div>
      <span className="font-heading text-2xl font-bold text-primary">
        Bhutan Art
      </span>
    </Link>
  );
}