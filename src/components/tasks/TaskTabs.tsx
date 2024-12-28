import React from 'react';
import { CalendarDays, CheckCircle2, ListTodo } from 'lucide-react';
import { format } from 'date-fns';

interface TaskTabsProps {
  currentTab: 'today' | 'upcoming' | 'completed';
  onTabChange: (tab: 'today' | 'upcoming' | 'completed') => void;
}

export function TaskTabs({ currentTab, onTabChange }: TaskTabsProps) {
  const tabs = [
    { id: 'today', label: "Today's Tasks", icon: ListTodo },
    { id: 'upcoming', label: 'Upcoming Tasks', icon: CalendarDays },
    { id: 'completed', label: 'Completed Tasks', icon: CheckCircle2 },
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