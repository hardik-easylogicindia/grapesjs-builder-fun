
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Layout, 
  Brush, 
  Code, 
  Smartphone, 
  Zap, 
  PanelLeft, 
  Download
} from "lucide-react";
import Header from "@/components/Header";
import Feature from "@/components/Feature";
import GradientButton from "@/components/GradientButton";
import BlurPanel from "@/components/BlurPanel";
import Builder from "@/components/Builder";
import { useRevealAnimation } from "@/lib/animations";

const Index = () => {
  useRevealAnimation();
  const demoRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll to demo section
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#try-now" && demoRef.current) {
      setTimeout(() => {
        demoRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);
  
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-block mb-4 py-1 px-3 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Introducing GrapeJS Studio
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Build websites <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  without code
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Create stunning, responsive websites with our intuitive visual page builder powered by GrapeJS.
              </p>
              <div className="flex flex-wrap gap-4">
                <GradientButton size="lg" onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth" })}>
                  Try Builder
                </GradientButton>
                <GradientButton size="lg" variant="secondary" onClick={() => window.open("https://grapesjs.com/docs/", "_blank")}>
                  Documentation
                </GradientButton>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlurPanel className="overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/10">
                <img 
                  src="https://res.cloudinary.com/dlcj29tux/image/upload/v1673548520/grapesjs-demo_qkbbcx.png" 
                  alt="GrapeJS Demo" 
                  className="w-full h-auto rounded-lg transform hover:scale-[1.01] transition-transform duration-500" 
                />
              </BlurPanel>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16" data-reveal>
            <h2 className="text-4xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to build professional websites without writing a single line of code.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature 
              icon={Layers} 
              title="Drag & Drop"
              description="Intuitive drag and drop interface makes building pages effortless."
              className="animate-slide-up delay-100"
            />
            <Feature 
              icon={Layout} 
              title="Pre-built Blocks"
              description="Dozens of pre-designed blocks and templates to choose from."
              className="animate-slide-up delay-200"
            />
            <Feature 
              icon={Brush} 
              title="Style Editor"
              description="Easily customize colors, fonts, spacing and more with visual controls."
              className="animate-slide-up delay-300"
            />
            <Feature 
              icon={Code} 
              title="Clean Code"
              description="Generate semantic HTML and optimized CSS for your pages."
              className="animate-slide-up delay-400"
            />
            <Feature 
              icon={Smartphone} 
              title="Responsive Design"
              description="Create websites that look great on all devices and screen sizes."
              className="animate-slide-up delay-100"
            />
            <Feature 
              icon={Zap} 
              title="Fast & Lightweight"
              description="Optimized for performance with minimal bloat and quick load times."
              className="animate-slide-up delay-200"
            />
            <Feature 
              icon={PanelLeft} 
              title="Custom Panels"
              description="Create custom panels and add your own functionality to the editor."
              className="animate-slide-up delay-300"
            />
            <Feature 
              icon={Download} 
              title="Export & Deploy"
              description="Export your designs as HTML/CSS or directly deploy to hosting."
              className="animate-slide-up delay-400"
            />
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section id="demo" ref={demoRef} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16" data-reveal>
            <h2 className="text-4xl font-bold mb-6">Try It Yourself</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Experiment with our live editor below to see how easy it is to build beautiful pages.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <GradientButton size="md" variant="secondary">
                Load Template
              </GradientButton>
              <GradientButton size="md" variant="secondary">
                Clear Canvas
              </GradientButton>
              <GradientButton size="md">
                Export HTML
              </GradientButton>
            </div>
          </div>
          
          <Builder id="gjs-demo" className="h-[800px]" />
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="try-now" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto text-center max-w-3xl" data-reveal>
          <h2 className="text-4xl font-bold mb-6">Ready to start building?</h2>
          <p className="text-xl mb-10">
            Join thousands of designers and developers who are creating stunning websites with GrapeJS Studio.
          </p>
          <GradientButton 
            size="lg" 
            variant="secondary"
            className="shadow-xl shadow-blue-500/20"
          >
            Get Started for Free
          </GradientButton>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-semibold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  GrapeJS
                </span>
                <span className="ml-1 text-gray-800 dark:text-gray-200">Studio</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The modern web page builder
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} GrapeJS Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
