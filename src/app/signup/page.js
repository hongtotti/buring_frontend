"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    phone: "",
    current_location_id: "",
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

    sessionStorage.setItem("userNickname", formData.nickname)
    sessionStorage.setItem("isLoggedIn", "true") // 로그인 상태 저장 (간단한 예시)

    router.push("/main") // /main 페이지로 이동
  }

  return (
    <div className="min-h-screen bg-[#F5FAF8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border-2 border-[#00B493] rounded-2xl shadow-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-[#00B493] mb-1">Buring</h1>
          <h2 className="text-lg font-semibold text-gray-800">회원 가입</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "아이디", name: "userId", type: "text", placeholder: "아이디를 입력해주세요" },
            { label: "이메일", name: "email", type: "email", placeholder: "이메일을 입력해주세요" },
            { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요" },
            { label: "비밀번호 확인", name: "passwordConfirm", type: "password", placeholder: "다시 입력해주세요" },
            { label: "별명(이름)", name: "nickname", type: "text", placeholder: "사용할 별명을 입력해주세요" },
            { label: "휴대전화", name: "phone", type: "tel", placeholder: "전화번호를 입력해주세요" },
            {
              label: "현재 지역 index",
              name: "current_location_id",
              type: "text",
              placeholder: "현재 지역 index를 입력해주세요",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="flex items-center gap-4">
              <label htmlFor={name} className="w-24 text-sm font-medium text-gray-700">
                {label} :
              </label>
              <input
                id={name}
                type={type}
                value={formData[name]}
                onChange={(e) => handleInputChange(name, e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-2 border-2 border-[#00B493] rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B493]"
              />
            </div>
          ))}
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
