import type { ActivityItem } from '@/types';

const Endpoint = 'https://todo.api.devcode.gethired.id' as const;

export const getActivity = async (): Promise<
  | {
      data: ActivityItem[];
    }
  | undefined
> => {
  const URL = `${Endpoint}/activity-groups?email=teamhendri18@gmail.com`;
  const request = await fetch(URL);
  return await request.json();
};

export const postActivity = async (): Promise<any> => {
  const URL = `${Endpoint}/activity-groups`;
  const request = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: 'teamhendri18@gmail.com',
      title: 'New Activity',
    }),
  });
  return await request.json();
};

export const deleteActivity = async ({ id }: { id: number }): Promise<any> => {
  const URL = `${Endpoint}/activity-groups/${id}`;
  const request = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await request.json();
};

export const getTodosTitle = async (id: string | undefined): Promise<any> => {
  const URL = `${Endpoint}/activity-groups/${id}`;
  const request = await fetch(URL);

  return await request.json();
};

export const editTodoTitle = async ({
  id,
  title,
}: {
  id: string | undefined;
  title: string;
}): Promise<any> => {
  const URL = `${Endpoint}/activity-groups/${id}`;
  const request = await fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });

  return await request.json();
};

export const getTodos = async ({
  id,
}: {
  id: string | undefined;
}): Promise<any> => {
  const URL = `${Endpoint}/todo-items?activity_group_id=${id}`;

  const request = await fetch(URL);

  return await request.json();
};

export const deleteItemTodo = async ({ id }: { id: number }): Promise<any> => {
  const URL = `${Endpoint}/todo-items/${id}`;

  const request = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await request.json();
};

export const updateCheckedTodo = async ({
  id,
  checkedValue,
}: {
  id: number;
  checkedValue: boolean;
}) => {
  const request = await fetch(`${Endpoint}/todo-items/${id}`, {
    method: 'PATCH',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({
      is_active: checkedValue,
    }),
  });

  return request.json();
};

export const postTodos = async ({
  activity_group_id,
  title,
  priority,
}: {
  activity_group_id: string;
  title: string;
  priority: string;
}): Promise<any> => {
  const request = await fetch(`${Endpoint}/todo-items`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      activity_group_id,
      title,
      priority,
    }),
  });

  return request.json();
};

export const updateTodos = async ({
  id,
  title,
  priority,
}: {
  id: number;
  title: string;
  priority: string;
}): Promise<any> => {
  const request = await fetch(`${Endpoint}/todo-items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title, priority }),
  });

  return request.json();
};
