// app/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Función para verificar si la cookie de sesión está presente
async function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get('token'); // Asume que usas una cookie llamada 'token' para autenticación
  if (!token) return false;

  try {
    const res = await fetch(`${req.nextUrl.origin}/api/check-auth`, {
      headers: {
        'Cookie': `token=${token}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const publicPaths = ['/login', '/register', '/'];
  const { pathname } = req.nextUrl;

  if (publicPaths.includes(pathname) || await isAuthenticated(req)) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Aplica middleware a todas las rutas
export const config = {
  matcher: ['/profile/:path*', '/create-recipe/:path*', '/'],
};
