// src/pages/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión con:', { email, password });
    // navigate('/dashboard');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo de Partículas */}
      <ParticlesBackground />

      {/* Contenedor de la Card */}
      <div className="relative z-10 w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
        {/* Este div actuará como el fondo borroso y semi-transparente de la tarjeta */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-lg">
          {/* backdrop-blur-md aplica el desenfoque a lo que está DETRÁS de este div */}
          {/* bg-white/30 le da un color blanco semi-transparente */}
        </div>

        {/* El contenido de la Card (formulario, títulos, etc.) se coloca en una capa superior */}
        {/* Es importante que este div no tenga el efecto backdrop-blur directamente */}
        <Card className="relative z-20 p-6 bg-transparent rounded-lg"> {/* bg-transparent para que se vea el blur del div de abajo */}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-blue-700">Iniciar Sesión</CardTitle>
            <CardDescription className="text-md text-gray-600 mt-2">
              Accede a tu asistente IA avanzado
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.correo@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;