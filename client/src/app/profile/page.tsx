"use client"; // Marca este componente como Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:4000/check-auth', {
          method: 'GET',
          credentials: 'include', // Incluye las cookies en la solicitud
        });
        
        console.log('Estado de la respuesta:', res.status); // Verifica el estado
        const data = await res.json(); // Lee el contenido de la respuesta
        console.log('Contenido de la respuesta:', data);
  
        if (res.ok) {
          // Si la respuesta es OK, significa que el usuario está autenticado
          setLoading(false);
        } else {
          // Si no está autenticado, redirige al login
          router.push('/login');
        }
      } catch (error) {
        console.error("Error al verificar autenticación", error);
        setError("Error al verificar autenticación");
      }
    };
    checkAuth();
  }, [router]);
  

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl mb-4">Bienvenido a tu perfil</h1>
      <p>Has iniciado sesión exitosamente.</p>
    </div>
  );
}
