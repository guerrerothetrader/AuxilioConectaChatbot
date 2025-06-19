// src/pages/Register.jsx (o donde tengas tus páginas de registro)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Podrías añadir un estado para confirmar contraseña si lo necesitas
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica de registro,
    // por ejemplo, enviar email y password a una API.
    console.log('Intentando registrar con:', { email, password });
    // Redirigir al usuario después de un registro exitoso, quizás a la página de login o al dashboard.
    // navigate('/login');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo de Partículas */}
      <ParticlesBackground />

      {/* Contenedor principal de la Card de Registro */}
      <div className="relative z-10 w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
        {/* Este div actúa como el fondo borroso y semi-transparente de la tarjeta */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-lg">
          {/* bg-white/30 le da un color blanco semi-transparente */}
          {/* backdrop-blur-md aplica el desenfoque a lo que está DETRÁS de este div */}
        </div>

        {/* El contenido de la Card (formulario, títulos, etc.) se coloca en una capa superior */}
        <Card className="relative z-20 p-6 bg-transparent rounded-lg"> {/* bg-transparent para que se vea el blur */}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-blue-700">Crear cuenta</CardTitle>
            <CardDescription className="text-md text-gray-600 mt-2">
              Únete a AuxilioConecta y prepárate para cualquier emergencia.
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
              {/* Puedes añadir un campo de confirmación de contraseña aquí si lo deseas */}
              {/*
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              */}
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
              >
                Registrar
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Inicia Sesión aquí.
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;