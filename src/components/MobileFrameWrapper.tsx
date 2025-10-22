import { ReactNode } from 'react';

interface MobileFrameWrapperProps {
  children: ReactNode;
}

export function MobileFrameWrapper({ children }: MobileFrameWrapperProps) {
  return (
    <>
      {/* Desktop: Show mobile frame */}
      <div className="hidden md:flex min-h-screen w-full items-center justify-center bg-[#262424] p-4 lg:p-8 overflow-hidden">
        <div className="relative scale-90 lg:scale-100 transition-transform duration-300">
          {/* Mobile phone frame */}
          <div className="relative w-[393px] h-[852px] bg-[#1a1919] rounded-[60px] shadow-2xl border-[14px] border-[#1a1919] overflow-hidden ring-1 ring-white/5">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[30px] bg-[#1a1919] rounded-b-3xl z-50"></div>
            
            {/* Screen */}
            <div className="relative w-full h-full bg-[#262424] overflow-hidden rounded-[46px]">
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 shadow-inner pointer-events-none z-10" style={{
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
              }}></div>
              
              {/* App content */}
              <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#262424]">
                {children}
              </div>
            </div>
          </div>
          
          {/* Power button */}
          <div className="absolute -right-[2px] top-[180px] w-[4px] h-[80px] bg-[#1a1919] rounded-l-md"></div>
          
          {/* Volume buttons */}
          <div className="absolute -left-[2px] top-[140px] w-[4px] h-[60px] bg-[#1a1919] rounded-r-md"></div>
          <div className="absolute -left-[2px] top-[220px] w-[4px] h-[60px] bg-[#1a1919] rounded-r-md"></div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCC2FE] opacity-5 blur-[100px] rounded-full"></div>
        </div>
      </div>

      {/* Mobile: Full screen */}
      <div className="md:hidden w-full min-h-screen bg-[#262424]">
        {children}
      </div>
    </>
  );
}