"use client";

import { useState, useCallback, useRef } from "react";

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels: Record<string, string>;
  preview_url: string;
}

export function useElevenLabs() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<Voice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const fetchVoices = useCallback(async () => {
    try {
      const response = await fetch("/api/voices");
      const data = await response.json();
      if (data.voices) {
        setVoices(data.voices);
      }
    } catch (err) {
      console.error("Failed to fetch voices:", err);
    }
  }, []);

  const speak = useCallback(
    async (
      text: string,
      voiceId: string = "JBFqnCBsd6RMkjVDRZzb",
      onAnalyserReady?: (analyser: AnalyserNode) => void
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voiceId }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate speech");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Stop any existing audio
        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioRef.current.src);
        }

        // Create new audio element
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        // Set up audio context for visualization
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }

        const audioContext = audioContextRef.current;
        const source = audioContext.createMediaElementSource(audio);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyserRef.current = analyser;

        if (onAnalyserReady) {
          onAnalyserReady(analyser);
        }

        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          setError("Failed to play audio");
          setIsPlaying(false);
        };

        await audio.play();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  return {
    speak,
    stop,
    fetchVoices,
    voices,
    isLoading,
    isPlaying,
    error,
    analyser: analyserRef.current,
  };
}
