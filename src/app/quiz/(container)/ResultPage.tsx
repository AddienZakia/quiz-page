import Typography from '@/components/Typography';
import { cn } from '@/lib/utils';
import { Home, RotateCcw, TrendingUp, Trophy } from 'lucide-react';
import Link from 'next/link';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  level: string;
  timeTaken: string;
}

export default function ResultPage({
  score,
  totalQuestions,
  correctAnswers,
  level,
  timeTaken,
}: QuizResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPerfect = percentage === 100;
  const isGood = percentage >= 70;
  const isPass = percentage >= 50;

  const getResultColor = () => {
    if (isPerfect) return 'from-secondary-main to-secondary-hover';
    if (isGood) return 'from-success-main to-success-hover';
    if (isPass) return 'from-primary-main to-primary-hover';
    return 'from-danger-main to-danger-hover';
  };

  const getResultMessage = () => {
    if (isPerfect) return 'Perfect Score!';
    if (isGood) return 'Great Job!';
    if (isPass) return 'Good Effort!';
    return 'Keep Trying!';
  };

  return (
    <section className="bg-primary-surface flex min-h-screen items-center justify-center bg-linear-to-br py-10 max-md:p-10">
      <div className="w-full max-w-2xl">
        {/* Score Circle */}
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-6 h-48 w-48">
            <svg className="h-full w-full -rotate-90 transform">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-neutral-30"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(percentage / 100) * 553} 553`}
                className={cn(
                  `text-${isGood ? 'success' : isPass ? 'primary' : 'danger'}-main`,
                  `transition-all duration-1000`,
                )}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Typography
                variant="h4"
                className="text-neutral-100"
                weight="bold"
              >
                {percentage}%
              </Typography>
              <Typography variant="p" className="text-neutral-60">
                Score
              </Typography>
            </div>
          </div>

          <div
            className={cn(
              `mb-3 inline-block rounded-full bg-linear-to-r px-6 py-2`,
              getResultColor(),
            )}
          >
            <Typography variant="t" className="text-white" weight="bold">
              {getResultMessage()}
            </Typography>
          </div>

          <Typography variant="p" className="text-neutral-70">
            You completed the {level} level quiz
          </Typography>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 flex h-fit flex-col gap-4 md:grid md:grid-cols-3 md:flex-row">
          <div className="rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-sm">
            <div className="bg-success-surface mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full">
              <Trophy className="text-success-main" size={32} />
            </div>
            <Typography
              variant="h5"
              className="mb-1 text-neutral-100"
              weight="bold"
            >
              {correctAnswers}/{totalQuestions}
            </Typography>
            <Typography variant="p" className="text-neutral-60">
              Correct
            </Typography>
          </div>

          <div className="rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-sm">
            <div className="bg-primary-surface mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full">
              <TrendingUp className="text-primary-main" size={32} />
            </div>
            <Typography
              variant="h5"
              className="mb-1 text-neutral-100"
              weight="bold"
            >
              {score}
            </Typography>
            <Typography variant="p" className="text-neutral-60">
              Points
            </Typography>
          </div>

          <div className="rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-sm">
            <div className="bg-secondary-surface mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full">
              <svg
                className="text-secondary-main"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <Typography
              variant="h5"
              className="mb-1 text-neutral-100"
              weight="bold"
            >
              {timeTaken}
            </Typography>
            <Typography variant="p" className="text-neutral-60">
              Time
            </Typography>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 max-md:flex-col">
          <Link href={'/'} className="block w-full">
            <div className="hover:bg-neutral-20 flex w-full cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-white/80 py-2 shadow-md backdrop-blur-sm transition-all">
              <div className="bg-primary-surface inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors">
                <Home
                  className="text-primary-main transition-colors"
                  size={18}
                />
              </div>

              <Typography
                variant="p"
                className="text-neutral-80"
                weight="medium"
              >
                Home
              </Typography>
            </div>
          </Link>

          <div
            className="hover:bg-primary-main bg-primary-hover flex w-full cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl py-2 shadow-md backdrop-blur-sm transition-all"
            onClick={() => window.location.reload()}
          >
            <div className="bg-primary-surface inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors">
              <RotateCcw
                className="text-primary-main transition-colors"
                size={18}
              />
            </div>

            <Typography variant="p" className="text-white" weight="medium">
              Retry
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
