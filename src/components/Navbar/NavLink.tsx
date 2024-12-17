'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={`text-[#00233F] ${
          isActive ? 'font-semibold' : ''
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavLink;