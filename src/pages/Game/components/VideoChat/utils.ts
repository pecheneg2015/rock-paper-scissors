export const getStream = async () => {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
};
