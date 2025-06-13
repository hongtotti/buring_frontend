"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WasteCameraResultPage() {
  const router = useRouter()
  const [displayedImage, setDisplayedImage] = useState(null)

  useEffect(() => {
    // sessionStorage에서 이미지 데이터 가져오기
    const imageForReview = sessionStorage.getItem("capturedImageForReview")
    if (imageForReview) {
      setDisplayedImage(imageForReview)
    } else {
      // 이미지가 없으면 이전 페이지로 리다이렉트 (예: waste-capture)
      router.replace("/waste_capture")
    }

    // 컴포넌트 언마운트 시 sessionStorage에서 이미지 데이터 제거 (선택 사항)
    // return () => {
    //   sessionStorage.removeItem("capturedImageForReview");
    // };
  }, [router])

  const handleRetake = () => {
    router.push("/waste_camera") // 다시 촬영 페이지로 이동
  }

  const handleAnalyze = () => {
    // 현재 표시된 이미지를 분류를 위해 sessionStorage에 저장하고 결과 페이지로 이동
    if (displayedImage) {
      sessionStorage.setItem("imageToClassify", displayedImage)
      router.push("/waste_capture_result") // 분류 결과 페이지로 이동
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-4">
      {/* 상단 뒤로가기 버튼 */}
      <div className="w-full flex justify-start relative z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-gray-600"
          aria-label="뒤로가기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* 캡쳐된 이미지 표시 영역 */}
      <div className="relative w-full max-w-md aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
        {displayedImage ? (
          <Image
            src={displayedImage || "/placeholder.svg"}
            alt="캡쳐된 이미지"
            width={450}
            height={600}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-gray-500">이미지 로드 중...</div>
        )}
      </div>

      {/* 하단 버튼 섹션 */}
      <div className="w-full max-w-md flex justify-center gap-4 pb-4">
        <button
          onClick={handleRetake}
          className="flex-1 py-4 bg-white text-gray-800 text-base font-bold rounded-full shadow-md transition-all hover:bg-gray-100"
        >
          다시찍기
        </button>
        <button
          onClick={handleAnalyze}
          className="flex-1 py-4 bg-[#E0FF8C] text-green-800 text-base font-bold rounded-full shadow-md transition-all hover:bg-[#D0EE7C]"
        >
          분석하기
        </button>
      </div>
    </div>
  )
}
