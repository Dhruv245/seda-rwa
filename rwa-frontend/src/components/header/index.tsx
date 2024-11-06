import logo from '@/assets/images/logo.png';
import { ConnectButton } from '@particle-network/connectkit';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles['nav-start']}>
          <Link href="/">
            {/* Image without the <a> tag */}
            <img src="rwa.png" alt="Marketplace Logo" width={60} height={60} className={styles['nav-start-logo']} />
          </Link>
          <div className={styles['nav-start-slogan']}>RWA Marketplace</div>
        </div>

        <div className={styles['nav-center']}>
          {/* Navigation Links without <a> tag */}
          <Link href="/mint" className={styles.navLink}>Tokenize asset</Link>
          {/* <Link href="/list-token" className={styles.navLink}>List Token</Link> */}
          {/* <Link href="/buy" className={styles.navLink}>Buy</Link> */}
          <Link href="/sell" className={styles.navLink}>Sell</Link>


          <a href="https://swapi.dev/api/vehicles/?format=json" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            API Reference
          </a>
        </div>

        <div className={styles['nav-end']}>
          <ConnectButton />
        </div>
      </nav>
    </header>
  );
}
