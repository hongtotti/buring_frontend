/waste_capture 페이지에서 사용자가 이미지를 업로드합니다.

해당 이미지는 Base64로 인코딩되어 sessionStorage에 저장됩니다.

/waste_capture_result 페이지가 로드될 때, sessionStorage에서 이미지를 꺼내서 백엔드로 전송합니다.

Postman으로 요청하는 법
POST 요청
URL: http://localhost:3000/api/classify
Headers: Content-Type: application/json
Body (raw → JSON 선택): {
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."  // 전체 Base64 포함
}
