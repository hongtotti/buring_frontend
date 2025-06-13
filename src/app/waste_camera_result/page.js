"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WasteCameraResultPage() {
  const router = useRouter()

  const handleRetake = () => {
    router.push("/waste_camera") // 다시 찍기 버튼 클릭 시 카메라 페이지로 이동
  }

  const handleAnalyze = () => {
    router.push("/waste_capture_result") // 분석하기 버튼 클릭 시 분류 결과 페이지로 이동
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
        {/* 캡쳐된 이미지 (현재는 플레이스홀더) */}
        <Image
          src="/placeholder.svg?height=600&width=450" // 실제 캡쳐된 이미지 경로로 변경 필요
          alt="캡쳐된 이미지"
          width={450}
          height={600}
          className="object-cover w-full h-full"
        />
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
          className="flex-1 py-4 bg-[#E0FF8C] text-mint-800 text-base font-bold rounded-full shadow-md transition-all hover:bg-[#D0EE7C]"
        >
          분석하기
        </button>
      </div>
    </div>
  )
}
