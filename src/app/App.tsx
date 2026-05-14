import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    let lastWidth = window.innerWidth;
    
    // 1. Fonction pour calculer la hauteur réelle
    const setVh = () => {
      const currentWidth = window.innerWidth;
      const isMobile = currentWidth <= 768;
      
      // Sur mobile, on met à jour SEULEMENT si la largeur change (rotation)
      // Cela évite que la hauteur change quand la barre d'adresse disparaît au scroll
      if (!isMobile || currentWidth !== lastWidth) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastWidth = currentWidth;
      }
    };

    // 2. Exécution immédiate au montage
    const initialVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${initialVh}px`);

    // 3. Mise à jour raisonnée
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastWidth = window.innerWidth;
      }, 100);
    });

    return () => window.removeEventListener('resize', setVh);
  }, []);

  return <RouterProvider router={router} />;
}