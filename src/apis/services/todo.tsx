import { request } from "../request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type SuccessRepsonse } from "@/types/global";
import { type AxiosError } from "axios";
import { type Todo } from "@/types";

export const useGetTodos = ({ activity_id }: { activity_id: number }) => {
  const GET = async (): Promise<SuccessRepsonse<Todo[]>> => {
    const req = await request.get(`/todo-items?activity_group_id=${activity_id}`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<unknown>>({
    queryKey: ['TODOS', activity_id],
    queryFn: GET
  })
}

export const useAddTodo = () => {
  type Params = {
    activity_group_id: number;
    title: string;
    priority: string;
  }

  const queryClient = useQueryClient()

  const POST = async (params: Params) => {
    const req = await request.post('/todo-items', params)
    return req.data
  }

  return useMutation({
    mutationFn: POST,
    onSuccess: () => queryClient.invalidateQueries(['TODOS'])
  })
}

export const useUpdateTodo = <T extends {}>() => {
  type Params<T> = {
    id: number;
    payload: T
  }

  const queryClient = useQueryClient()

  const PATCH = async <T extends {} >(params: Params<T>) => {
    const req = await request.patch('/todo-items/' + params.id, params.payload)

    return req.data
  }

  return useMutation({
    mutationFn: PATCH<T>,
    onSuccess: () => queryClient.invalidateQueries(['TODOS'])
  })

}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  const DELETE = async (params: { id: number }) => {
    const req = await request.delete('/todo-items/' + params.id)
    return req.data
  }

  return useMutation({
    mutationFn: DELETE,
    onSuccess: () => queryClient.invalidateQueries(['TODOS'])
  })
}