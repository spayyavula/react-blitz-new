
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior AI Engineer at TechCorp",
      content: "This platform cut our AI development time by 70%. The integrated tools and scalable infrastructure are game-changing.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "As a solo developer, I was able to build and deploy a complex AI application in just two weeks. Incredible!",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      content: "The collaboration features made it easy for our team to work together on ML experiments. Highly recommended.",
      rating: 5
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See what developers are saying about our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardHeader>
              <CardContent>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
