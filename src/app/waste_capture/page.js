"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WasteCapturePage() {
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState(null) // Base64 이미지 데이터
  const [isLoading, setIsLoading] = useState(false) // 버튼 로딩 상태 유지
  const fileInputRef = useRef(null)

  // "사진 촬영" 버튼 클릭 시 waste-camera 페이지로 이동
  const handleImageCapture = () => {
    router.push("/waste_camera")
  }

  // "갤러리에서 업로드" 시 이미지 파일 읽기
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCapturedImage(event.target.result) // Base64 데이터 URL 저장
      }
      reader.readAsDataURL(file)
    }
  }

  // "분류하기" 버튼 클릭 시 이미지 데이터를 sessionStorage에 저장하고 결과 페이지로 이동
  const handleClassification = async () => {
    if (!capturedImage) return

    setIsLoading(true)
    // 이미지 데이터를 sessionStorage에 저장
    sessionStorage.setItem("imageToClassify", capturedImage)
    router.push("/waste_capture_result")
    // setIsLoading(false); // 페이지 이동 후에는 이 상태가 필요 없을 수 있습니다.
  }

  return (
    <div className="min-h-screen bg-[#F8FCF0] flex justify-center px-4 pt-8 pb-20">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        {/* 상단 헤더 */}
        <div className="relative w-full text-center">
          <button onClick={() => router.back()} className="absolute left-0 text-lg text-gray-500">
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-800">쓰레기 사진을 촬영하세요</h1>
          <div className="w-8 mx-auto mt-1 border-b-2 border-green-500" />
        </div>

        {/* 프리뷰 박스 */}
        <div className="w-full">
          <div className="aspect-square border-2 border-dashed border-gray-300 rounded-2xl bg-white flex flex-col justify-center items-center text-gray-500 p-6 shadow-sm">
            {capturedImage ? (
              <Image
                src={capturedImage || "/placeholder.svg"} // Base64 데이터 URL 사용
                alt="캡쳐된 이미지"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <>
                <div className="text-4xl mb-3">📷</div>
                <p className="text-base font-semibold">카메라 프리뷰</p>
                <p className="text-sm text-gray-400 mt-1">사진을 촬영하거나 업로드하세요</p>
              </>
            )}
          </div>
        </div>

        {/* 버튼들 */}
        <div className="w-full space-y-4">
          <button
            onClick={handleImageCapture}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-base font-semibold rounded-xl shadow-md transition-all"
          >
            📸 사진 촬영
          </button>

          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full py-3 border-2 border-green-500 text-green-600 text-base font-semibold rounded-xl bg-white hover:bg-green-50 shadow-sm transition-all"
          >
            📁 갤러리에서 업로드
          </button>

          <input type="file" ref={fileInputRef} onChange={handleImageUpload} hidden accept="image/*" />

          <button
            onClick={handleClassification}
            disabled={!capturedImage || isLoading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? "이동 중..." : "분류하기"}
          </button>
        </div>
      </div>
    </div>
  )
}
