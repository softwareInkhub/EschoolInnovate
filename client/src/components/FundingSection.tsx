import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Rocket, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  Award, 
  BarChart, 
  PieChart,
  Search,
  Filter,
  ChevronRight,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Mock funding opportunities data
const fundingOpportunities = [
  {
    id: 1,
    name: "Tech Startup Accelerator",
    description: "Seed funding and mentorship for early-stage tech startups with innovative solutions.",
    amount: "$50,000 - $150,000",
    equityRange: "5-10%",
    deadline: "2025-06-30",
    category: "Accelerator",
    stages: ["Seed", "Early Stage"],
    requirements: ["MVP", "Market Validation", "Full-time Team"],
    organization: "TechStars Ventures",
    location: "Global, Remote-friendly",
    applicationProcess: "Competitive",
    successRate: "8%",
    featuredAlumni: ["AeroVision", "DataMind", "CloudOps"],
    badge: "Top Rated"
  },
  {
    id: 2,
    name: "Sustainable Innovation Grant",
    description: "Non-equity funding for startups focused on environmental sustainability and climate tech.",
    amount: "$75,000 - $200,000",
    equityRange: "None (Grant)",
    deadline: "2025-07-15",
    category: "Grant",
    stages: ["Idea", "Prototype", "Early Stage"],
    requirements: ["Sustainability Focus", "Clear Environmental Impact"],
    organization: "Green Future Foundation",
    location: "North America, Europe",
    applicationProcess: "Thorough Review",
    successRate: "12%",
    featuredAlumni: ["GreenTech", "EcoSolutions", "CleanWave"],
    badge: "Eco-Friendly"
  },
  {
    id: 3,
    name: "AI & ML Venture Capital",
    description: "Series A funding for startups with AI/ML solutions that demonstrate market traction.",
    amount: "$500,000 - $2,000,000",
    equityRange: "15-25%",
    deadline: "2025-08-01",
    category: "Venture Capital",
    stages: ["Series A"],
    requirements: ["Revenue Generating", "AI/ML Focus", "Market Traction"],
    organization: "Frontier Tech Ventures",
    location: "Global",
    applicationProcess: "Multi-stage Evaluation",
    successRate: "5%",
    featuredAlumni: ["Neural Systems", "PredictAI", "Cortex Analytics"],
    badge: "Hot Deal"
  },
  {
    id: 4,
    name: "Health Innovation Challenge",
    description: "Funding and partnership opportunities for healthcare and biotech innovations.",
    amount: "$100,000 - $300,000",
    equityRange: "Varies",
    deadline: "2025-09-15",
    category: "Competition",
    stages: ["Prototype", "Early Stage"],
    requirements: ["Healthcare Focus", "Clinical Validation Plan"],
    organization: "MedTech Partners",
    location: "Global",
    applicationProcess: "Competition",
    successRate: "10%",
    featuredAlumni: ["BioScience", "MedAssist", "GenomeFirst"],
    badge: null
  },
  {
    id: 5,
    name: "Social Impact Fund",
    description: "Patient capital for mission-driven startups addressing social challenges.",
    amount: "$250,000 - $500,000",
    equityRange: "8-15%",
    deadline: "2025-10-01",
    category: "Impact Investment",
    stages: ["Early Stage", "Growth"],
    requirements: ["Measurable Social Impact", "Sustainable Business Model"],
    organization: "Impact Ventures",
    location: "Global, Focus on Emerging Markets",
    applicationProcess: "Impact Assessment",
    successRate: "15%",
    featuredAlumni: ["EduAccess", "CommunityCare", "FarmTech"],
    badge: "Impact Leader"
  },
  {
    id: 6,
    name: "SaaS Growth Fund",
    description: "Growth capital for B2B SaaS companies with proven product-market fit.",
    amount: "$1,000,000 - $5,000,000",
    equityRange: "10-20%",
    deadline: "2025-07-30",
    category: "Growth Capital",
    stages: ["Series A", "Series B"],
    requirements: ["ARR >$1M", "Growth >80% YoY", "Low Churn"],
    organization: "Cloud Capital Partners",
    location: "North America, Europe",
    applicationProcess: "Data-driven Analysis",
    successRate: "7%",
    featuredAlumni: ["SalesOptimize", "CloudSecure", "DataSync"],
    badge: null
  }
];

