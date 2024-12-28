import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { TaskList } from './TaskList';
import { AddTask } from './AddTask';
import { TaskTabs } from './tasks/TaskTabs';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { ListTodo } from 'lucide-react';
import { isToday, isFuture, isPast, startOfDay } from 'date-fns';

export function TaskSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTab, setCurrentTab] = useState<'today' | 'upcoming' | 'completed'>('today');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      toast.error('Failed to fetch tasks');
      return;
    }

    setTasks(data || []);
  };

  const filteredTasks = tasks.filter((task) => {
    const dueDate = new Date(task.due_date);
    switch (currentTab) {
      case 'today':
        return isToday(dueDate) && !task.completed;
      case 'upcoming':
        return isFuture(dueDate) && !isToday(dueDate) && !task.completed;
      case 'completed':
        return task.completed;
      default:
        return false;
    }
  });

  const handleAddTask = async (title: string, dueDate: string) => {
    const { error } = await supabase.from('tasks').insert([
      {
        title,
        due_date: dueDate,
        completed: false,
      },
    ]);

    if (error) {
      toast.error('Failed to add task');
      return;
    }

    toast.success('Task added successfully');
    fetchTasks();
  };

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to update task');
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) {
      toast.error('Failed to delete task');
      return;
    }

    toast.success('Task deleted successfully');
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ListTodo className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
      </div>
      <TaskTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      {currentTab !== 'completed' && <AddTask onAddTask={handleAddTask} />}
      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}