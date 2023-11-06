import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './contexts/authContext';
import Routes from './routes';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Routes />
    </AuthProvider>
  );
}
