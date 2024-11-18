import {
  AlphaValue,
  Animatable,
  AnimationPlayer,
  createAnimation,
} from '../../../dist';
import { useEffect, useRef, useState } from 'react';

type AnimationPlayerProps = {
  animation: Animatable[];
};

export default function JapitPlayer({ animation }: AnimationPlayerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<AnimationPlayer>(null);

  useEffect(() => {
    if (svgRef.current) {
      playerRef.current = createAnimation(svgRef.current, animation);
      playerRef.current.progress.subscribe((p) => {
        setProgress(p.getNumber());
      });
      playerRef.current.running.subscribe((r) => {
        setIsPlaying(r !== undefined);
      });
    }
  }, [animation]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const value = parseFloat(event.target.value);
      playerRef.current.stop();
      playerRef.current.seekProgress(new AlphaValue(value));
    }
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.stop();
      } else {
        if (progress === 1) {
          playerRef.current.seek(0);
        }
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ marginBottom: 'var(--ifm-leading)' }}>
      <svg
        ref={svgRef}
        style={{
          width: '100%',
          border: '1px solid #ccc',
        }}
        viewBox="0 0 1000 500"
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={togglePlay}
          style={{
            padding: '8px 16px',
            width: '100px',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={handleSliderChange}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
}
