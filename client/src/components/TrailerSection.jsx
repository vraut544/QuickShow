import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets'; // your trailer data
import BlurCircle from './BlurCircle'; // optional background effect
import 'plyr/dist/plyr.css'; // plyr styles

const getEmbedUrl = (url) => {
  if (url.includes('youtube.com/watch')) {
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
  }
  return url;
};

const getYouTubeThumbnail = (url) => {
  let videoId = '';
  if (url.includes('youtube.com/watch')) {
    videoId = new URL(url).searchParams.get('v');
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1];
  }
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="relative bg-[rgb(8,8,8)] text-white py-20 overflow-hidden">
      <BlurCircle top="-100px" right="-100px" />

      <div className="w-full flex flex-col items-center px-4">
        {/* Title above the player */}
        <p className="text-gray-300 font-semibold text-xl sm:text-2xl mb-4 text-center">
          🎬 Trailers
        </p>

        {/* Video Player */}
        <div className="w-full max-w-[960px] aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-800">
          <iframe
            src={getEmbedUrl(currentTrailer.videoUrl)}
            title={currentTrailer.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Thumbnails */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {dummyTrailers.map((trailer, index) => {
            const isActive = trailer.videoUrl === currentTrailer.videoUrl;
            const thumbnail = trailer.thumbnail || getYouTubeThumbnail(trailer.videoUrl);

            return (
              <button
                key={index}
                onClick={() => setCurrentTrailer(trailer)}
                className={`w-28 h-16 sm:w-32 sm:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-red-500 scale-105'
                    : 'border-neutral-600 hover:border-red-400'
                }`}
              >
                <img
                  src={thumbnail}
                  alt={trailer.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-thumbnail.png'; // Optional local fallback image
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
