"use client"
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function GeminiChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! 소나기소설에 대해 무엇이든 물어보세요.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // 채팅 컨테이너 스크롤을 맨 아래로
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // 메시지가 추가될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI 응답 시뮬레이션
  const getAIResponse = async (msg) => {
    let responses = ""

    const data = {
      "msg" : msg
    }

    // 서버통신
    try {
      const res = await axios.post(
        '/v1/chat',
        data
      )

      if(res.status != 200) {
        console.log('서버에 접속할 수 없습니다.')
      } else {
        responses = res.data.aimsg
      }
    } catch (e) {
      console.log(e);
    }
  
    // 서버통신 처리하는 루틴
    // responses = "AI메시지 : " + msg;

    return responses
    // const responses = [
    //   "흥미로운 질문이네요. 더 자세히 설명해드릴까요?",
    //   "소나기 소설에 대해 더 알고 싶은 부분이 있나요?",
    //   "좋은 지적입니다. 관련해서 추가로 설명드릴게요.",
    //   "네, 맞습니다. 이 부분에 대해 좀 더 자세히 알아보겠습니다.",
    //   "황순원의 '소나기'는 1953년에 발표된 단편소설로, 순수한 사랑을 그린 대표작입니다.",
    //   "소년과 소녀의 첫사랑을 서정적으로 묘사한 작품으로 많은 사랑을 받고 있습니다."
    // ];
    // return responses[Math.floor(Math.random() * responses.length)];
  };

  // 메시지 전송 함수
  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isLoading) return;

    // 사용자 메시지 추가
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    console.log("message = " + message);

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // 텍스트 영역 높이 초기화
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // AI 응답 시뮬레이션 (1-2초 후)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: getAIResponse(message),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  // 채팅 초기화
  const clearChat = () => {
    setMessages([]);
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 텍스트 영역 자동 리사이즈
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    
    // 자동 높이 조절
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  // 시간 포맷팅
  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            GEMINI 소나기소설 챗봇
          </h1>
        </div>
        
        {/* 채팅 컨테이너 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          {/* 채팅 헤더 */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Chatbot</span>
            </div>
          </div>
          
          {/* 채팅 내용 영역 */}
          <div 
            ref={chatContainerRef}
            className="overflow-y-auto p-4 space-y-4"
            style={{ 
              height: 'calc(100vh - 400px)', 
              minHeight: '400px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {messages.length === 0 ? (
              <div className="flex justify-center">
                <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                  대화를 시작해보세요
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="animate-fade-in">
                  {message.sender === 'user' ? (
                    // 사용자 메시지
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="flex-1 flex justify-end">
                        <div className="max-w-xs lg:max-w-md">
                          <div className="bg-gray-800 text-white rounded-lg px-4 py-3">
                            <p className="whitespace-pre-wrap">{message.text}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block text-right">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">U</span>
                      </div>
                    </div>
                  ) : (
                    // AI 메시지
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">AI</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-blue-50 rounded-lg px-4 py-3">
                          <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            
            {/* 로딩 인디케이터 */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AI</span>
                </div>
                <div className="flex-1">
                  <div className="bg-blue-50 rounded-lg px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 입력 영역 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI와 대화할 내용을 입력하세요.
            </label>
            <div className="flex space-x-2">
              <textarea 
                ref={textareaRef}
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                rows={3}
                disabled={isLoading}
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="메시지를 입력하세요..."
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              />
              <button 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 self-end disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? '전송 중...' : '전송'}
              </button>
            </div>
          </div>
          
          {/* Clear 버튼 */}
          <div className="px-4 pb-4">
            <button 
              onClick={clearChat}
              disabled={isLoading}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              채팅내용 지우기
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}