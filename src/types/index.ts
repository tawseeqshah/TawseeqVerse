export interface Task {
  id: string;
  title: string;
  completed: boolean;
  due_date: string;
  created_at: string;
  user_id: string;
}

export interface Activity {
  id: string;
  type: 'books' | 'movies'; // Updated to match database constraint
  title: string;
  rating: number;
  review: string;
  created_at: string;
  user_id: string;
}

export interface Contact {
  id: string;
  name: string;
  business: string;
  address: string;
  district: string;
  reference: string;
  phone: string;
  email: string;
  user_id: string;
  created_at: string;
}