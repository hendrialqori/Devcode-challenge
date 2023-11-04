import { request } from "../request";
import { type SuccessRepsonse } from "@/types/global";
import { type Activity } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";


export const useGetActivities = () => {
  const GET = async (): Promise<SuccessRepsonse<Activity[]> | undefined> => {
    const req = await request.get('/activity-groups?email=teamhendri18@gmail.com')
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<unknown>>({
    queryKey: ['ACTIVITIES'],
    queryFn: GET
  })
}

export const useAddActivity = () => {
  const queryClient = useQueryClient()

  const PAYLOAD = {
    email: 'teamhendri18@gmail.com',
    title: 'New Activity',
  }

  const POST = async () => {
    const req = await request.post('/activity-groups', PAYLOAD)
    return req.data
  }

  return useMutation({
    mutationFn: POST,
    onSuccess: () => queryClient.invalidateQueries(['ACTIVITIES'])
  })
}

export const useDeleteActivity = () => {
  const queryClient = useQueryClient()

  const DELETE = async ({ id }: { id: number }) => {
    const req = await request.delete('/activity-groups/' + id)
    return req.data
  }

  return useMutation({
    mutationFn: DELETE,
    onSuccess: () => queryClient.invalidateQueries(['ACTIVITIES'])
  })
}