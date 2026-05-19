import { useState, useEffect } from "react";
import { Layers } from "lucide-react";

interface LivePreviewProps {
  title: string;
  reactCode: string;
}

export function LivePreview({ title, reactCode }: LivePreviewProps) {
  const [hasError, setHasError] = useState(false);

  // Extract component name from code
  const getComponentName = (code: string): string | null => {
    // 1. Matches: export default function ComponentName
    const match1 = code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
    if (match1) return match1[1];

    // 2. Matches: export default class ComponentName
    const match2 = code.match(/export\s+default\s+class\s+([A-Za-z0-9_]+)/);
    if (match2) return match2[1];

    // 3. Matches: export default ComponentName
    const match3 = code.match(/export\s+default\s+([A-Za-z0-9_]+)/);
    if (match3) return match3[1];

    // 4. Fallback: try to find any function name
    const match4 = code.match(/function\s+([A-Za-z0-9_]+)/);
    if (match4) return match4[1];

    return null;
  };

  // Clean imports and exports
  const cleanCodeForBabel = (code: string): string => {
    return code
      // Strip all standard ESM imports
      .replace(/import\s+[\s\S]+?from\s+['"].+?['"];?/g, "")
      // Strip export default prefix
      .replace(/export\s+default\s+/, "")
      // Replace min-h-screen and h-screen so components scale beautifully in the 192px card preview
      .replace(/\bmin-h-screen\b/g, "min-h-full h-full")
      .replace(/\bh-screen\b/g, "h-full");
  };

  const componentName = getComponentName(reactCode);
  const cleanedCode = cleanCodeForBabel(reactCode);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "RENDER_ERROR" && event.data.title === title) {
        setHasError(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [title]);

  // Fallback UI
  const fallbackUI = (
    <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-950 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center p-6 text-center transition-colors">
      <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-sm mb-3">
        <Layers className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[200px] truncate">
        Failed to compile or render preview
      </p>
    </div>
  );

  if (hasError || !componentName) {
    return fallbackUI;
  }

  // Construct iframe source
  const srcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: transparent;
          overflow: hidden;
        }
        #root {
          transform: scale(0.6);
          transform-origin: center center;
          width: 166.66%;
          height: 166.66%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #root > div {
          width: 100%;
          height: 100%;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        try {
          // Submitted Code
          ${cleanedCode}

          // Execute Render
          const ComponentToRender = ${componentName};
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<ComponentToRender />);
        } catch (err) {
          console.error("Babel/Render Error:", err);
          window.parent.postMessage({ type: 'RENDER_ERROR', title: '${title}' }, '*');
        }
      </script>
    </body>
    </html>
  `;

  return (
    <div className="w-full h-48 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 relative group">
      <iframe
        srcDoc={srcDoc}
        title={`preview-${title}`}
        className="w-full h-full border-none pointer-events-none"
        sandbox="allow-scripts"
        onError={() => setHasError(true)}
      />
      {/* Hover Overlay indicator */}
      <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
