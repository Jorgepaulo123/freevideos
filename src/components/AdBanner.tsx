import React from 'react';

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
  position?: 'top' | 'bottom' | 'sidebar';
}

const AdBanner: React.FC<AdBannerProps> = ({ className, style, position = 'top' }) => {
  // Placeholder para banner ad - substitua pelo código real da Advertica
  const bannerUrl = "https://data159.click/95123dee98d356100d5a/e70513b139/?placementName=banner";
  
  const getBannerStyles = () => {
    const baseStyles = {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      borderRadius: '8px',
      padding: '12px',
      margin: '16px 0',
      textAlign: 'center' as const,
      transition: 'all 0.3s ease',
      ...style
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: '14px'
        };
      case 'bottom':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          fontSize: '14px'
        };
      case 'sidebar':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          fontSize: '12px',
          padding: '8px'
        };
      default:
        return baseStyles;
    }
  };

  const handleClick = () => {
    window.open(bannerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`ad-banner ad-banner-${position} ${className || ''}`}
      style={getBannerStyles()}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.01)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ color: 'white', fontWeight: '500' }}>
        {position === 'top' && '🔥 Ofertas Especiais - Clique Aqui!'}
        {position === 'bottom' && '💎 Descontos Exclusivos - Aproveite!'}
        {position === 'sidebar' && '🎯 Promoções'}
      </div>
    </div>
  );
};

export default AdBanner; 