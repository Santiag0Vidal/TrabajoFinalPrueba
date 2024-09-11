"use client"; // Asegura que este archivo es un Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa correctamente useRouter para app directory

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Hook useRouter para navegar después del registro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Redirigir al login después del registro exitoso
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Error al registrar");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
