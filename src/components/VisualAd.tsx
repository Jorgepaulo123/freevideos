import React, { useState, useEffect } from 'react';

interface VisualAdProps {
  className?: string;
  style?: React.CSSProperties;
  type?: 'product' | 'offer' | 'promotion';
}

const VisualAd: React.FC<VisualAdProps> = ({ 
  className, 
  style, 
  type = 'offer' 
}) => {
  const [currentAd, setCurrentAd] = useState(0);
  
  // Anúncios visuais com imagens e ofertas
  const visualAds = [
    {
      title: "🔥 Smartphone Premium",
      description: "iPhone 15 Pro - 50% OFF",
      price: "R$ 2.999",
      originalPrice: "R$ 5.998",
      image: "📱",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      badge: "LIMITADO"
    },
    {
      title: "💎 Fones Bluetooth",
      description: "AirPods Pro - 70% OFF",
      price: "R$ 299",
      originalPrice: "R$ 999",
      image: "🎧",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      badge: "ESGOTANDO"
    },
    {
      title: "⚡ Smart TV 4K",
      description: "55\" Samsung - 60% OFF",
      price: "R$ 1.499",
      originalPrice: "R$ 3.799",
      image: "📺",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      badge: "ÚLTIMAS"
    }
  ];

  useEffect(() => {
    // Rotacionar anúncios a cada 4 segundos
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % visualAds.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visualAds.length]);

  const currentAdData = visualAds[currentAd];
  const smartlinkUrl = "https://data159.click/95123dee98d356100d5a/e70513b139/?placementName=default";

  const handleClick = () => {
    window.open(smartlinkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`visual-ad ${className || ''}`}
      style={{
        background: currentAdData.color,
        borderRadius: '16px',
        padding: '20px',
        margin: '16px 0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative' as const,
        overflow: 'hidden',
        minHeight: '120px',
        ...style
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
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
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animation: 'shine 4s infinite'
      }} />

      {/* Badge de urgência */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'rgba(255, 0, 0, 0.9)',
        color: 'white',
        fontSize: '10px',
        padding: '4px 8px',
        borderRadius: '12px',
        fontWeight: 'bold',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      }}>
        {currentAdData.badge}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Imagem do produto */}
        <div style={{
          fontSize: '48px',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          animation: 'pulse 2s infinite'
        }}>
          {currentAdData.image}
        </div>

        {/* Informações do produto */}
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: 'white', 
            margin: '0 0 8px 0', 
            fontSize: '20px',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            {currentAdData.title}
          </h3>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: '0 0 8px 0',
            fontSize: '14px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            {currentAdData.description}
          </p>
          
          {/* Preços */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {currentAdData.price}
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              textDecoration: 'line-through',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              {currentAdData.originalPrice}
            </span>
          </div>
        </div>

        {/* Botão de ação */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.3)',
          transition: 'all 0.3s ease'
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: '24px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}>→</span>
        </div>
      </div>
    </div>
  );
};

export default VisualAd; 