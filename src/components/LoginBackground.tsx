import React from 'react';

export default function LoginBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8faff]">
      {/* Grainy Texture - Subtle */}
      <div 
        className="absolute inset-0 opacity-[0.25] z-[1] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Gradient Mesh Blobs */}
      <div className="absolute inset-0 z-0">
        {/* Top Left - White/Light Blue */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"
          style={{
            background: '#e0f2fe', // Very light blue
            animationDelay: '0s',
          }}
        />
        
        {/* Top Right - Cyan/Sky Blue */}
        <div 
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"
          style={{
            background: '#bae6fd', // Sky blue
            animationDelay: '2s',
          }}
        />
        
        {/* Bottom Left - Soft Purple/Blue (Accent from reference image 1) */}
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob"
          style={{
            background: '#e9d5ff', // Soft purple/violet hint
            animationDelay: '4s',
          }}
        />

         {/* Bottom Right - Brighter Blue */}
         <div 
          className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"
          style={{
            background: '#7dd3fc', // Brighter sky blue
            animationDelay: '6s',
          }}
        />
        
        {/* Center/Floating - White Highlight */}
        <div 
          className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full mix-blend-overlay filter blur-[60px] opacity-90 animate-blob"
          style={{
            background: '#ffffff',
            animationDelay: '3s',
          }}
        />
      </div>
    </div>
  );
}
