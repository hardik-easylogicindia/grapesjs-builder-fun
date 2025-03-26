
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import { Loader } from "lucide-react";
import BlurPanel from "./BlurPanel";

interface BuilderProps {
  id: string;
  className?: string;
}

const Builder = ({ id, className }: BuilderProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let editor: any;
    
    if (editorRef.current) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        editor = grapesjs.init({
          container: `#${id}`,
          height: '100%',
          width: 'auto',
          storageManager: false,
          panels: { defaults: [] },
          deviceManager: {
            devices: [
              {
                name: 'Desktop',
                width: '',
              },
              {
                name: 'Tablet',
                width: '768px',
                widthMedia: '992px',
              },
              {
                name: 'Mobile',
                width: '320px',
                widthMedia: '480px',
              },
            ]
          },
          blockManager: {
            appendTo: '#blocks',
            blocks: [
              {
                id: 'section',
                label: 'Section',
                category: 'Basic',
                attributes: { class: 'gjs-block-section' },
                content: `<section class="py-12 px-4 bg-white">
                  <div class="container mx-auto">
                    <h2 class="text-4xl font-bold mb-8 text-center">Section Title</h2>
                    <p class="text-lg text-center">This is a simple section for your content.</p>
                  </div>
                </section>`,
              },
              {
                id: 'text',
                label: 'Text',
                category: 'Basic',
                content: '<div data-gjs-type="text">Insert your text here</div>',
              },
              {
                id: 'image',
                label: 'Image',
                category: 'Basic',
                attributes: { class: 'gjs-block-image' },
                content: { type: 'image' },
              },
              {
                id: 'hero',
                label: 'Hero',
                category: 'Sections',
                content: `<section class="py-24 px-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                  <div class="container mx-auto text-center">
                    <h1 class="text-5xl font-bold mb-6">Welcome to Our Website</h1>
                    <p class="text-xl mb-10 max-w-2xl mx-auto">A modern and professional landing page for your business or project.</p>
                    <button class="bg-white text-blue-600 py-3 px-8 rounded-full font-medium hover:bg-blue-50 transition-colors">Get Started</button>
                  </div>
                </section>`,
              },
              {
                id: 'features',
                label: 'Features',
                category: 'Sections',
                content: `<section class="py-16 px-8 bg-white">
                  <div class="container mx-auto">
                    <h2 class="text-4xl font-bold mb-12 text-center">Our Features</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div class="p-6 border border-gray-200 rounded-lg text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span class="text-blue-600">1</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Feature One</h3>
                        <p class="text-gray-600">Description of your amazing feature goes here.</p>
                      </div>
                      <div class="p-6 border border-gray-200 rounded-lg text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span class="text-blue-600">2</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Feature Two</h3>
                        <p class="text-gray-600">Description of your amazing feature goes here.</p>
                      </div>
                      <div class="p-6 border border-gray-200 rounded-lg text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span class="text-blue-600">3</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Feature Three</h3>
                        <p class="text-gray-600">Description of your amazing feature goes here.</p>
                      </div>
                    </div>
                  </div>
                </section>`,
              },
              {
                id: 'cta',
                label: 'Call to Action',
                category: 'Sections',
                content: `<section class="py-20 px-8 bg-gray-100">
                  <div class="container mx-auto text-center">
                    <h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                    <p class="text-xl mb-10 max-w-2xl mx-auto">Join thousands of satisfied customers using our product.</p>
                    <button class="bg-blue-600 text-white py-3 px-8 rounded-full font-medium hover:bg-blue-700 transition-colors">Sign Up Now</button>
                  </div>
                </section>`,
              },
            ],
          },
          styleManager: {
            appendTo: '#styles',
            sectors: [
              { name: 'Dimension', open: false },
              { name: 'Typography', open: false },
              { name: 'Decorations', open: false },
              { name: 'Extra', open: false },
            ],
          },
        });
        
        // Set default content after init
        editor.setComponents(`
          <section class="py-24 px-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <div class="container mx-auto text-center">
              <h1 class="text-5xl font-bold mb-6">Welcome to GrapeJS Studio</h1>
              <p class="text-xl mb-10 max-w-2xl mx-auto">Build beautiful pages with our intuitive drag-and-drop editor.</p>
              <button class="bg-white text-blue-600 py-3 px-8 rounded-full font-medium hover:bg-blue-50 transition-colors">Get Started</button>
            </div>
          </section>
          <section class="py-16 px-8 bg-white">
            <div class="container mx-auto">
              <h2 class="text-4xl font-bold mb-12 text-center">Features</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="p-6 border border-gray-200 rounded-lg text-center">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-blue-600">1</span>
                  </div>
                  <h3 class="text-xl font-semibold mb-3">Drag & Drop</h3>
                  <p class="text-gray-600">Intuitive interface for building pages without coding.</p>
                </div>
                <div class="p-6 border border-gray-200 rounded-lg text-center">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-blue-600">2</span>
                  </div>
                  <h3 class="text-xl font-semibold mb-3">Responsive Design</h3>
                  <p class="text-gray-600">Create websites that look great on all devices.</p>
                </div>
                <div class="p-6 border border-gray-200 rounded-lg text-center">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-blue-600">3</span>
                  </div>
                  <h3 class="text-xl font-semibold mb-3">Custom Components</h3>
                  <p class="text-gray-600">Build and save your own reusable components.</p>
                </div>
              </div>
            </div>
          </section>
        `);
        
        setIsLoading(false);
      }, 500);
    }
    
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [id]);
  
  return (
    <div className={className}>
      <div className="flex h-full">
        <BlurPanel className="w-64 h-full p-4 mr-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Blocks</h3>
            <div id="blocks" className="overflow-y-auto"></div>
          </div>
        </BlurPanel>
        
        <div className="flex-1 flex flex-col">
          <BlurPanel className="relative min-h-[600px] w-full flex-1 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-3 text-lg font-medium">Loading editor...</span>
              </div>
            )}
            <div 
              id={id} 
              ref={editorRef} 
              className="w-full h-full"
            ></div>
          </BlurPanel>
          
          <BlurPanel className="mt-4 p-4">
            <h3 className="font-medium text-lg mb-3">Styles</h3>
            <div id="styles"></div>
          </BlurPanel>
        </div>
      </div>
    </div>
  );
};

export default Builder;
