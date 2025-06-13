"use client"

import { useState } from "react"

export default function AreaSelector() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAreas, setSelectedAreas] = useState([])

  const allAreas = [
    "강남구", "강동구", "강북구", "강서구", "관악구",
    "광진구", "구로구", "금천구", "노원구", "도봉구",
    "동대문구", "동작구", "마포구", "서대문구", "서초구",
    "성동구", "성북구", "송파구", "양천구", "영등포구",
    "용산구", "은평구", "종로구", "중구", "중랑구"
  ]

  const filteredAreas = allAreas.filter((area) =>
    area.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectArea = (area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    } else if (selectedAreas.length < 1) {
      setSelectedAreas([area])
    }
  }

  const handleRemoveArea = (area) => {
    setSelectedAreas(selectedAreas.filter((a) => a !== area))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-[420px] h-[700px] bg-white border border-black rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* 헤더 */}
        <div className="p-6 text-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-black">지역 선택</h1>
        </div>

        {/* 선택된 지역 박스 */}
        <div className="p-4 flex justify-center">
          {selectedAreas.length > 0 ? (
            <div
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium w-full"
              style={{ backgroundColor: "#00B493" }}
            >
              <span className="text-lg">{selectedAreas[0]}</span>
              <button
                onClick={() => handleRemoveArea(selectedAreas[0])}
                className="text-white text-sm px-2 rounded-full hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-full px-6 py-3 rounded-xl bg-gray-200 text-gray-600 text-center">
              선택된 지역이 없습니다
            </div>
          )}
        </div>

        {/* 검색 입력 */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="지역을 검색하세요..."
              className="w-full pl-12 pr-4 py-3 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-[#00B493] focus:ring-opacity-50 text-black placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        {/* 지역 리스트 */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {filteredAreas.length > 0 ? (
            <div className="space-y-3">
              {filteredAreas.map((area) => {
                const isSelected = selectedAreas.includes(area)
                const isDisabled = selectedAreas.length >= 1 && !isSelected

                return (
                  <button
                    key={area}
                    onClick={() => !isDisabled && handleSelectArea(area)}
                    disabled={isDisabled}
                    className={`w-full px-4 py-4 rounded-xl flex items-center justify-between text-left font-medium transition-all duration-200 ${
                      isSelected
                        ? "bg-[#00B493] text-white shadow"
                        : "bg-white text-black border border-black hover:bg-gray-50"
                    } ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span className="text-lg">{area}</span>
                    {isSelected && <span className="text-xl">✔️</span>}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-lg">"{searchQuery}"에 대한 결과가 없습니다</p>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-sm text-gray-600 mb-1">
            선택된 지역: <span className="font-bold text-black">{selectedAreas.length}/1</span>
          </p>
          {selectedAreas.length === 1 && (
            <p className="text-xs text-[#00B493]">최대 선택 개수에 도달했습니다</p>
          )}
        </div>
      </div>
    </div>
  )
}
