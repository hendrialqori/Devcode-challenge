export type ActivityItem = {
  id: number;
  title: string;
  created_at: string;
};

export type PriorityType = 'very-high' | 'high' | 'normal' | 'low' | 'very-low';

export type Todo = {
  is_active: number | boolean;
  priority: PriorityType;
  actionDelete: (params: Pick<ActivityItem, 'id' | 'title'>) => void;
  actionUpdate: (params: Pick<Todo, 'id' | 'title' | 'priority'>) => void;
} & Omit<ActivityItem, 'created_at'>;
