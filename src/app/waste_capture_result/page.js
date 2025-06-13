"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WasteCaptureResultPage() {
  const router = useRouter()
  const [displayedImage, setDisplayedImage] = useState(null)
  const [classificationResult, setClassificationResult] = useState("")
  const [isLoading, setIsLoading] = useState(true) // 분류 로딩 상태
  const [error, setError] = useState(null) // 오류 상태

  useEffect(() => {
    // sessionStorage에서 이미지 데이터 가져오기
    const imageToClassify = sessionStorage.getItem("imageToClassify")
    if (imageToClassify) {
      setDisplayedImage(imageToClassify)
      // 이미지 데이터를 가져왔으면 바로 분류 시작
      handleClassification(imageToClassify)
    } else {
      // 이미지 데이터가 없으면 오류 처리 또는 이전 페이지로 리다이렉트
      setError("분류할 이미지를 찾을 수 없습니다.")
      setIsLoading(false)
      // router.replace("/waste-capture"); // 필요하다면 이전 페이지로 강제 이동
    }

    // 컴포넌트 언마운트 시 sessionStorage에서 이미지 데이터 제거 (선택 사항)
    return () => {
      sessionStorage.removeItem("imageToClassify")
    }
  }, []) // 컴포넌트 마운트 시 한 번만 실행

  const handleClassification = async (image) => {
    setIsLoading(true)
    setClassificationResult("")
    setError(null)

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: image }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setClassificationResult(data.label || "분류 실패")
    } catch (err) {
      setError(`분류 중 오류 발생: ${err.message}`)
      console.error("분류 중 오류 발생:", err)
      setClassificationResult("오류 발생") // 사용자에게 표시할 메시지
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* 상단 뒤로가기 버튼 */}
      <div className="w-full flex justify-start relative z-10 p-4">
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

      {/* 캡쳐된 이미지 섹션 */}
      <div className="w-full max-w-md bg-white rounded-b-3xl overflow-hidden shadow-md">
        <div className="relative w-full h-120">
          {displayedImage ? (
            <Image
              src={displayedImage || "/placeholder.svg"}
              alt="분류된 쓰레기 이미지"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              이미지 로드 중...
            </div>
          )}
        </div>
      </div>

      {/* 결과 내용 섹션 */}
      <div className="w-full max-w-md bg-white p-6 rounded-t-3xl -mt-8 relative z-10 shadow-lg text-center">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-lg font-bold text-gray-700">분류 중...</p>
            <p className="text-sm text-gray-500 mt-2">잠시만 기다려 주세요.</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg font-bold text-red-500">오류 발생</p>
            <p className="text-sm text-gray-600 mt-2">{error}</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              {classificationResult}으로 버리기
              <span className="ml-2 text-green-500">🌿</span>
            </h1>
            <p className="text-sm text-gray-500 mb-4">분석 완료! + 10 EXP</p>

            <p className="text-green-600 font-semibold mb-4">{classificationResult} 1개를 인식했어요!</p>

            <div className="text-gray-700 text-sm leading-relaxed mb-8">
              <p>
                쓰레기 이렇게 버리세요. 저렇게 버리세요. 쓰레기 이렇게 버리세요. 쓰레기 이렇게 버리세요. 쓰레기 이렇게
                버리세요. 저렇게 버리세요. 쓰레기 이렇게 버리세요. 저렇게 버리세요. 쓰레기 이렇게 버리세요.
              </p>
            </div>
          </>
        )}

        {/* 버튼 */}
        <Link
          href="#"
          className="block w-full py-4 bg-[#E0FF8C] text-green-800 text-base font-bold rounded-xl text-center shadow-md transition-all hover:bg-[#D0EE7C] flex items-center justify-center"
        >
          분리배출 하러가기
          <span className="ml-2">↗</span>
        </Link>
      </div>
    </div>
  )
}
