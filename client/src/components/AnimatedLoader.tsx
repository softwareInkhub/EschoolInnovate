import { motion } from "framer-motion";
import { Rocket, Lightbulb, Users, Code, Brain, Coffee, CheckCircle } from "lucide-react";

type AnimatedLoaderProps = {
  message?: string;
  illustration?: "startup" | "idea" | "collaboration" | "coding" | "learning" | "general";
};

export default function AnimatedLoader({
  message = "Loading...",
  illustration = "general"
}: AnimatedLoaderProps) {
  // Animation variants
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Choose illustration based on type
  const renderIllustration = () => {
    switch (illustration) {
      case "startup":
        return (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center"
            >
              <Rocket className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-3 left-0 right-0 mx-auto w-32 h-4 bg-primary/10 rounded-full blur-lg"
            />
          </div>
        );
      
      case "idea":
        return (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-amber-500/10 rounded-2xl flex items-center justify-center"
            >
              <Lightbulb className="w-12 h-12 text-amber-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 left-0 right-0 mx-auto w-32 h-6 bg-amber-500/20 rounded-full blur-lg"
            />
          </div>
        );
      
      case "collaboration":
        return (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
              }}
              transition={{ 
                duration: 1, 
                ease: "easeOut"
              }}
              className="w-24 h-24 bg-blue-500/10 rounded-2xl flex items-center justify-center"
            >
              <Users className="w-12 h-12 text-blue-500" />
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0, scale: 0.5 }}
              animate={{ 
                x: 0,
                opacity: 1,
                scale: 1,
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: 0.5,
                ease: "easeInOut"
              }}
              className="absolute top-2 -left-6 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0, scale: 0.5 }}
              animate={{ 
                x: 0,
                opacity: 1,
                scale: 1,
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut"
              }}
              className="absolute bottom-2 -right-6 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
            >
              <Coffee className="w-5 h-5 text-blue-500" />
            </motion.div>
          </div>
        );
        
      case "coding":
        return (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
              }}
              transition={{ 
                duration: 1, 
                ease: "easeOut"
              }}
              className="w-24 h-24 bg-violet-500/10 rounded-2xl flex items-center justify-center"
            >
              <Code className="w-12 h-12 text-violet-500" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: ["0%", "70%", "40%", "90%", "60%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="h-1 bg-violet-500/50 rounded-full absolute top-1/2"
              />
            </motion.div>
          </div>
        );
        
      case "learning":
        return (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
                rotateY: [0, 180, 360],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-emerald-500/10 rounded-2xl flex items-center justify-center"
            >
              <Brain className="w-12 h-12 text-emerald-500" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-2 left-0 right-0 mx-auto w-24 h-4 bg-emerald-500/20 rounded-full blur-lg"
            />
          </div>
        );

      default:
        return (
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary flex items-center justify-center"
            />
          </div>
        );
    }
  };

  const getRandomLoadingMessage = () => {
    const messages = [
      "Loading amazing projects...",
      "Connecting brilliant minds...",
      "Gathering innovative ideas...",
      "Building the future...",
      "Preparing your experience...",
      "Loading collaborative space...",
    ];
    return message === "Loading..." ? messages[Math.floor(Math.random() * messages.length)] : message;
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-6 p-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={itemVariants}>
        {renderIllustration()}
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center"
      >
        <div className="text-xl font-medium mb-2">{getRandomLoadingMessage()}</div>
        <div className="flex space-x-1">
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut"
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut",
              delay: 0.2
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut",
              delay: 0.4
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}