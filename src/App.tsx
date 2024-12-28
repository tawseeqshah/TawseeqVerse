import React from 'react';
import { Auth } from './components/Auth';
import { MainScreen } from './components/MainScreen';
import { Toaster, toast } from 'react-hot-toast';
import { ListTodo } from 'lucide-react';
import { signOut } from './lib/auth';
import { useAuth } from './lib/hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-3 mb-8">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Tawseeq's Super To-Do
            </h1>
          </div>
          <Auth />
        </div>
        <Toaster position="bottom-right" />
      </div>
    );
  }

  return (
    <>
      <MainScreen onSignOut={handleSignOut} />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;