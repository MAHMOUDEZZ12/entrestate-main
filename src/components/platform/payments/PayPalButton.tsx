'use client';

import { useEffect, useRef, useState } from 'react';
import { loadScript, type PayPalNamespace } from '@paypal/paypal-js';

type PayPalButtonProps = {
  plan: string;
  getEmail: () => string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  className?: string;
};

export function PayPalButton({ plan, getEmail, onSuccess, onError, className }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paypal, setPaypal] = useState<PayPalNamespace | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      onError?.(new Error('PayPal client ID not configured.'));
      return;
    }

    let isMounted = true;

    loadScript({ clientId, components: 'buttons', currency: 'USD' })
      .then((namespace) => {
        if (isMounted) setPaypal(namespace ?? null);
      })
      .catch((error) => {
        onError?.(error);
      });

    return () => {
      isMounted = false;
    };
  }, [onError]);

  useEffect(() => {
    if (!paypal || !containerRef.current || !paypal.Buttons) {
      return;
    }

    const buttons = paypal.Buttons({
      createOrder: async () => {
        const response = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, email: getEmail() }),
        });
        const json = await response.json();
        if (!response.ok || !json?.data?.id) {
          const message = json?.error || 'PayPal order creation failed.';
          onError?.(new Error(message));
          throw new Error(message);
        }
        return json.data.id as string;
      },
      onApprove: async (data: { orderID: string }) => {
        const response = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderID, email: getEmail(), plan }),
        });
        const json = await response.json();
        if (!response.ok || !json?.ok) {
          const message = json?.error || 'PayPal capture failed.';
          onError?.(new Error(message));
          return;
        }
        onSuccess?.();
      },
      onError,
    });

    buttons.render(containerRef.current);

    return () => {
      void buttons.close();
    };
  }, [getEmail, paypal, onError, onSuccess, plan]);

  return <div ref={containerRef} className={className} />;
}
