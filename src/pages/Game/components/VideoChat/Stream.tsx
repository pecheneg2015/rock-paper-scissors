import React, { useEffect, useRef } from "react";

export const Stream = ({
  stream,
}: {
  stream: MediaStream;
  isMuted?: boolean;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
      ref.current.play();
    }
  }, [stream, ref]);
  return <video ref={ref} className="w-full" />;
};
