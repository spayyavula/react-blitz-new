
import React from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { SubscriptionPricing } from '@/components/SubscriptionPricing';
import { OneOffPayments } from '@/components/OneOffPayments';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Pricing Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Aggressive Pricing for AI Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your development needs. From startups to enterprise, 
              we have pricing that scales with your AI ambitions.
            </p>
          </div>
          
          <SubscriptionPricing />
          
          <div className="mt-16">
            <OneOffPayments />
          </div>
        </div>
      </div>
      
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
