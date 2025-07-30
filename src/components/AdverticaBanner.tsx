import React, { useEffect, useRef, useState } from 'react';

interface AdverticaBannerProps {
  className?: string;
  style?: React.CSSProperties;
  position?: 'top' | 'bottom';
}

const AdverticaBanner: React.FC<AdverticaBannerProps> = ({ 
  className, 
  style, 
  position = 'top' 
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Carregar o script da Advertica
    const script = document.createElement('script');
    script.src = '//data159.click/js/responsive.js';
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const getBannerStyles = () => {
    const baseStyles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '16px 0',
      minHeight: '90px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative' as const,
      ...style
    };

    return baseStyles;
  };

  return (
    <div 
      className={`advertica-banner advertica-banner-${position} ${className || ''}`}
      style={getBannerStyles()}
      ref={bannerRef}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          🔥 Carregando ofertas especiais...
        </div>
      )}

      {/* Banner da Advertica */}
      <ins 
        style={{ 
          width: '728px', 
          height: '90px',
          display: 'block',
          margin: '0 auto',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }} 
        data-width="728" 
        data-height="90" 
        className="qcbf67bfb3d" 
        data-domain="//data159.click" 
        data-affquery="/d12ed6eee2f69f3612ae/cbf67bfb3d/?placementName=default"
      />
    </div>
  );
};

export default AdverticaBanner; 