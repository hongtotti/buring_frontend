"use client"

import { useState } from "react"

export default function Home() {
  const [interactions, setInteractions] = useState(17)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="flex justify-end p-4">
        <button className="text-gray-400 hover:text-gray-600">
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
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4">
        {/* CSS Cloud Character */}
        <div className="relative mb-8">
          {/* Main cloud body */}
          <div className="relative w-40 h-24 bg-gradient-to-b from-teal-200 to-teal-300 rounded-full shadow-lg">
            {/* Cloud bumps */}
            <div className="absolute -top-3 left-6 w-10 h-10 bg-gradient-to-b from-teal-200 to-teal-300 rounded-full"></div>
            <div className="absolute -top-4 left-12 w-12 h-12 bg-gradient-to-b from-teal-200 to-teal-300 rounded-full"></div>
            <div className="absolute -top-3 right-6 w-10 h-10 bg-gradient-to-b from-teal-200 to-teal-300 rounded-full"></div>

            {/* Eyes */}
            <div className="absolute top-6 left-8 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-200">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-6 right-8 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-200">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>

            {/* Smile */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-gray-600 rounded-b-full"></div>
          </div>

          {/* Arms and legs */}
          {/* Left arm */}
          <div className="absolute top-16 -left-2">
            <div className="w-1 h-8 bg-teal-300 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-300 rounded-full mt-1"></div>
          </div>

          {/* Left leg */}
          <div className="absolute top-20 left-8">
            <div className="w-1 h-12 bg-teal-300 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-300 rounded-full mt-1"></div>
          </div>

          {/* Right leg */}
          <div className="absolute top-20 right-8">
            <div className="w-1 h-12 bg-teal-300 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-300 rounded-full mt-1"></div>
          </div>

          {/* Right arm */}
          <div className="absolute top-16 -right-2">
            <div className="w-1 h-8 bg-teal-300 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-300 rounded-full mt-1"></div>
          </div>
        </div>

        {/* Level and Title */}
        <div className="text-center mb-6 mt-8">
          <div className="text-green-500 text-sm font-medium mb-1">Lv. 02</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">분리왕</h1>
          <p className="text-gray-500 text-sm">지구에 작은 변화가 지켜보이고!</p>
        </div>

        {/* Achievement Box */}
        <div className="bg-white rounded-2xl p-6 w-full shadow-sm mb-8">
          <div className="space-y-3">
            <p className="text-gray-700 text-sm leading-relaxed">
              이 정도면 분리 마스터!
              <br />
              지금까지 이렇게 실천하셨어요.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>📦</span>
                <span className="text-gray-700">사진으로 3번 확인하고,</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💬</span>
                <span className="text-gray-700">챗봇에게 2번 물어보셨군요.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌱</span>
                <span className="text-gray-700">함께한 횟수는 무려 {interactions}번!</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm pt-2">앞으로도 버림이와 함께 지구를 지켜요!</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-center space-x-12">
          <button className="text-gray-400 hover:text-gray-600 p-2">
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
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </button>
          <button className="text-green-500 bg-green-50 rounded-full p-3 hover:bg-green-100">
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-2">
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
