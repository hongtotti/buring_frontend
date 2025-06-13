"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import MainPage from "./main/page" // app/main/page.js에서 MainPage 컴포넌트 임포트

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // sessionStorage에서 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      // 로그인되어 있지 않으면 /login 페이지로 리다이렉트
      router.replace("/login")
    }
  }, [router])

  // 로그인되어 있다면 MainPage를 렌더링
  // useEffect에서 리다이렉트가 발생하므로, 이 부분은 로그인된 사용자에게만 보입니다.
  return <MainPage />
}
