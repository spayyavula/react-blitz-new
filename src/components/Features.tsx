
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Code2, 
  Database, 
  Rocket, 
  Shield, 
  Workflow,
  Bot,
  Terminal,
  Cloud
} from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Model Hub",
      description: "Access GPT-4, Claude, and custom models through unified APIs"
    },
    {
      icon: Code2,
      title: "Code Generation",
      description: "AI-powered code completion, refactoring, and optimization tools"
    },
    {
      icon: Database,
      title: "Vector Database",
      description: "Built-in vector storage for embeddings and semantic search"
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Create complex AI workflows with visual drag-and-drop interface"
    },
    {
      icon: Bot,
      title: "Custom AI Agents",
      description: "Build and deploy specialized AI agents for specific tasks"
    },
    {
      icon: Terminal,
      title: "Developer Tools",
      description: "CLI, SDKs, and integrations for popular development frameworks"
    },
    {
      icon: Cloud,
      title: "Scalable Infrastructure",
      description: "Auto-scaling cloud infrastructure that grows with your needs"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption and data privacy"
    },
    {
      icon: Rocket,
      title: "Rapid Deployment",
      description: "Deploy AI applications in minutes with zero DevOps overhead"
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Build AI Applications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From prototype to production, our platform provides all the tools and infrastructure 
            you need to create powerful AI-driven applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Icon className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
