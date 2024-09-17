"use client"; // Marca este componente como Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRecipe() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:4000/check-auth', {
          method: 'GET',
          credentials: 'include', // Incluye las cookies en la solicitud
        });

        // Verifica si el contenido de la respuesta es JSON
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json(); // Lee el contenido de la respuesta
          console.log('Contenido de la respuesta:', data);
          
          if (res.ok) {
            // Si la respuesta es OK, guarda los datos del usuario y termina la carga
            setUser(data.user);
            setLoading(false);
          } else {
            // Si no está autenticado, redirige al login
            router.push('/login');
          }
        } else {
          // Manejo de errores si la respuesta no es JSON
          console.error('Respuesta no es JSON:', await res.text());
          setError('Respuesta no es JSON.');
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
        <h1 className="text-xl mb-4">Crear y Compartir Receta</h1>
        <p>Esta página estará disponible próximamente.</p>
      </div>
    );
  }
  