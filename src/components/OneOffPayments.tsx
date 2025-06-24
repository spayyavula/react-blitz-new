
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const products = [
  {
    id: 'credits',
    name: 'AI Credits Pack',
    price: '$19.99',
    description: 'Pay-as-you-go AI credits for flexible usage',
    icon: Coins,
    features: [
      '1000 AI tokens',
      'No expiration',
      'Use across all features',
      'Perfect for occasional users'
    ]
  },
  {
    id: 'premium-unlock',
    name: 'Premium Feature Unlock',
    price: '$49.99',
    description: 'One-time access to advanced AI features',
    icon: Zap,
    features: [
      'Advanced AI models',
      'Custom prompts',
      'Export capabilities',
      'Lifetime access'
    ]
  }
];

export const OneOffPayments = () => {
  const handlePurchase = async (productType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productType }
      });
      
      if (error) throw error;
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating payment session:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">One-Time Purchases</h2>
        <p className="text-lg text-muted-foreground">Get AI credits and premium features without commitment</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </div>
                <CardDescription>{product.description}</CardDescription>
                <div className="text-2xl font-bold text-primary">{product.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  onClick={() => handlePurchase(product.id)}
                >
                  Purchase Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
