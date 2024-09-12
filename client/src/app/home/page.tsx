"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push("/profile"); // Redirige a la página de perfil
  };

  const handleCreateRecipe = () => {
    router.push("/create-recipe"); // Redirige a la página para crear una receta
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">Bienvenido a Foodbook</h1>
      <div className="space-y-4">
        <button
          onClick={handleViewProfile}
          className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
        >
          Ver Perfil
        </button>
        <button
          onClick={handleCreateRecipe}
          className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600 transition"
        >
          Crear y Compartir Receta
        </button>
      </div>
    </div>
  );
}
