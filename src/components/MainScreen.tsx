import React from 'react';
import { Navigation } from './Navigation';
import { TaskSection } from './TaskSection';
import { ActivitiesSection } from './ActivitiesSection';
import { ContactsSection } from './ContactsSection';

interface MainScreenProps {
  onSignOut: () => void;
}

export function MainScreen({ onSignOut }: MainScreenProps) {
  const [currentSection, setCurrentSection] = React.useState('tasks');

  const renderSection = () => {
    switch (currentSection) {
      case 'tasks':
        return <TaskSection />;
      case 'activities':
        return <ActivitiesSection />;
      case 'contacts':
        return <ContactsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        onSignOut={onSignOut}
      />
      <main className="max-w-4xl mx-auto py-8 px-4">{renderSection()}</main>
    </div>
  );
}