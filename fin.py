import cv2
import requests
import os
from dotenv import load_dotenv
load_dotenv()

def detect_liveness(frame):
    _, img_encoded = cv2.imencode('.jpg', frame)
    files = {"image": ('frame.jpg', img_encoded.tostring())}
    response = requests.post(url, files=files, headers=headers)
    result = response.json()
    return result['data']['result']

def main():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        result = detect_liveness(frame)
        cv2.putText(frame, result, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Face Liveness Detection', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
if __name__ == "__main__":
    url = "https://face-liveness-detection3.p.rapidapi.com/api/liveness"
    headers = {
        "X-RapidAPI-Key": os.getenv("API_KEY"),
        "X-RapidAPI-Host": "face-liveness-detection3.p.rapidapi.com"
    }
    main()
