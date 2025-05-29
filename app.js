import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { marked } from 'marked';

// NOTE: WebsimSocket and useQuery are not used in this specific app,
// as it only displays static markdown content.
// They are part of the documented context, but not needed for this task.
// import { WebsimSocket, useQuery } from '@websim/db';
// const room = new WebsimSocket({ schema: {} });

function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('./documentation.md')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        // Configure marked to handle code blocks and other elements appropriately
        marked.setOptions({
          gfm: true, // Use GitHub Flavored Markdown
          breaks: false, // Don't convert single line breaks to <br>
          pedantic: false,
          sanitize: false, // IMPORTANT: Only disable if source is trusted. Here, it's our own .md file.
          smartLists: true,
          smartypants: false
        });
        setHtmlContent(marked.parse(text));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load or parse markdown:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading documentation...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">Error loading documentation: {error}</div>;
  }

  return (
    <div id="markdown-container" className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg my-8">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

