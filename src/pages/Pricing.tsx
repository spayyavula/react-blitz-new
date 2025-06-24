
import React from 'react';
import { SubscriptionPricing } from '@/components/SubscriptionPricing';
import { OneOffPayments } from '@/components/OneOffPayments';
import { SubscriptionManager } from '@/components/SubscriptionManager';
import { AuthGuard } from '@/components/AuthGuard';

const Pricing = () => {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SubscriptionManager />
        </div>
        
        <SubscriptionPricing />
        
        <div className="mt-16">
          <OneOffPayments />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Pricing;
