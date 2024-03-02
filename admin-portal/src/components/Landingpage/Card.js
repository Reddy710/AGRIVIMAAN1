

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, path, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={path}>
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-1000 flex flex-col relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-w-16 aspect-h-9">
          <img src={image} alt={title} className="w-full h-full object-cover object-center" />
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4">
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