// Filter categories
const categories = [
  "All", "Accelerator", "Venture Capital", "Grant", "Competition", "Impact Investment", "Growth Capital"
];

const stages = [
  "All", "Idea", "Prototype", "Seed", "Early Stage", "Series A", "Series B", "Growth"
];

export default function FundingSection() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("opportunities");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  
  // Filter logic
  const filteredOpportunities = fundingOpportunities.filter(opportunity => {
    const matchesSearch = !searchTerm || 
      opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "All" || 
      opportunity.category === categoryFilter;
    
    const matchesStage = stageFilter === "All" || 
      opportunity.stages.some(stage => stage === stageFilter);
    
    return matchesSearch && matchesCategory && matchesStage;
  });

  // Group by category for insights tab
  const groupedByCategory: Record<string, typeof fundingOpportunities> = {};
  fundingOpportunities.forEach(opp => {
    if (!groupedByCategory[opp.category]) {
      groupedByCategory[opp.category] = [];
    }
    groupedByCategory[opp.category].push(opp);
  });

  return (
    <div className="py-12">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
            Funding Opportunities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find the Perfect <span className="text-primary">Funding</span> for Your Startup
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect with investors, apply for grants, join accelerators, and discover the resources you need to grow your venture.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">$12.5M+</h3>
                <p className="text-muted-foreground">Total Funding Available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">180+</h3>
                <p className="text-muted-foreground">Active Opportunities</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">92%</h3>
                <p className="text-muted-foreground">Success Rate Increase</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={fadeIn}>
          <Tabs defaultValue="opportunities" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-8 w-full grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="opportunities">OPPORTUNITIES</TabsTrigger>
              <TabsTrigger value="insights">INSIGHTS</TabsTrigger>
              <TabsTrigger value="resources">RESOURCES</TabsTrigger>
            </TabsList>

            {/* Opportunities Tab */}
            <TabsContent value="opportunities">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search funding opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 py-2 rounded-md border bg-background"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="rounded-md border bg-background px-3 py-2"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  
                  <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                    className="rounded-md border bg-background px-3 py-2"
                  >
                    {stages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                  
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span>More Filters</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.length > 0 ? (
                  filteredOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="h-full hover:shadow-md transition-shadow overflow-hidden border-2 group">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
                              {opportunity.name}
                            </CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs font-normal">
                                {opportunity.category}
                              </Badge>
                              {opportunity.stages.map((stage, index) => (
                                <span key={index} className="ml-2 text-xs text-muted-foreground">
                                  {stage}
                                </span>
                              ))}
                            </CardDescription>
                          </div>
                          {opportunity.badge && (
                            <Badge className="bg-primary/80 text-xs">
                              {opportunity.badge}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {opportunity.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-xs">
                            <DollarSign className="h-3.5 w-3.5 mr-1 text-green-500" />
                            <span>{opportunity.amount}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <PieChart className="h-3.5 w-3.5 mr-1 text-blue-500" />
                            <span>Equity: {opportunity.equityRange}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-orange-500" />
                            <span>Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <Award className="h-3.5 w-3.5 mr-1 text-purple-500" />
                            <span>Success: {opportunity.successRate}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                          <span className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{opportunity.organization}</span>
                          </span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t flex justify-between items-center">
                        <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                          <span>View Details</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                        
                        <Button variant="default" size="sm" className="gap-1 text-xs h-8">
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No matching opportunities</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search term to find more funding opportunities.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('All');
                        setStageFilter('All');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Funding by Category</CardTitle>
                    <CardDescription>Distribution of available opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(groupedByCategory).map(([category, opps]) => (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-sm text-muted-foreground">{opps.length} opportunities</span>
                          </div>
                          <div className="flex items-center">
                            <Progress value={(opps.length / fundingOpportunities.length) * 100} className="h-2 flex-1 mr-2" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round((opps.length / fundingOpportunities.length) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Average Funding Amounts</CardTitle>
                    <CardDescription>Typical ranges by funding type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <Rocket className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">Accelerators</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">$75K</div>
                        <div className="text-xs text-muted-foreground">Average funding</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">Venture Capital</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">$1.2M</div>
                        <div className="text-xs text-muted-foreground">Average funding</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">Grants</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">$120K</div>
                        <div className="text-xs text-muted-foreground">Average funding</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">Growth Capital</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">$3.5M</div>
                        <div className="text-xs text-muted-foreground">Average funding</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Funding Trends (2024-2025)</CardTitle>
                  <CardDescription>Recent shifts in funding priorities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start border-l-4 border-green-500 pl-4">
                      <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">AI & Machine Learning</h3>
                        <p className="text-sm text-muted-foreground">
                          Funding for AI-focused startups has increased by 45% year-over-year, with particular 
                          interest in generative AI applications and enterprise AI solutions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start border-l-4 border-blue-500 pl-4">
                      <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Climate Tech & Sustainability</h3>
                        <p className="text-sm text-muted-foreground">
                          Green initiatives and climate solutions have seen a 38% increase in available funding, 
                          with both grants and venture capital flowing into the sector.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start border-l-4 border-amber-500 pl-4">
                      <div className="p-2 rounded-full bg-amber-500/10 text-amber-500">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Digital Health & Biotech</h3>
                        <p className="text-sm text-muted-foreground">
                          Healthcare innovation continues to attract significant investment, with a 30% increase 
                          in funding opportunities for startups addressing healthcare challenges.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Funding Guides</CardTitle>
                    <CardDescription>Expert advice on securing funding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 items-start border-b pb-3">
                      <div className="p-2 bg-muted rounded">
                        <BarChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Pitch Deck Essentials</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          Create a compelling pitch deck that captures investor attention
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                          Read Guide
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start border-b pb-3">
                      <div className="p-2 bg-muted rounded">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Investor Relations 101</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          Building and maintaining relationships with potential investors
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                          Read Guide
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-muted rounded">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Valuation Strategies</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          Understanding and determining your startup's value
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                          Read Guide
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Connect with investors and peers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 items-start border-b pb-3">
                      <div className="p-2 bg-muted rounded min-w-10 text-center">
                        <div className="text-xs font-medium text-muted-foreground">JUN</div>
                        <div className="text-lg font-bold">15</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Investor Pitch Night</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          Virtual event to pitch your startup to angel investors
                        </p>
                        <Badge variant="outline" className="text-xs">Online</Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start border-b pb-3">
                      <div className="p-2 bg-muted rounded min-w-10 text-center">
                        <div className="text-xs font-medium text-muted-foreground">JUL</div>
                        <div className="text-lg font-bold">22</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Funding Masterclass</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          Learn strategies from founders who raised $10M+
                        </p>
                        <Badge variant="outline" className="text-xs">Workshop</Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-muted rounded min-w-10 text-center">
                        <div className="text-xs font-medium text-muted-foreground">AUG</div>
                        <div className="text-lg font-bold">10</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">VC Connect Summit</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          Network with top VCs and get feedback on your startup
                        </p>
                        <Badge variant="outline" className="text-xs">In-Person</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Funding Tools</CardTitle>
                    <CardDescription>Resources to support your fundraising</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <h4 className="font-medium mb-1 flex items-center">
                        <BarChart className="h-4 w-4 mr-2 text-primary" />
                        Financial Projections Template
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Create investor-ready financial projections with this template
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <h4 className="font-medium mb-1 flex items-center">
                        <PieChart className="h-4 w-4 mr-2 text-primary" />
                        Cap Table Calculator
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Manage your equity and understand dilution scenarios
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <h4 className="font-medium mb-1 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        Due Diligence Checklist
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Prepare for investor due diligence with this comprehensive checklist
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle>Funding Adviser</CardTitle>
                  <CardDescription>Get personalized funding recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-4">
                        Answer a few questions about your startup to receive tailored funding suggestions
                        that match your industry, stage, and growth goals.
                      </p>
                      <Button>Start Funding Assessment</Button>
                    </div>
                    <div className="hidden md:block w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}