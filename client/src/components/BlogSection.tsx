import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Clock, 
  MapPin, 
  User, 
  Tag, 
  TrendingUp, 
  LineChart, 
  Users, 
  Zap, 
  Lightbulb,
  BookOpen,
  Building,
  BarChart3,
  Network,
  GraduationCap
} from "lucide-react";

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const blogPosts = [
    {
      id: 1,
      title: "How escool.ai is Transforming India's Startup Ecosystem",
      excerpt: "Discover how our platform is bridging the gap between ideas, talent, and funding to empower a new generation of Indian entrepreneurs.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
      date: "April 15, 2025",
      readTime: "8 min read",
      author: {
        name: "Arjun Mehta",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg"
      },
      category: "impact",
      tags: ["Startup Ecosystem", "India", "Innovation"],
      featured: true,
      location: "Delhi NCR",
    },
    {
      id: 2,
      title: "Tier 2 and 3 Cities: The New Frontier of Indian Innovation",
      excerpt: "Why smaller Indian cities are becoming hotbeds of entrepreneurial activity and how escool.ai is helping tap into this vast talent pool.",
      image: "https://images.unsplash.com/photo-1596276020230-e3505f55769f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
      date: "April 12, 2025",
      readTime: "6 min read",
      author: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      category: "startups",
      tags: ["Tier 2 Cities", "Regional Innovation", "Talent"],
      featured: false,
      location: "Jaipur",
    },
    {
      id: 3,
      title: "The Power of Network Effects in Indian Startup Communities",
      excerpt: "How community-driven growth is amplifying the impact of startups across India and creating sustainable innovation ecosystems.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
      date: "April 8, 2025",
      readTime: "7 min read",
      author: {
        name: "Vikram Singh",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      category: "networking",
      tags: ["Networking", "Community Building", "Collaboration"],
      featured: false,
      location: "Bangalore",
    },
    {
      id: 4,
      title: "Jugaad Innovation: India's Unique Approach to Problem Solving",
      excerpt: "Exploring how the distinctly Indian concept of 'jugaad' (frugal innovation) is helping startups create solutions for local and global markets.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
      date: "April 5, 2025",
      readTime: "9 min read",
      author: {
        name: "Neha Kapoor",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg"
      },
      category: "innovation",
      tags: ["Jugaad", "Frugal Innovation", "Problem Solving"],
      featured: true,
      location: "Mumbai",
    },
    {
      id: 5,
      title: "Building a Bridge Between Academia and Industry in India",
      excerpt: "How escool.ai is connecting universities, research institutions, and startups to foster innovation and tech transfer across India.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
      date: "April 2, 2025",
      readTime: "6 min read",
      author: {
        name: "Dr. Rajesh Kumar",
        avatar: "https://randomuser.me/api/portraits/men/59.jpg"
      },
      category: "education",
      tags: ["Academia", "Research", "Industry Collaboration"],
      featured: false,
      location: "Hyderabad",
    },
    {
      id: 6,
      title: "Women Entrepreneurs: The Rising Force in India's Startup Scene",
      excerpt: "Celebrating the achievements of women founders and examining how escool.ai is helping address gender gaps in the Indian startup ecosystem.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2688&q=80",
      date: "March 28, 2025",
      readTime: "7 min read",
      author: {
        name: "Shalini Verma",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      category: "impact",
      tags: ["Women Entrepreneurs", "Diversity", "Inclusion"],
      featured: true,
      location: "Chennai",
    }
  ];
  
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  const categories = [
    { id: "all", label: "All Topics", icon: <BookOpen className="h-4 w-4" /> },
    { id: "startups", label: "Startups", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "innovation", label: "Innovation", icon: <Zap className="h-4 w-4" /> },
    { id: "networking", label: "Networking", icon: <Network className="h-4 w-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "impact", label: "Impact", icon: <LineChart className="h-4 w-4" /> },
    { id: "policy", label: "Policy", icon: <Building className="h-4 w-4" /> },
  ];

  const navigateToBlog = (id: number) => {
    window.location.href = `/blog/${id}`;
  };

  return (
    <div className="py-16 md:py-24 bg-[#0a0b15] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            BLOG
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Insights & Stories
          </h2>
          <p className="text-lg text-[#ccc] mb-8">
            Discover how escool.ai is transforming India's startup landscape through collaboration, learning, and innovation
          </p>
        </motion.div>
        
        {/* Featured Blog Posts */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {featuredPosts.length > 0 && (
              <motion.div 
                className="md:col-span-7 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="block h-full cursor-pointer" onClick={() => navigateToBlog(featuredPosts[0].id)}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden h-full hover:shadow-xl transition-all hover:border-primary/50 flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img 
                        src={featuredPosts[0].image} 
                        alt={featuredPosts[0].title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <Badge className="bg-[#f6c000] hover:bg-[#f6c000] text-black">Featured</Badge>
                        <div className="ml-3 flex items-center text-white/90 text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {featuredPosts[0].location}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          <img 
                            src={featuredPosts[0].author.avatar} 
                            alt={featuredPosts[0].author.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{featuredPosts[0].author.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {featuredPosts[0].date} • {featuredPosts[0].readTime}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {featuredPosts[0].title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{featuredPosts[0].excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {featuredPosts[0].tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="md:col-span-5 space-y-6">
              {featuredPosts.slice(1, 3).map((post, index) => (
                <motion.div 
                  key={post.id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                >
                  <div className="cursor-pointer" onClick={() => navigateToBlog(post.id)}>
                    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all hover:border-primary/50 flex flex-col">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center">
                          <Badge className="bg-[#f6c000] hover:bg-[#f6c000] text-black">Featured</Badge>
                          <div className="ml-3 flex items-center text-white/90 text-sm">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {post.location}
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center mb-3">
                          <div className="w-7 h-7 rounded-full overflow-hidden mr-2">
                            <img 
                              src={post.author.avatar} 
                              alt={post.author.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-medium">{post.author.name}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.date} • {post.readTime}
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Blog Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors
                  ${activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-card hover:bg-primary/20 border border-border'
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Blog List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredPosts.filter(post => !post.featured || (activeCategory !== 'all')).map((post, index) => (
            <motion.div
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <div className="cursor-pointer" onClick={() => navigateToBlog(post.id)}>
                <div className="bg-card border border-border rounded-xl overflow-hidden h-full hover:shadow-xl transition-all hover:border-primary/50 flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 flex items-center">
                      <div className="flex items-center text-white/90 text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {post.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center mb-3">
                      <div className="w-7 h-7 rounded-full overflow-hidden mr-2">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-medium">{post.author.name}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.date} • {post.readTime}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Newsletter */}
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/60 via-purple-800/60 to-purple-900/60 rounded-xl p-8 border border-purple-800/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2 text-white">Stay updated on India's startup scene</h3>
              <p className="text-[#ccc]">
                Subscribe to our newsletter for the latest insights, stories, and opportunities in India's innovation ecosystem.
              </p>
            </div>
            <div className="md:w-1/3">
              <Button 
                className="w-full bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md py-6"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogSection;