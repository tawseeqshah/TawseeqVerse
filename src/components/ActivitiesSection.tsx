import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Activity } from '../types';
import { ActivityTabs } from './activities/ActivityTabs';
import { ActivityForm } from './activities/ActivityForm';
import { ActivityList } from './activities/ActivityList';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentTab, setCurrentTab] = useState<'books' | 'movies'>('books');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch activities');
      return;
    }

    setActivities(data || []);
  };

  const handleAddActivity = async (data: {
    title: string;
    rating: number;
    review: string;
  }) => {
    // Ensure type matches the database constraint
    const { error } = await supabase.from('activities').insert([
      {
        type: currentTab, // This will be either 'books' or 'movies' to match the constraint
        ...data,
      },
    ]);

    if (error) {
      toast.error('Failed to add activity');
      console.error('Error adding activity:', error);
      return;
    }

    toast.success(`${currentTab === 'books' ? 'Book' : 'Movie'} added successfully`);
    fetchActivities();
  };

  const handleDeleteActivity = async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete activity');
      return;
    }

    toast.success('Activity deleted successfully');
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredActivities = activities.filter((a) => a.type === currentTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
      </div>
      <ActivityTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add New {currentTab === 'books' ? 'Book' : 'Movie'}
          </h2>
          <ActivityForm type={currentTab} onSubmit={handleAddActivity} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your {currentTab === 'books' ? 'Books' : 'Movies'}
          </h2>
          <ActivityList
            activities={filteredActivities}
            onDelete={handleDeleteActivity}
          />
        </div>
      </div>
    </div>
  );
}