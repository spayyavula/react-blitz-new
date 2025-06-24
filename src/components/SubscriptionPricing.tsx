
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for getting started with AI features',
    features: [
      'Limited AI usage',
      'Basic support',
      'Standard response time',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$79',
    period: '/month',
    description: 'Ideal for power users who need more AI capabilities',
    features: [
      'Extended AI features',
      'Priority support',
      'Faster response time',
      'Advanced analytics',
      'API access'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For teams that need unlimited AI access',
    features: [
      'Unlimited AI access',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'Team management',
      'Custom models'
    ]
  }
];

export const SubscriptionPricing = () => {
  const { subscriptionTier, loading } = useSubscription();

  const handleSubscribe = async (tier: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier }
      });
      
      if (error) throw error;
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your AI Plan</h2>
        <p className="text-lg text-muted-foreground">Unlock powerful AI features with our aggressive pricing</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-3xl font-bold">
                {plan.price}<span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={subscriptionTier === plan.name ? "secondary" : "default"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading || subscriptionTier === plan.name}
              >
                {subscriptionTier === plan.name ? 'Current Plan' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
