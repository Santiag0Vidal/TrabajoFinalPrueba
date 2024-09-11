"use client"; // Esto marca el componente como Client Component

import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Hacer la solicitud al backend cuando el componente se monte
  useEffect(() => {
    fetch('http://localhost:4000') // URL del backend
      .then((res) => res.text())
      .then((data) => {
        setResult(data); // Almacena la respuesta del backend
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al conectar con el backend", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Conexión con el Backend</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <p>{result ? result : "No se recibió respuesta del servidor."}</p>
        )}
      </main>
    </div>
  );
}
