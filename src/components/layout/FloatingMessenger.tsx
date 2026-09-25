import React from 'react';
import Link from 'next/link';

export function FloatingMessenger() {
  // Thay thế bằng ID trang hoặc username m.me của T'Petie
  const messengerUrl = "https://m.me/tpetie.vn"; 

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50">
      <Link
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#0A7CFF] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Chat with us on Messenger"
      >
        {/* Vòng tròn hiệu ứng lan tỏa (Pulse effect) */}
        <div className="absolute inset-0 rounded-full bg-[#0A7CFF] animate-ping opacity-75"></div>
        
        {/* Icon Messenger SVG */}
        <svg
          viewBox="0 0 36 36"
          fill="currentColor"
          height="32"
          width="32"
          className="text-white relative z-10"
        >
          <path d="M18 3.513c-7.904 0-14.305 5.952-14.305 13.3 0 4.218 2.062 8.01 5.372 10.457.253.186.417.478.434.792l.228 4.26c.045.836.91 1.342 1.638.95l4.636-2.483c.24-.129.516-.174.783-.133 1.155.18 2.345.275 3.565.275 7.904 0 14.305-5.952 14.305-13.3S25.904 3.513 18 3.513zM23.107 19.387l-4.102-4.372a.893.893 0 0 0-1.284-.044l-3.923 3.652c-.628.584-1.554-.153-1.077-.842l4.102-4.372a.893.893 0 0 0 1.284.044l3.923-3.652c.628-.584 1.554.153 1.077.842z" />
        </svg>
        
        {/* Tooltip khi hover */}
        <div className="absolute right-full mr-4 px-3 py-1.5 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat với T'Petie
        </div>
      </Link>
    </div>
  );
}
