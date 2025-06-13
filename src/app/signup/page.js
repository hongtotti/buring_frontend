"use client"

import { useState } from "react"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    phone: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("회원가입 데이터:", formData)
  }

  return (
    <div className="min-h-screen bg-[#F5FAF8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border-2 border-[#00B493] rounded-2xl shadow-md p-6 space-y-6">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-[#00B493] mb-1">Buring</h1>
          <h2 className="text-lg font-semibold text-gray-800">회원 가입</h2>
        </div>

        {/* 폼 시작 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 공통 필드 레이아웃 */}
          {[
            { label: "아이디", name: "userId", type: "text", placeholder: "아이디를 입력해주세요" },
            { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요" },
            { label: "비밀번호 확인", name: "passwordConfirm", type: "password", placeholder: "다시 입력해주세요" },
            { label: "별명", name: "nickname", type: "text", placeholder: "사용할 별명을 입력해주세요" },
            { label: "휴대전화", name: "phone", type: "tel", placeholder: "전화번호를 입력해주세요" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="flex items-center gap-4">
              <label className="w-24 text-sm font-medium text-gray-700">{label} :</label>
              <input
                type={type}
                value={formData[name]}
                onChange={(e) => handleInputChange(name, e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-2 border-2 border-[#00B493] rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B493]"
              />
            </div>
          ))}

          {/* 생년월일 */}
          <div className="flex items-center gap-4">
            <label className="w-24 text-sm font-medium text-gray-700">생년월일 :</label>
            <div className="flex gap-2 flex-1">
              <input
                type="text"
                placeholder="년"
                value={formData.birthYear}
                onChange={(e) => handleInputChange("birthYear", e.target.value)}
                maxLength={4}
                className="w-1/3 px-2 py-2 border-2 border-[#00B493] rounded-md text-center placeholder-gray-400 text-sm"
              />
              <input
                type="text"
                placeholder="월"
                value={formData.birthMonth}
                onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                maxLength={2}
                className="w-1/3 px-2 py-2 border-2 border-[#00B493] rounded-md text-center placeholder-gray-400 text-sm"
              />
              <input
                type="text"
                placeholder="일"
                value={formData.birthDay}
                onChange={(e) => handleInputChange("birthDay", e.target.value)}
                maxLength={2}
                className="w-1/3 px-2 py-2 border-2 border-[#00B493] rounded-md text-center placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-[#00B493] hover:bg-[#009b7e] text-white font-bold rounded-lg shadow-md transition"
          >
            완료
          </button>
        </form>
      </div>
    </div>
  )
}
