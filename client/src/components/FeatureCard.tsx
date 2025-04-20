import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  benefits: string[];
  isPrimary?: boolean;
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  colorClass, 
  benefits,
  isPrimary = false 
}: FeatureCardProps) {
  return (
    <Card className={`${isPrimary ? 'border-primary/20' : 'bg-[#0f1020] border-white/10'} h-full transition-all duration-300 hover:shadow-md overflow-hidden`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
        <CardDescription className="text-[#ccc]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
              <span className="text-[#ccc] text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}