
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import { Loader, Monitor, Smartphone, Tablet, Save, Code, Layout, Image, Layers, Type, Plus } from "lucide-react";
import BlurPanel from "./BlurPanel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BuilderProps {
  id: string;
  className?: string;
}

const Builder = ({ id, className }: BuilderProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editor, setEditor] = useState<any>(null);
  const [currentDevice, setCurrentDevice] = useState("Desktop");
  const [activeTab, setActiveTab] = useState("blocks");
  
  // Device switching
  const handleDeviceChange = (device: string) => {
    if (!editor) return;
    
    setCurrentDevice(device);
    editor.setDevice(device);
  };
  
  // Export HTML
  const handleExportHtml = () => {
    if (!editor) return;
    
    const html = editor.getHtml();
    const css = editor.getCss();
    
    // Create a blob with the HTML and CSS
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Page</title>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast("HTML exported successfully!", {
      description: "Your page has been exported as HTML file.",
    });
  };
  
  // Clear canvas
  const handleClearCanvas = () => {
    if (!editor) return;
    
    if (confirm("Are you sure you want to clear the canvas? This action cannot be undone.")) {
      editor.DomComponents.clear();
      editor.setComponents(`
        <div class="py-12 px-4 bg-white text-center">
          <h2 class="text-2xl font-bold mb-4">Start Building Your Page</h2>
          <p>Drag blocks from the left panel to begin.</p>
        </div>
      `);
      toast("Canvas cleared", {
        description: "Your workspace has been reset.",
      });
    }
  };
  
  // Load template
  const handleLoadTemplate = () => {
    if (!editor) return;
    
    editor.setComponents(`
      <header class="py-6 px-8 bg-white shadow-sm">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-2xl font-bold text-blue-600">Logo</div>
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          <button class="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">Sign Up</button>
        </div>
      </header>
      
      <section class="py-24 px-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div class="container mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Build Beautiful Websites</h1>
          <p class="text-xl mb-10 max-w-2xl mx-auto">Create stunning, responsive websites with our intuitive drag-and-drop editor.</p>
          <div class="flex justify-center gap-4">
            <button class="py-3 px-8 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">Get Started</button>
            <button class="py-3 px-8 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">Learn More</button>
          </div>
        </div>
      </section>
      
      <section class="py-16 px-8 bg-white">
        <div class="container mx-auto">
          <h2 class="text-4xl font-bold mb-12 text-center">Our Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 border border-gray-200 rounded-lg text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-blue-600">1</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Easy to Use</h3>
              <p class="text-gray-600">Our intuitive interface makes building websites simple for everyone.</p>
            </div>
            <div class="p-6 border border-gray-200 rounded-lg text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-blue-600">2</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Responsive Design</h3>
              <p class="text-gray-600">All templates are fully responsive and look great on any device.</p>
            </div>
            <div class="p-6 border border-gray-200 rounded-lg text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-blue-600">3</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Customizable</h3>
              <p class="text-gray-600">Easily customize every aspect of your website to match your brand.</p>
            </div>
          </div>
        </div>
      </section>
    `);
    toast("Template loaded", {
      description: "You can now customize the template to fit your needs.",
    });
  };
  
  useEffect(() => {
    let editorInstance: any;
    
    if (editorRef.current) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        editorInstance = grapesjs.init({
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
            appendTo: '#blocks-container',
            blocks: [
              {
                id: 'heading',
                label: 'Heading',
                category: 'Basic',
                attributes: { class: 'gjs-block-section' },
                content: '<h2 class="text-3xl font-bold mb-4">Heading Text</h2>',
              },
              {
                id: 'paragraph',
                label: 'Paragraph',
                category: 'Basic',
                content: '<p class="mb-4 text-gray-600">Insert your text here. This is a paragraph block that you can edit.</p>',
              },
              {
                id: 'image',
                label: 'Image',
                category: 'Basic',
                attributes: { class: 'gjs-block-image' },
                content: '<img src="https://via.placeholder.com/350x150" class="w-full h-auto rounded-lg shadow-md" alt="Image" />',
              },
              {
                id: 'button',
                label: 'Button',
                category: 'Basic',
                content: '<button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Click Me</button>',
              },
              {
                id: 'container',
                label: 'Container',
                category: 'Layout',
                content: '<div class="container mx-auto px-4 py-8"></div>',
              },
              {
                id: 'row',
                label: 'Row',
                category: 'Layout',
                content: '<div class="flex flex-col md:flex-row gap-6"></div>',
              },
              {
                id: 'column',
                label: 'Column',
                category: 'Layout',
                content: '<div class="flex-1 p-4"></div>',
              },
              {
                id: 'navbar',
                label: 'Navbar',
                category: 'Sections',
                content: `<header class="py-4 px-8 bg-white shadow-sm">
                  <div class="container mx-auto flex justify-between items-center">
                    <div class="text-2xl font-bold text-blue-600">Logo</div>
                    <nav class="hidden md:flex space-x-6">
                      <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                      <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                      <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
                      <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                    </nav>
                    <button class="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">Sign Up</button>
                  </div>
                </header>`,
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
                id: 'testimonial',
                label: 'Testimonial',
                category: 'Sections',
                content: `<section class="py-16 px-8 bg-gray-50">
                  <div class="container mx-auto">
                    <h2 class="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
                    <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
                      <div class="flex flex-col items-center text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
                        <p class="text-xl italic mb-6">"This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed."</p>
                        <h4 class="font-bold">Jane Smith</h4>
                        <p class="text-gray-600">CEO, Company Name</p>
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
              {
                id: 'footer',
                label: 'Footer',
                category: 'Sections',
                content: `<footer class="py-12 px-8 bg-gray-900 text-white">
                  <div class="container mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div>
                        <h3 class="text-xl font-bold mb-4">Company</h3>
                        <ul class="space-y-2">
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold mb-4">Services</h3>
                        <ul class="space-y-2">
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Products</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Solutions</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold mb-4">Resources</h3>
                        <ul class="space-y-2">
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold mb-4">Legal</h3>
                        <ul class="space-y-2">
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                      <p>© 2023 Company Name. All rights reserved.</p>
                    </div>
                  </div>
                </footer>`,
              },
            ],
          },
          styleManager: {
            appendTo: '#styles-container',
            sectors: [
              { 
                name: 'Typography',
                open: false,
                properties: [
                  'font-family',
                  'font-size',
                  'font-weight',
                  'letter-spacing',
                  'color',
                  'line-height',
                  'text-align',
                  'text-decoration',
                  'text-shadow'
                ]
              },
              { 
                name: 'Dimension',
                open: false,
                properties: [
                  'width',
                  'height',
                  'max-width',
                  'min-height',
                  'margin',
                  'padding'
                ]
              },
              { 
                name: 'Decorations',
                open: false,
                properties: [
                  'background-color',
                  'border',
                  'border-radius',
                  'box-shadow'
                ]
              },
              { 
                name: 'Extra',
                open: false,
                properties: [
                  'opacity',
                  'transition',
                  'transform',
                  'cursor',
                  'display',
                  'position',
                  'overflow'
                ] 
              },
            ],
          },
          layerManager: {
            appendTo: '#layers-container',
          },
          selectorManager: {
            appendTo: '#selectors-container',
          },
        });
        
        // Set default content after init
        editorInstance.setComponents(`
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
        
        setEditor(editorInstance);
        setIsLoading(false);
      }, 500);
    }
    
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [id]);
  
  return (
    <div className={`${className} flex flex-col h-full`}>
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadTemplate}
            className="flex items-center gap-1"
          >
            <Layout className="w-4 h-4" />
            <span>Template</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCanvas}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportHtml}
            className="flex items-center gap-1"
          >
            <Save className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={currentDevice === "Desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDeviceChange("Desktop")}
            className="flex items-center gap-1"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={currentDevice === "Tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDeviceChange("Tablet")}
            className="flex items-center gap-1"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={currentDevice === "Mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDeviceChange("Mobile")}
            className="flex items-center gap-1"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 h-[calc(100%-52px)] overflow-hidden">
        {/* Left sidebar with tabs */}
        <BlurPanel className="w-72 h-full overflow-hidden flex flex-col shadow-xl border-r border-gray-300/20 rounded-none">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
            <TabsList className="w-full h-12 grid grid-cols-3 bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200/50 rounded-none p-1">
              <TabsTrigger value="blocks" className="flex items-center gap-1 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                <Layout className="w-4 h-4" />
                <span>Blocks</span>
              </TabsTrigger>
              <TabsTrigger value="layers" className="flex items-center gap-1 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                <Layers className="w-4 h-4" />
                <span>Layers</span>
              </TabsTrigger>
              <TabsTrigger value="styles" className="flex items-center gap-1 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                <Type className="w-4 h-4" />
                <span>Styles</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="blocks" className="flex-1 overflow-hidden p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div id="blocks-container" className="w-full grid grid-cols-2 gap-3"></div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="layers" className="flex-1 overflow-hidden p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div id="layers-container" className="w-full"></div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="styles" className="flex-1 overflow-hidden p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div id="styles-container" className="w-full"></div>
                  <div id="selectors-container" className="w-full mt-4"></div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </BlurPanel>
        
        {/* Main editor area */}
        <div className="relative flex-1 h-full overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default Builder;
