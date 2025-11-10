import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { Icon } from '../Icons'
import { useLocation } from 'react-router-dom';

const navList = [
    {
        to: "/#about",
        label: "Nosotros",
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
  const navigate = useNavigate();
  const headerRef = useRef<any>(null);
  const [isClosing, setIsClosing] = useState(false);

  const openMenu = () => {
    setShowMobileMenu(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
        setShowMobileMenu(false);
        setIsClosing(false);

        //TODO
        // navigation(pathname)
    }, 300);
  };

  const renderBrainon24 = () => {
    return (
        <a
            href={'/#home'}
            onClick={(e) => {
                setShowMobileMenu(false);
                handleHashLinkClick(e, '/#home');
            }}
        >
            <h1>brainon24</h1>
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
    if (headerRef.current) {
      const headerHeight = headerRef?.current?.offsetHeight;
      
      document.documentElement.style.setProperty(
        '--header-height', 
        `${headerHeight}px`
      );
    }
  }, [pathname]);

  // useEffect to handle scrolling to anchor links with hash
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const timeoutId = setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        const el = document.getElementById(targetId);
        if (el) {
          scrollWithOffset(el);
        }
      }, 220);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  const scrollWithOffset = (el: any) => {
        const headerHeight = parseInt(
            document.documentElement.style.getPropertyValue('--header-height') || 
            '0', 10
        );

        const yCoordinate = el.offsetTop - headerHeight - 3;
        
        window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    };

    const handleHashLinkClick = (e: React.MouseEvent, to: string) => {
        e.preventDefault();
        const targetId = to.split("#")[1];

        if (pathname === '/') {
            const el = document.getElementById(targetId);
            if (el) {
                scrollWithOffset(el);
                window.history.pushState(null, "", `#${targetId}`);
            }
        } else {
            navigate(`/#${targetId}`);
            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    scrollWithOffset(el);
                }
            }, 120);
        }
    };

  return (
    <header className={styles.fixedHeader} ref={headerRef}>
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
                                    onClick={(e) => handleHashLinkClick(e, to)}
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
                        <Icon name="lock-02" />
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
                                            handleHashLinkClick(e, to);
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
