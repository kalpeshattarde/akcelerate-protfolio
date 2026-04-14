import React from 'react';

const ArticleContent = ({ content, fontSize, lineHeight, theme }) => {
  const themeClasses = theme === 'dark' ?'bg-gray-900 text-gray-100' :'bg-background text-foreground';

  return (
    <article className={`prose prose-lg max-w-none ${fontSize} ${lineHeight} ${themeClasses}`}>
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontFamily: 'Source Serif 4, serif',
          lineHeight: lineHeight === 'leading-tight' ? '1.4' : 
                     lineHeight === 'leading-normal' ? '1.6' :
                     lineHeight === 'leading-relaxed' ? '1.8' : '2.0'
        }}
      />
    </article>
  );
};

export default ArticleContent;