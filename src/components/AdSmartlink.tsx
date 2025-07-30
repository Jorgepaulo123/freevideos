import React, { useState, useEffect } from 'react';

interface AdSmartlinkProps {
  className?: string;
  style?: React.CSSProperties;
}

const AdSmartlink: React.FC<AdSmartlinkProps> = ({ className, style }) => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const smartlinkUrl = "https://data159.click/95123dee98d356100d5a/e70513b139/?placementName=default";
  
  // Array de ofertas atrativas
  const offers = [
    {
      title: "🔥 Ofertas Exclusivas",
      description: "Descontos de até 80% em produtos selecionados",
      icon: "🎯",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "💎 Promoções Especiais",
      description: "Produtos premium com preços imperdíveis",
      icon: "💎",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "⚡ Ofertas Limitadas",
      description: "Aproveite antes que acabem! Tempo limitado",
      icon: "⚡",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  useEffect(() => {
    // Rotacionar ofertas a cada 5 segundos
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const handleClick = () => {
    // Abrir em nova aba
    window.open(smartlinkUrl, '_blank', 'noopener,noreferrer');
  };

  const currentOfferData = offers[currentOffer];

  return (
    <div 
      className={`ad-smartlink ${className || ''}`}
      style={{
        background: currentOfferData.color,
        borderRadius: '12px',
        padding: '16px',
        margin: '16px 0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        position: 'relative' as const,
        overflow: 'hidden',
        ...style
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Efeito de brilho */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        animation: 'shine 3s infinite'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '24px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}>
            {currentOfferData.icon}
          </div>
          <div>
            <h3 style={{ 
              color: 'white', 
              margin: '0 0 4px 0', 
              fontSize: '18px',
              fontWeight: '600',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {currentOfferData.title}
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              margin: '0',
              fontSize: '14px',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              {currentOfferData.description}
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: '20px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}>→</span>
        </div>
      </div>

      {/* Indicador de tempo limitado */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'rgba(255, 0, 0, 0.8)',
        color: 'white',
        fontSize: '10px',
        padding: '2px 6px',
        borderRadius: '10px',
        fontWeight: 'bold'
      }}>
        LIMITADO
      </div>
    </div>
  );
};

export default AdSmartlink; 