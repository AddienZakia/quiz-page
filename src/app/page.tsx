'use client';

import Loading from '@/components/Loading';
import Typography from '@/components/Typography';
import { Gauge, Leaf, Skull } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function page() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Loading />;

  if (!session) {
    return redirect('/auth/login');
  }

  return (
    <section className="bg-primary-surface flex min-h-screen items-center justify-center">
      <div className="space-y-6">
        <Typography
          variant="h3"
          weight="medium"
          className="text-primary-main text-center"
        >
          Select your level
        </Typography>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
          {/* EASY */}
          <Link href={'/quiz?level=easy'} className="block">
            <div className="group border-primary-main/20 bg-primary-hover hover:border-primary-hover hover:shadow-primary-hover/30 relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex flex-col items-center gap-3 text-center">
                <div className="bg-primary-surface rounded-xl p-4 transition">
                  <Leaf size={34} className="text-primary-main" />
                </div>

                <Typography
                  variant="h6"
                  weight="bold"
                  className="text-primary-surface"
                >
                  Easy
                </Typography>

                <Typography
                  variant="p"
                  className="text-primary-surface max-w-[200px]"
                >
                  A gentle introduction designed to familiarize you with the
                  quiz format and basic concepts.
                </Typography>
              </div>
            </div>
          </Link>

          {/* MEDIUM */}
          <Link href={'/quiz?level=medium'} className="block">
            <div className="group border-warning-main/20 bg-warning-pressed hover:border-warning-main hover:shadow-warning-main/30 relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-warning-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-col items-center gap-3 text-center">
                <div className="bg-warning-surface rounded-xl p-4 transition">
                  <Gauge size={34} className="text-warning-main" />
                </div>

                <Typography
                  variant="h6"
                  weight="bold"
                  className="text-warning-surface"
                >
                  Medium
                </Typography>

                <Typography
                  variant="p"
                  className="text-warning-surface max-w-[200px]"
                >
                  A balanced challenge requiring careful reasoning and a solid
                  understanding of the material.
                </Typography>
              </div>
            </div>
          </Link>

          {/* HARD */}
          <Link href={'/quiz?level=hard'} className="block">
            <div className="group border-danger-main/20 bg-danger-pressed hover:border-danger-main hover:shadow-danger-main/30 relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-danger-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-col items-center gap-3 text-center">
                <div className="bg-danger-surface rounded-xl p-4 transition">
                  <Skull size={34} className="text-danger-main" />
                </div>

                <Typography
                  variant="h6"
                  weight="bold"
                  className="text-danger-surface"
                >
                  Hard
                </Typography>

                <Typography
                  variant="p"
                  className="text-primary-surface max-w-[200px]"
                >
                  An advanced level intended for experienced participants
                  seeking maximum difficulty.
                </Typography>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
