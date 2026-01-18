
import React from 'react';

interface ProgressProps {
  current: number;
  total: number;
}

const Progress: React.FC<ProgressProps> = ({ current, total }) => {
  const percentage = Math.min(((current + 1) / total) * 100, 100);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 bg-gray-100 w-full overflow-hidden">
        <div 
          className="h-full bg-stone-800 transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
