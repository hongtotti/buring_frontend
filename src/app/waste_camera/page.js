"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WasteCameraPage() {
  const router = useRouter()

  // 이 페이지는 카메라 프리뷰를 위한 것이므로, 실제 카메라 스트림을 처리하는 로직은 포함하지 않습니다.
  // 대신, 이미지를 찍을 위치를 시각적으로 보여주기 위한 플레이스홀더를 사용합니다.

  const handleCaptureClick = () => {
    // 실제 카메라 촬영 로직이 여기에 들어갈 수 있습니다.
    // 예를 들어, 사진을 찍은 후 결과 페이지로 이동할 수 있습니다.
    router.push("/waste_camera_result") // 이 줄을 수정했습니다.
    // console.log("사진 촬영 버튼 클릭됨") // 이 줄은 이제 필요 없으므로 제거하거나 주석 처리할 수 있습니다.
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

      {/* 카메라 프리뷰 영역 및 프레임 */}
      <div className="relative w-full max-w-md aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
        {/* 예시 이미지 (실제 카메라 프리뷰 또는 캡쳐된 이미지로 대체될 위치) */}
        <Image
          src="/placeholder.svg?height=600&width=450"
          alt="카메라 프리뷰 플레이스홀더"
          width={450}
          height={600}
          className="object-cover w-full h-full"
        />

        {/* 카메라 프레임 오버레이 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 각 모서리 L자 모양 */}
          <div className="absolute top-0 left-0 w-1/4 h-1/4 border-t-4 border-l-4 border-[#00B493] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-1/4 h-1/4 border-t-4 border-r-4 border-[#00B493] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border-b-4 border-l-4 border-[#00B493] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border-b-4 border-r-4 border-[#00B493] rounded-br-xl"></div>
        </div>
      </div>

      {/* 하단 촬영 버튼 */}
      <div className="w-full flex justify-center pb-4">
        <button
          onClick={handleCaptureClick}
          className="w-16 h-16 rounded-full bg-white border-4 border-[#00B493] flex items-center justify-center shadow-lg"
          aria-label="사진 촬영"
        >
          <div className="w-12 h-12 rounded-full bg-gray-800"></div>
        </button>
      </div>
    </div>
  )
}
