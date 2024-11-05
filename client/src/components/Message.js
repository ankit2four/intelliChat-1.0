import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Message = ({ message }) => {
  const content = message;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the "Copied!" message after 2 seconds
  };

  return (
    <div>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="code-block">
                
                <CopyToClipboard text={String(children).replace(/\n$/, '')} onCopy={handleCopy}>
                  <button className="copy-button">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter
                  style={{...solarizedlight, 'pre[class*="language-"]': {
                  background: '#161616',
                  overflow:'auto',
                  padding:'15px',
                  borderRadius:'1em',
                  fontSize:'1em',
                  overflowWrap:'normal',
                  lineHeight:'1.5',
                  tabSize:'4',
                  
                  
                },

                  'code[class*="language-"]': {
                    color: '#a0c0c0',
                  },
                
                }}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                 
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Message;
