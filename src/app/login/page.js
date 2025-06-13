"use client"

import { useState } from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [autoLogin, setAutoLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error("로그인 실패")
      const data = await res.json()
      console.log("로그인 성공:", data)
    } catch (err) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[90vw] max-w-[375px] min-w-[280px] aspect-[3/5] bg-white border-4 border-black rounded-2xl shadow-lg flex flex-col justify-between overflow-hidden transition-all">
        <div className="flex flex-col flex-1 justify-center px-7">
          <h1 className="text-5xl font-bold text-black text-center mb-8">Buring</h1>
          <div className="flex flex-col space-y-6">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#00B493] rounded-lg text-base placeholder-gray-400"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#00B493] rounded-lg text-base placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute top-2 right-3 text-sm text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "숨기기" : "보기"}
              </button>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={autoLogin} onChange={() => setAutoLogin(!autoLogin)} />
              <span>자동 로그인</span>
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#00B493] text-white rounded-lg font-semibold"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
