import React, { useEffect } from "react";
import Webcam from "react-webcam";

export const WebcamStreamCapture = () => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!capturing) {
        console.log("running handleDownload");
        handleDownload();
      }
    }
  }, [capturing]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const video = document.getElementById("video-replay");
      video.src = url;
    }
  }, [recordedChunks]);

  return (
    <>
      <div className=" h-screen w-screen flex justify-center items-center  bg-gradient-to-r from-purple-300 to-blue-300  overflow-y-scroll">
        <div className="   bg-white bg-opacity-60 flex-col gap-8 rounded-xl border border-gray-100 flex items-center justify-center p-5">
          <Webcam audio={true} ref={webcamRef} height={300} width={500} />
          <div className=" text-purple-900 ">
            Record a video of yourself , telling your name , address , dob{" "}
          </div>
          {capturing ? (
            <button
              className="btn btn-danger bg-purple-900 p-3 text-white w-1/3 rounded-xl font-semibold text-xl"
              onClick={handleStopCaptureClick}
            >
              Stop Capture
            </button>
          ) : (
            <button
              className="btn btn-danger bg-purple-900 p-3 text-white w-1/3 rounded-xl font-semibold text-xl"
              onClick={handleStartCaptureClick}
            >
              Start Capture
            </button>
          )}

          {/* {recordedChunks.length > 0 && (
              <div>
                <video
                  id="video-replay"
                  height="100"
                  width="500"
                  controls
                ></video>
                <button onClick={handleDownload}>Download</button>
              </div>
            )} */}
        </div>
      </div>
    </>
  );
};
