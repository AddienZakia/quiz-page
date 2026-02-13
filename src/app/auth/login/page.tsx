'use client';

import Loading from '@/components/Loading';
import Typography from '@/components/Typography';
import useLoginHook from '@/hooks/use-login';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, _setLoading] = useState(false);

  const { mutate } = useLoginHook();

  if (status === 'loading') return <Loading />;

  if (session) {
    return redirect('/');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      email,
      password,
    });
  };

  return (
    <div className="bg-primary-surface flex min-h-screen items-center justify-center">
      <div className="bg-neutral-10 w-full max-w-md rounded-lg p-8 shadow-lg">
        <div className="mb-8 text-center">
          <Typography variant="h6" className="text-primary-hover">
            Sign in to your account
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Typography
              variant="b"
              weight="medium"
              className="text-neutral-90 mb-2 block"
            >
              Email
            </Typography>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-neutral-40 focus:border-primary-main focus:ring-primary-focus w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Typography
              variant="b"
              weight="medium"
              className="text-neutral-90 mb-2 block"
            >
              Password
            </Typography>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-neutral-40 focus:border-primary-main focus:ring-primary-focus w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary-main hover:bg-primary-hover active:bg-primary-pressed text-neutral-10 w-full cursor-pointer rounded-lg py-3 transition-colors disabled:opacity-50"
          >
            <Typography variant="b" weight="bold">
              {loading ? 'Signing in...' : 'Sign In'}
            </Typography>
          </button>
        </form>
      </div>
    </div>
  );
}
