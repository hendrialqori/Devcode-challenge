export type ActivityItem = {
  id: number;
  title: string;
  created_at: string;
};

export type Priority = 'very-high' | 'high' | 'normal' | 'low' | 'very-low';

export type Activity = {
  id: number;
  title: string;
  created_at?: string;
}

export type Todo = Activity & {
  is_active: number
  priority: Priority
}