import React from 'react';
import { ListTodo, BookOpen, Users, LogOut } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onSignOut: () => void;
}

export function Navigation({ currentSection, onNavigate, onSignOut }: NavigationProps) {
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'activities', label: 'Activities', icon: BookOpen },
    { id: 'contacts', label: 'Contacts', icon: Users },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  currentSection === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-1.5" />
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={onSignOut}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <LogOut className="w-5 h-5 mr-1.5" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}