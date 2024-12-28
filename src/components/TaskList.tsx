import React from 'react';
import { Check, Circle, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleTask(task.id)}
              className={clsx(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              )}
            >
              {task.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4 text-transparent" />
              )}
            </button>
            <span
              className={clsx(
                'text-gray-800',
                task.completed && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {format(new Date(task.due_date), 'MMM d, yyyy')}
            </span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}