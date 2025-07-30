import React, { Suspense } from 'react';

interface IconWrapperProps {
  icon: React.ComponentType<any>;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: IconComponent, 
  className, 
  size = 24,
  style 
}) => {
  return (
    <Suspense fallback={
      <div 
        style={{
          width: size,
          height: size,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          display: 'inline-block'
        }}
      />
    }>
      <IconComponent 
        className={className}
        size={size}
        style={style}
      />
    </Suspense>
  );
};

export default IconWrapper; 