import React, { useState, useRef, useEffect, useCallback } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  // Animated waveform bars state
  const waveformBars = 5;

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  }, [isMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Volume icon based on state
  const VolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      );
    }
    if (volume < 0.5) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
      </svg>
    );
  };

  return (
    <>
      {/* Hidden audio element — swap src with your Lo-Fi track later */}
      <audio ref={audioRef} loop preload="none">
        {/* <source src="/your-lofi-track.mp3" type="audio/mpeg" /> */}
      </audio>

      <div
        id="global-audio-player"
        className="fixed bottom-0 left-0 right-0 z-50 h-14"
      >
        {/* Glassmorphism backdrop */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-t border-white/5" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-between px-4 md:px-8 max-w-screen-2xl mx-auto">
          
          {/* Left: Track info + waveform */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Waveform visualizer */}
            <div className="flex items-end gap-[3px] h-6">
              {Array.from({ length: waveformBars }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-full transition-all duration-300 ${
                    isPlaying
                      ? 'bg-fuchsia-500 animate-waveform'
                      : 'bg-slate-700 h-1'
                  }`}
                  style={{
                    animationDelay: isPlaying ? `${i * 0.15}s` : '0s',
                    height: isPlaying ? undefined : '4px',
                  }}
                />
              ))}
            </div>

            {/* Track name */}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-300 truncate">
                {isPlaying ? '♪ Lo-Fi Vibes' : 'Audio Player'}
              </p>
              <p className="text-[10px] text-slate-600 truncate">
                {isPlaying ? 'Now Playing' : 'Click play to start'}
              </p>
            </div>
          </div>

          {/* Center: Play controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500/30 hover:text-fuchsia-300 hover:border-fuchsia-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/20 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Right: Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-slate-500 hover:text-fuchsia-400 transition-colors duration-200"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <VolumeIcon />
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="audio-volume-slider w-16 md:w-24 h-1 appearance-none bg-slate-700 rounded-full cursor-pointer accent-fuchsia-500"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
      </div>
    </>
  );
};

export default AudioPlayer;
