import { ApiResponse } from '@/types/api';
import { QuizResponseType } from '@/types/response';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetQuiz(level: string) {
  const { data, isLoading } = useQuery<ApiResponse<QuizResponseType[]>>({
    queryKey: ['question-quiz'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=19&difficulty=${level}&type=multiple`,
      );

      return data;
    },
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
}
