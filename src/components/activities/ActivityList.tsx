import React from 'react';
import { Activity } from '../../types';
import { Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityListProps {
  activities: Activity[];
  onDelete: (id: string) => void;
}

export function ActivityList({ activities, onDelete }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white p-4 rounded-lg shadow-sm space-y-2"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-4 h-4 ${
                      value <= activity.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={() => onDelete(activity.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {activity.review && (
            <p className="text-gray-600 text-sm">{activity.review}</p>
          )}
          <p className="text-xs text-gray-500">
            Added on {format(new Date(activity.created_at), 'MMM d, yyyy')}
          </p>
        </div>
      ))}
    </div>
  );
}