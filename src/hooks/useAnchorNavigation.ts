import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAnchorNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Función para hacer scroll con offset del header
  const scrollWithOffset = (el: HTMLElement) => {
    const headerHeight = parseInt(
      document.documentElement.style.getPropertyValue('--header-height') || 
      '0', 10
    );

    const yCoordinate = el.offsetTop - headerHeight - 3;
    
    window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
  };

  // Función principal de navegación por ancla
  const navigateToAnchor = (to: string) => {
    const targetId = to.split("#")[1];

    if (pathname === '/') {
      // Si estamos en la homepage, hacer scroll directo
      const el = document.getElementById(targetId);
      if (el) {
        scrollWithOffset(el);
        window.history.pushState(null, "", `#${targetId}`);
      }
    } else {
      // Si estamos en otra página, navegar primero y luego hacer scroll
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          scrollWithOffset(el);
        }
      }, 120);
    }
  };

  // Función para manejar clicks en enlaces con ancla
  const handleAnchorClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    navigateToAnchor(to);
  };

  // Effect para manejar anclas en el URL cuando se carga la página
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

  return {
    navigateToAnchor,
    handleAnchorClick,
    scrollWithOffset
  };
};