import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    // 1. Fonction pour calculer la hauteur réelle sans la barre d'adresse mobile
    const setVh = () => {
      // On prend 1% de la hauteur de la fenêtre
      const vh = window.innerHeight * 0.01;
      // On l'injecte dans la racine du document (le <html>)
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 2. Exécution immédiate au montage
    setVh();

    // 3. Mise à jour uniquement lors d'un vrai redimensionnement (ex: rotation du téléphone)
    // On évite de le faire au scroll pour ne pas recréer le "saut"
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  return <RouterProvider router={router} />;
}