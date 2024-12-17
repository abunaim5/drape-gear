import NavLink from './NavLink';
import { navLinks } from './navLinks';

const Navbar = () => {
  return (
    <nav className="bg-transparent h-fit py-8 border-b-[1px]">
      <div className="container flex items-center">
        <div className='flex items-center gap-2 flex-1'>
          <div className="logo flex-1 text-2xl md:text-3xl font-semibold">
            RSIN
          </div>
        </div>
        <div className='hidden lg:block'>
          <ul className='flex items-center justify-center gap-8'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end gap-4 flex-1">
          <button className=''>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;