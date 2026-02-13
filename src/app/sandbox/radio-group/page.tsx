'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import { FormProvider, useForm } from 'react-hook-form';
import DemoCard from '../demo-card/page';

const RadioGroupSandbox = () => {
  const methods = useForm({
    defaultValues: {
      shipping: 'standard',
      payment: 'credit',
      size: 'medium',
    },
  });

  return (
    <div className="space-y-6 p-10">
      <div className="rounded-lg border border-pink-200 bg-linear-to-r from-pink-50 to-rose-50 p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          🔘 Radio Group Components
        </h2>
        <p className="text-sm text-gray-600">
          Radio button groups untuk single selection
        </p>
      </div>

      <FormProvider {...methods}>
        <DemoCard
          title="Basic Radio Group"
          description="Group radio buttons dengan label"
        >
          <RadioGroup id="shipping" required />
        </DemoCard>

        <DemoCard
          title="Payment Methods"
          description="Radio group untuk pemilihan payment method"
        >
          <RadioGroup id="payment" required />
        </DemoCard>

        <DemoCard
          title="Product Sizes"
          description="Radio group untuk pemilihan size/product variant"
        >
          <RadioGroup id="size" required />
        </DemoCard>
      </FormProvider>
    </div>
  );
};

export default RadioGroupSandbox;
