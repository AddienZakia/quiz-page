import { useMutation } from '@tanstack/react-query';
import { SignInResponse, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useLoginHook() {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    SignInResponse | null,
    Error,
    { email: string; password: string }
  >({
    mutationKey: ['login-user'],
    mutationFn: async (data) => {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!result?.ok) throw new Error('failed');

      return result;
    },
    onSuccess: async () => {
      await getSession();
      toast.success('Successfully login user');
      router.push('/');
    },
    onError: () => {
      toast.error('Failed to login user');
    },
  });

  return { mutate, isPending };
}
