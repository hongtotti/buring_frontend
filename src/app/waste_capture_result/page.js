import Image from "next/image"
import Link from "next/link" // Link 컴포넌트 추가

export default function WasteCaptureResultPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* 상단 이미지 섹션 */}
      <div className="w-full max-w-md bg-white rounded-b-3xl overflow-hidden shadow-md">
        {/* 이미지 컨테이너에 고정 높이 추가 및 object-cover 적용 */}
        <div className="relative w-full h-110">
          {" "}
          {/* h-96 (24rem)으로 고정 높이 설정 */}
          <Image
            src="/trash.png" // 예시 이미지, 실제 이미지 경로로 변경 가능
            alt="분류된 쓰레기 이미지"
            fill // 부모 컨테이너에 맞춰 이미지를 채움
            className="object-cover" // 이미지가 컨테이너를 채우도록 자름
          />
        </div>
      </div>

      {/* 결과 내용 섹션 */}
      <div className="w-full max-w-md bg-white p-6 rounded-t-3xl -mt-8 relative z-10 shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          일반 쓰레기로 버리기
          <span className="ml-2 text-green-500">🌿</span> {/* 나뭇잎 이모지 */}
        </h1>
        <p className="text-sm text-gray-500 mb-4">분석 완료! + 10 EXP</p>

        <p className="text-green-600 font-semibold mb-4">페트병 1개를 인식했어요!</p>

        <div className="text-gray-700 text-sm leading-relaxed mb-8">
          <p>
            쓰레기 이렇게 버리세요. 저렇게 버리세요. 쓰레기 이렇게 버리세요. 쓰레기 이렇게 버리세요. 쓰레기 이렇게
            버리세요. 저렇게 버리세요. 쓰레기 이렇게 버리세요. 저렇게 버리세요. 쓰레기 이렇게 버리세요.
          </p>
        </div>

        {/* 버튼 */}
        <Link
          href="#"
          className="block w-full py-4 bg-[#E0FF8C] text-green-800 text-base font-bold rounded-xl text-center shadow-md transition-all hover:bg-[#D0EE7C] flex items-center justify-center"
        >
          분리배출 하러가기
          <span className="ml-2">↗</span> {/* 외부 링크 아이콘 */}
        </Link>
      </div>
    </div>
  )
}
