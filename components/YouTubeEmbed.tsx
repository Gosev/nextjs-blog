import React from 'react';

const videoresponsiveStyle: React.CSSProperties = {
  overflow: 'hidden',
  paddingBottom: '56.25%',
  position: 'relative',
  height: 0
};

const iframeStyle: React.CSSProperties = {
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  position: 'absolute'
};

interface YoutubeProps {
  embedId: string;
}

const YouTubeEmbed: React.FC<YoutubeProps> = ({ embedId }: YoutubeProps) => (
  <div style={videoresponsiveStyle}>
    <iframe

      style={iframeStyle}

      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YouTubeEmbed;