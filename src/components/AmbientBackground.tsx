import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-white pointer-events-none -z-10 overflow-hidden">
      {/* Clean high-contrast white studio background with subtle soft vignette */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #fafbfc 65%, #f1f4f8 100%)',
        }}
      />
    </div>
  );
};
