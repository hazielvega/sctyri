import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationProps {
  links: Array<{ url: string | null; label: string; active: boolean }>;
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  return (
    <div className="flex justify-center mt-6">
      <nav className="flex space-x-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url || '#'}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              link.active
                ? 'bg-blue-600 text-white'
                : link.url
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </nav>
    </div>
  );
};

export default Pagination;