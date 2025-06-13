"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (email === "test@example.com" && password === "password") {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      sessionStorage.setItem("isLoggedIn", "true") // 로그인 상태 저장 (간단한 예시)
      sessionStorage.setItem("userNickname", "테스트유저") // 테스트용 닉네임 저장
      router.push("/main") // /main 페이지로 이동
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src="/placeholder.svg?height=80&width=80" alt="앱 로고" width={80} height={80} />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <a href="/signup" className="text-green-600 hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
