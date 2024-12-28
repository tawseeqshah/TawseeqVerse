import React from 'react';
import { Book, Film } from 'lucide-react';

interface ActivityTabsProps {
  currentTab: 'books' | 'movies';
  onTabChange: (tab: 'books' | 'movies') => void;
}

export function ActivityTabs({ currentTab, onTabChange }: ActivityTabsProps) {
  const tabs = [
    { id: 'books', label: 'Books', icon: Book },
    { id: 'movies', label: 'Movies', icon: Film },
  ] as const;

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentTab === id
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-5 h-5 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
}