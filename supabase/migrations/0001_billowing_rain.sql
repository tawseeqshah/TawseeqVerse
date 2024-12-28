/*
  # Initial Schema Setup for Tawseeq's Super To-Do App

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `completed` (boolean)
      - `due_date` (date)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
    
    - `activities`
      - `id` (uuid, primary key)
      - `type` (text, either 'book' or 'movie')
      - `title` (text)
      - `rating` (integer, 1-5)
      - `review` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
    
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `business` (text)
      - `address` (text)
      - `district` (text)
      - `reference` (text)
      - `phone` (text)
      - `email` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  completed boolean DEFAULT false,
  due_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('book', 'movie')),
  title text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own activities"
  ON activities
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business text,
  address text,
  district text,
  reference text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own contacts"
  ON contacts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_due_date_idx ON tasks(due_date);
CREATE INDEX IF NOT EXISTS activities_user_id_idx ON activities(user_id);
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON contacts(user_id);