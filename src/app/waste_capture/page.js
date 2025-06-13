"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function WasteCapturePage() {
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [classificationResult, setClassificationResult] = useState("")
  const fileInputRef = useRef(null)

  const handleImageCapture = () => {
    setCapturedImage("/placeholder.svg?height=300&width=300")
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setCapturedImage(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleClassification = async () => {
    if (!capturedImage) return

    setIsLoading(true)
    setClassificationResult("")

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      })

      const data = await res.json()
      setClassificationResult(data.label || "분류 실패")
    } catch (err) {
      setClassificationResult("오류 발생")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FCF0] flex justify-center px-4 pt-8 pb-20">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        
        {/* 상단 헤더 */}
        <div className="relative w-full text-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-lg text-gray-500"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-800">쓰레기 사진을 촬영하세요</h1>
          <div className="w-8 mx-auto mt-1 border-b-2 border-green-500" />
        </div>

        {/* 프리뷰 박스 */}
        <div className="w-full">
          <div className="aspect-square border-2 border-dashed border-gray-300 rounded-2xl bg-white flex flex-col justify-center items-center text-gray-500 p-6 shadow-sm">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="캡쳐된 이미지"
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

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            hidden
            accept="image/*"
          />
        </div>

        {/* 결과 */}
        {classificationResult && (
          <div className="w-full bg-white p-4 rounded-xl text-center border border-green-200 shadow-sm mt-4">
            <p className="text-gray-600">분류 결과:</p>
            <p className="text-lg font-bold text-green-600 mt-1">{classificationResult}</p>
          </div>
        )}
      </div>
    </div>
  )
}
