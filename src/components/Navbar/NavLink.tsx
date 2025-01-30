'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={`text-[#00233F] ${isActive ? 'font-semibold' : ''} ${isActive ? 'text-cyan-500' : ''} hover:text-cyan-500 transition-all duration-[400ms]`}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavLink;