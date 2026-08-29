'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';
const Header = () => {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={css.container_header}>
        <Link href="/">
          <svg
            className={`${css.icon} ${css['icon-Logo']}`}
            aria-label="TravelTrucks"
          >
            <use href="/sprite.svg#icon-Logo"></use>
          </svg>
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.list_navigation}>
            <li className={css.item}>
              <Link
                href="/"
                className={pathname === '/' ? css.active : undefined}
              >
                Home
              </Link>
            </li>
            <li className={css.item}>
              <Link
                href="/catalog"
                className={pathname === '/catalog' ? css.active : undefined}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
