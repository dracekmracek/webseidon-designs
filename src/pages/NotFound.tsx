
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import WaveAnimation from "@/components/WaveAnimation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean-darker text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-ocean-darker/5 dark:bg-ocean-darker/50 z-0"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-ocean-light/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10 p-8">
        <div className="text-gold text-6xl md:text-9xl font-serif font-bold mb-6">404</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-white/80 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="btn-gold inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Return to Home
        </Link>
      </div>

      <WaveAnimation position="bottom" waveColor="rgb(93, 169, 233)" intensity="light" />
    </div>
  );
};

export default NotFound;
