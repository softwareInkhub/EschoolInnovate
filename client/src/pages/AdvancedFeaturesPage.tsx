import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Bot, 
  Trophy, 
  Code, 
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { FeatureCard } from '@/components/FeatureCard';

export default function AdvancedFeaturesPage() {
  const [, navigate] = useLocation();

  // Feature data
  const features = [
    {
      title: 'Localization support for multiple Indian languages',
      description: 'Access platform content in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati and more regional languages.',
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      colorClass: 'bg-blue-500/10',
      benefits: [
        'Increased accessibility for non-English speaking users',
        'Better penetration into tier 2 and tier 3 cities',
        'Support for entrepreneurship in regional language communities',
        'Simplified technical content for various languages'
      ]
    },
    {
      title: 'Community collaboration with project voting',
      description: 'Democratic approach to project validation where community members can vote on ideas and provide feedback.',
      icon: <Users className="h-6 w-6 text-purple-500" />,
      colorClass: 'bg-purple-500/10',
      benefits: [
        'Community validation before significant investment',
        'Crowd-sourced feedback to refine ideas',
        'Democratic approach to project selection',
        'Built-in market testing mechanism'
      ]
    },
    {
      title: 'AI-powered mentor chatbot for guidance',
      description: 'Intelligent assistant that provides contextual advice and answers questions based on your specific needs.',
      icon: <Bot className="h-6 w-6 text-green-500" />,
      colorClass: 'bg-green-500/10',
      benefits: [
        'Personalized startup advice based on industry and stage',
        'Document analysis and feedback',
        'Resource recommendations tailored to specific challenges',
        'Available 24/7 for immediate assistance'
      ]
    },
    {
      title: 'Gamified learning path with achievement badges',
      description: 'Progress-tracking system with awards and levels that motivate users to complete educational content.',
      icon: <Trophy className="h-6 w-6 text-amber-500" />,
      colorClass: 'bg-amber-500/10',
      benefits: [
        'Increased motivation and engagement',
        'Visual representation of progress',
        'Recognition of achievements',
        'Friendly competition among peers'
      ]
    },
    {
      title: 'Interactive code snippet playground',
      description: 'In-browser development environment for testing code and building prototypes without complex setup.',
      icon: <Code className="h-6 w-6 text-red-500" />,
      colorClass: 'bg-red-500/10',
      benefits: [
        'Multi-language support (JavaScript, Python, Java, etc.)',
        'Real-time collaboration for pair programming',
        'Template library for quick starts',
        'Integration with version control systems'
      ]
    },
    {
      title: 'Educational content integration',
      description: 'Comprehensive curriculum of courses and resources curated from top educational partners and experts.',
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      colorClass: 'bg-indigo-500/10',
      benefits: [
        'Video courses and interactive tutorials',
        'Case studies and expert webinars',
        'Practical assignments and projects',
        'Partnerships with leading educational institutions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b15] to-[#121224]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Next-Generation Innovation Tools
          </h1>
          <p className="text-lg text-[#ccc] mb-8">
            Explore our cutting-edge features designed to revolutionize the startup ecosystem in India. 
            These tools empower entrepreneurs, facilitate collaboration, and accelerate learning.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                colorClass={feature.colorClass}
                benefits={feature.benefits}
              />
            </motion.div>
          ))}
        </div>

        {/* Building the Future of Indian Innovation section */}
        <div className="py-16 my-10 relative overflow-hidden border-y border-white/10">
          <div className="absolute inset-0 bg-[#0f1020] opacity-60"></div>
          <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f6c000]/20 mr-4">
                      <Globe className="h-5 w-5 text-[#f6c000]" />
                    </div>
                    <span className="text-[#f6c000] font-medium">Made for India</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Building the Future of <br/>Indian Innovation
                  </h2>
                  <p className="text-[#ccc] mb-6">
                    eSchool.ai is designed specifically for India's unique startup ecosystem, addressing local challenges and opportunities while connecting talent across the country.
                  </p>

                  <div className="hidden md:block">
                    <Button 
                      className="h-12 px-6 bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md"
                      onClick={() => navigate("/auth")}
                    >
                      Join the Movement
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-2xl font-bold text-[#f6c000] mb-1">100+</div>
                      <div className="text-xs text-white/70">Cities across India</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-2xl font-bold text-[#f6c000] mb-1">50K+</div>
                      <div className="text-xs text-white/70">Indian entrepreneurs</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-2xl font-bold text-[#f6c000] mb-1">₹120Cr+</div>
                      <div className="text-xs text-white/70">Funding facilitated</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-2xl font-bold text-[#f6c000] mb-1">28+</div>
                      <div className="text-xs text-white/70">State innovation hubs</div>
                    </div>
                  </div>
                  
                  <div className="block md:hidden mt-6">
                    <Button 
                      className="w-full h-12 px-6 bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md"
                      onClick={() => navigate("/auth")}
                    >
                      Join the Movement
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="bg-[#0f1020] border border-white/10 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Be the First to Experience These Features
            </h2>
            <p className="text-[#ccc] mb-8">
              Join our early access program to be among the first to try these cutting-edge innovations. 
              Provide feedback and shape the future of India's startup ecosystem.
            </p>
            <Button 
              size="lg" 
              className="bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md h-12 px-8"
              onClick={() => navigate("/auth")}
            >
              Sign Up For Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}