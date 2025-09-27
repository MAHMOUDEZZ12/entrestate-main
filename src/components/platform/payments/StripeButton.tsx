'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';

type StripeButtonProps = {
  plan: string;
  getEmail: () => string;
  label?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function StripeButton({ plan, getEmail, label = 'Pay with Stripe', onSuccess, onError }: StripeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    try {
      setIsLoading(true);
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        throw new Error('Stripe publishable key not configured.');
      }

      const stripe = await loadStripe(publishableKey);
      if (!stripe) {
        throw new Error('Unable to initialize Stripe.');
      }

      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email: getEmail() }),
      });
      const json = await response.json();
      if (!response.ok || !json?.data?.id) {
        throw new Error(json?.error || 'Stripe session creation failed.');
      }

      const redirect = await stripe.redirectToCheckout({ sessionId: json.data.id });
      if (redirect.error) {
        throw redirect.error;
      }

      onSuccess?.();
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button type="button" onClick={handleCheckout} disabled={isLoading} variant="outline">
      {isLoading ? 'Redirecting…' : label}
    </Button>
  );
}
