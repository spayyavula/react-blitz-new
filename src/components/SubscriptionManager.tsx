
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export const SubscriptionManager = () => {
  const { subscribed, subscriptionTier, subscriptionEnd, loading, checkSubscription } = useSubscription();

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
    }
  };

  const handleRefreshStatus = () => {
    checkSubscription();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading subscription status...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Subscription Status
          <Button variant="outline" size="sm" onClick={handleRefreshStatus}>
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subscribed ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
              <span className="text-lg font-semibold">{subscriptionTier} Plan</span>
            </div>
            
            {subscriptionEnd && (
              <div className="text-sm text-muted-foreground">
                Next billing date: {format(new Date(subscriptionEnd), 'PPP')}
              </div>
            )}
            
            <Button onClick={handleManageSubscription} className="w-full">
              Manage Subscription
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Badge variant="outline">No Active Subscription</Badge>
            <CardDescription>
              You don't have an active subscription. Subscribe to unlock AI features.
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
