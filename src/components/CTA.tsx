
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Build the Future?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of developers who are already building amazing AI applications. 
          Start your journey today with our comprehensive platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            onClick={() => navigate('/auth')}
          >
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            onClick={() => navigate('/pricing')}
          >
            View Pricing Plans
          </Button>
        </div>
        <p className="text-sm mt-6 opacity-75">
          No credit card required • Start building in minutes • Cancel anytime
        </p>
      </div>
    </div>
  );
};
