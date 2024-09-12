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
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          setLoading(false);
        } else {
          router.push('/login'); // Redirige al login si no está autenticado
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
