import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { image } = await request.json()

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const dummyLabels = ["플라스틱", "종이", "유리", "음식물 쓰레기", "일반 쓰레기"]
    const randomLabel = dummyLabels[Math.floor(Math.random() * dummyLabels.length)]

    return NextResponse.json({ label: randomLabel })
  } catch (error) {
    console.error("API 분류 라우트 오류:", error)
    return new NextResponse(JSON.stringify({ error: "분류 서버 오류 발생" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
