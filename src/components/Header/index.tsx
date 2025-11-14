import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation';
import styles from './styles.module.css'
import { Icon } from '../Icons'
import logo from '../../assets/brainon24-logo.png'

const navList = [
    {
        to: "/#about",
        label: "Nosotros",
        isAncle: true
    },
    {
        to: "/#services",
        label: "Servicios",
        isAncle: true
    },
    {
        to: "/#contact",
        label: "Contacto",
        isAncle: true
    },
    {
        to: "/",
        label: "Blog",
        isAncle: false
    }
]

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { pathname } = useLocation();
  const { handleAnchorClick } = useAnchorNavigation();
  const [isClosing, setIsClosing] = useState(false);

  const openMenu = () => {
    setShowMobileMenu(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
        setShowMobileMenu(false);
        setIsClosing(false);
    }, 300);
  };

  const renderBrainon24 = () => {
    return (
        <a
            href={'/#home'}
            onClick={(e) => {
                setShowMobileMenu(false);
                handleAnchorClick(e, '/#home');
            }}
        >
            {/* <h1>brainon24</h1> */}
            <img src={ logo } alt='Logo' width={150} />
        </a>
    )
  }

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  useLayoutEffect(() => {
      document.documentElement.style.setProperty(
        '--header-height', 
        // `${headerHeight}px`
        `100px`
      );
  }, [pathname]);



  return (
    <header className={styles.fixedHeader}>
        <div className={styles.container}>
            { renderBrainon24() }

            <div className={styles.navbarContainer}>
                <div className={styles.navbar}>
                    {
                        navList.map(({label, to, isAncle}, idx) => (
                            isAncle ?
                                <a
                                    href={to}
                                    key={to + label + idx}
                                    onClick={(e) => handleAnchorClick(e, to)}
                                >
                                    <p className={styles.nav}>{label}</p>
                                </a>
                                :
                                <Link to={to} key={to + label + idx}>
                                    <p className={styles.nav}>{label}</p>
                                </Link>
                        ))
                    }
                </div>
                <button 
                    className={styles.desktopMenuBtn}
                    onClick={() => openMenu()}
                >
                    <Icon name='menu' />
                </button>
                <Link to="/login">
                    <div className={styles.loginButton}>
                        {/* <Icon name="lock-02" /> */}
                        <Icon name="usuario-check" />
                    </div>
                </Link>
            </div>
        </div>

        {
            showMobileMenu && (
                <div
                    className={`${styles.mobileNavbarContainer} ${
                    isClosing ? styles.fadeOut : styles.fadeIn
                    }`}
                >
                    <div className={styles.closeMenuContainer}>
                        <button
                            className={styles.mobileCloseMenuBtn}
                            onClick={() => {
                                closeMenu()
                            }}
                        >
                            <Icon name='x' />
                        </button>
                    </div>
                    <div className={styles.brainon24Centered}>
                        { renderBrainon24() }
                    </div>

                    <div className={styles.mobileNavbar}>
                        {
                            navList.map(({label, to, isAncle}) => (
                                isAncle
                                    ? <a
                                        key={to+label}
                                        href={to}
                                        onClick={(e) => {
                                            setShowMobileMenu(false);
                                            handleAnchorClick(e, to);
                                        }}
                                    >
                                        <p className={styles.nav}>{label}</p>
                                    </a>
                                    : <Link to={to} key={to+label}>
                                        <p className={styles.nav}>{label}</p>
                                    </Link>
                            ))
                        }
                    </div>
                </div>
            )
        }
    </header>
  )
}
