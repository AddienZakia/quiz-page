'use client';

import Loading from '@/components/Loading';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useGetQuiz from '@/hooks/use-get-quiz';
import { cn, shuffleArray } from '@/lib/utils';
import { QuizClientType } from '@/types/response';
import he from 'he';
import {
  BetweenHorizontalStart,
  ChevronLeft,
  ChevronRight,
  Timer,
} from 'lucide-react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ResultPage from './(container)/ResultPage';

const MINUTES = 10;

export default function page() {
  const level = useSearchParams().get('level');

  if (!level || !['easy', 'medium', 'hard'].includes(level)) {
    return redirect('/');
  }

  const methods = useForm({});

  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [data, setData] = useState<QuizClientType[]>([]);
  const [number, setNumber] = useState(1);

  const [finish, setFinish] = useState(false);
  const [dataResult, setDataResult] = useState({
    score: 20,
    level: 'easy',
    totalQuestion: 10,
    correctAnswer: 7,
    timeTaken: '',
  });

  const { data: DataQuiz, isLoading: LoadingQuiz } = useGetQuiz(level);

  useEffect(() => {
    if (!DataQuiz) return;

    // SET TIMER
    const endTime = Date.now() + MINUTES * 60 * 1000;

    const interval = setInterval(() => {
      const diff = endTime - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(diff);
    }, 1000);

    // RESHUFFLE ANSWER
    const result = DataQuiz.results.map(
      ({ incorrect_answers, correct_answer, ...quiz }) => {
        return {
          ...quiz,
          answer: shuffleArray([correct_answer!, ...incorrect_answers]),
        } as QuizClientType;
      },
    );

    setData(result);

    return () => clearInterval(interval);
  }, [DataQuiz]);

  useEffect(() => {
    if (timeLeft > 0) return;
    if (data.length === 0) return;

    if (DataQuiz && timeLeft === 0) {
      toast.error('Times up');

      const answers = methods.getValues('answers');

      let totalCorrect = 0;

      if (answers) {
        Object.keys(answers).map((x, i) => {
          if (DataQuiz?.results[i].correct_answer === answers[x])
            totalCorrect++;
        });
      }

      const total = MINUTES * 60 * 1000;
      const timeSpent = total - timeLeft;

      const spentMinutes = Math.floor(timeSpent / 60000);
      const spentSeconds = Math.floor((timeSpent % 60000) / 1000);

      setTimeout(() => {
        setFinish(true);

        setDataResult({
          score: totalCorrect * 10,
          level,
          totalQuestion: DataQuiz?.results.length!,
          correctAnswer: totalCorrect,
          timeTaken: `${spentMinutes}:${spentSeconds.toString().padStart(2, '0')}`,
        });
      }, 1000);
    }
  }, [timeLeft]);

  const minutesLeft = Math.floor(timeLeft / 60000);
  const secondsLeft = Math.floor((timeLeft % 60000) / 1000);

  const onSubmit = () => {
    setFinish(true);

    const answers = methods.getValues('answers');

    let totalCorrect = 0;

    Object.keys(answers).map((x, i) => {
      if (DataQuiz?.results[i].correct_answer === answers[x]) totalCorrect++;
    });

    const total = MINUTES * 60 * 1000;
    const timeSpent = total - timeLeft;

    const spentMinutes = Math.floor(timeSpent / 60000);
    const spentSeconds = Math.floor((timeSpent % 60000) / 1000);

    setDataResult({
      score: totalCorrect * 10,
      level,
      totalQuestion: DataQuiz?.results.length!,
      correctAnswer: totalCorrect,
      timeTaken: `${spentMinutes}:${spentSeconds.toString().padStart(2, '0')}`,
    });
  };

  const answersValue = methods.getValues('answers');

  if (LoadingQuiz) return <Loading />;

  return finish ? (
    <ResultPage
      score={dataResult.score}
      totalQuestions={dataResult.totalQuestion}
      correctAnswers={dataResult.correctAnswer}
      level={dataResult.level}
      timeTaken={dataResult.timeTaken}
    />
  ) : (
    !LoadingQuiz && data.length && (
      <section className="bg-primary-surface flex min-h-screen w-full overflow-x-hidden max-lg:flex-col">
        <div
          className="mx-10 my-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white p-2 shadow-md lg:hidden"
          onClick={() => setOpen(true)}
        >
          <BetweenHorizontalStart className="text-primary-main" />
        </div>

        <div className="w-full p-10 py-12 max-lg:py-2 lg:w-[70%]">
          <div className="flex min-h-full flex-col justify-between space-y-12 rounded-xl bg-white p-8 px-10 shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link href={'/'}>
                    <div className="bg-primary-hover flex h-8 w-8 items-center justify-center rounded-full p-2">
                      <ChevronLeft className="text-primary-surface" size={36} />
                    </div>
                  </Link>

                  <Typography variant="p">Back</Typography>
                </div>

                <div className="bg-primary-hover flex w-fit space-x-2 rounded-md px-4 py-2">
                  <Timer className="text-primary-focus" />
                  <Typography variant="b" className="text-white">
                    {minutesLeft}:{secondsLeft.toString().padStart(2, '0')}
                  </Typography>
                </div>
              </div>

              <div className="space-y-6">
                <Typography variant="p">
                  {he.decode(data[number - 1].question)}
                </Typography>

                <FormProvider {...methods}>
                  <div className="space-y-2">
                    {data[number - 1].answer.map((ans, i) => {
                      const id = `answer-q${i}`;

                      return (
                        <Controller
                          key={ans}
                          control={methods.control}
                          name={`answers.q${number - 1}`}
                          render={({ field }) => (
                            <RadioGroup
                              key={number}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FieldLabel
                                key={i}
                                htmlFor={id}
                                className="transition-custom hover:bg-primary-hover/10"
                              >
                                <Field className="relative flex cursor-pointer">
                                  <FieldContent className="items-center">
                                    <FieldTitle className="border-primary-main flex h-5 w-5 items-center justify-center rounded-full border">
                                      <Typography
                                        variant="c"
                                        weight="bold"
                                        className="text-primary-main"
                                      >
                                        {String.fromCharCode(65 + i)}
                                      </Typography>
                                    </FieldTitle>
                                    <FieldDescription className="text-neutral-80 font-semibold">
                                      {ans}
                                    </FieldDescription>
                                  </FieldContent>
                                  <RadioGroupItem
                                    value={ans}
                                    id={id}
                                    className="absolute top-0 opacity-0"
                                  />
                                </Field>
                              </FieldLabel>
                            </RadioGroup>
                          )}
                        />
                      );
                    })}
                  </div>
                </FormProvider>
              </div>
            </div>

            {/* Button back & nexr */}
            <div className="flex space-x-2 max-lg:flex-col max-lg:space-y-2">
              <div
                className={cn(
                  'border-primary-main flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2',
                  'transition-custom hover:bg-primary-hover/10',
                  number === 1 &&
                    'bg-neutral-40 hover:bg-neutral-40 cursor-not-allowed',
                )}
                onClick={() =>
                  setNumber((pre) => {
                    if (pre === 1) return pre;
                    else pre -= 1;

                    return pre;
                  })
                }
              >
                <ChevronLeft className="" />
                <Typography variant="b">Back</Typography>
              </div>
              <div
                className={cn(
                  'border-primary-main flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2',
                  'transition-custom hover:bg-primary-hover/10',
                  number === 10 &&
                    'bg-neutral-40 hover:bg-neutral-40 cursor-not-allowed',
                )}
                onClick={() =>
                  setNumber((pre) => {
                    if (pre === 10) return pre;
                    else pre += 1;

                    return pre;
                  })
                }
              >
                <Typography variant="b">Next</Typography>
                <ChevronRight className="" />
              </div>
              {answersValue && Object.keys(answersValue).length === 10 && (
                <Button
                  onClick={methods.handleSubmit(onSubmit as any)}
                  className="lg:hidden"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          className={cn(
            'flex w-full flex-col space-y-4 bg-white p-10 py-12 lg:w-[30%]',
            'max-lg:absolute max-lg:top-0 max-lg:bottom-0',
            open ? 'max-lg:right-0' : 'max-lg:-right-500',
          )}
        >
          <div className="w-full">
            <div
              className="my-6 flex h-12 w-12 items-center justify-end rounded-lg bg-white p-2 shadow-md lg:hidden"
              onClick={() => setOpen(false)}
            >
              <BetweenHorizontalStart className="text-primary-main" />
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="b">Question</Typography>

            <Typography
              variant="h4"
              weight="bold"
              className="text-primary-main"
            >
              {number}
              <span className="ml-1 text-3xl opacity-80">/10</span>
            </Typography>
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <div
                    className={cn(
                      'border-primary-main flex h-12 w-12 items-center justify-center rounded-md border p-2',
                      'transition-custom hover:bg-primary-hover/10 cursor-pointer',
                      (methods.getValues(`answers.q${i}`) ||
                        number - 1 === i) &&
                        'bg-primary-main hover:bg-primary-hover',
                    )}
                    key={i}
                  >
                    <Typography
                      variant="p"
                      weight="medium"
                      className={
                        methods.getValues(`answers.q${i}`) || number - 1 === i
                          ? 'text-white'
                          : 'text-primary-main'
                      }
                    >
                      {i + 1}
                    </Typography>
                  </div>
                );
              })}
            </div>

            {answersValue && Object.keys(answersValue).length === 10 && (
              <Button
                onClick={methods.handleSubmit(onSubmit as any)}
                className="max-lg:hidden"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  );
}
