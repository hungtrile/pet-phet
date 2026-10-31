import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, HelpCircle, Scissors, Calendar, CreditCard, Award } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const FAQ_SUGGESTIONS = [
  { q: 'Giá dịch vụ Spa tính theo cân nặng thế nào?', a: 'Đối với dịch vụ Spa & Grooming, Pet Phết áp dụng bảng giá theo 4 nấc cân nặng: <5kg, 5-10kg, 10-20kg, và >20kg. Khi đặt lịch, bạn chỉ cần chọn bé và xác nhận cân nặng, hệ thống sẽ tự động tính đúng giá!' },
  { q: 'Quy trình đặt lịch gồm những bước nào?', a: 'Rất nhanh chóng với 5 bước: 1. Chọn dịch vụ ➔ 2. Chọn bé cưng & cân nặng ➔ 3. Chọn ngày & giờ khả dụng ➔ 4. Nhập mã ưu đãi & chọn COD/QR ➔ 5. Xác nhận & nhận mã booking!' },
  { q: 'Làm sao để nhận 1.000 Pet Point?', a: 'Sau khi lịch hẹn hoàn thành, bạn chỉ cần vào mục "Lịch Hẹn Của Tôi", chọn lịch hẹn và bấm "Đánh giá dịch vụ". Hệ thống sẽ lập tức cộng 1.000 Pet Point vào tài khoản của bạn!' },
  { q: 'Hình thức thanh toán QR và COD hoạt động ra sao?', a: 'Với COD: Bạn thanh toán trực tiếp tại cơ sở sau khi phục vụ. Với QR: Quét mã VietQR chuyển khoản với nội dung hiển thị sẵn, hệ thống giữ chỗ trong 15 phút và Admin sẽ đối chiếu kích hoạt lịch ngay.' }
];

export const ChatbotDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Gâu gâu! Cún Phết & Mèo Bông xin chào bạn! 🐾 Tụi mình có thể giúp gì cho bạn và bé cưng hôm nay nè?',
      time: 'Vừa xong'
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Bot response logic
    setTimeout(() => {
      let botReply = 'Cún Phết đã ghi nhận câu hỏi của bạn. Nếu cần tư vấn đặt lịch nhanh hoặc hỗ trợ y tế khẩn cấp, bạn có thể gọi hotline: 0909.123.456 nha!';

      const matchedFaq = FAQ_SUGGESTIONS.find((f) =>
        f.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(f.q.toLowerCase().slice(0, 15))
      );

      if (matchedFaq) {
        botReply = matchedFaq.a;
      } else if (text.toLowerCase().includes('đặt lịch') || text.toLowerCase().includes('book')) {
        botReply = 'Bạn chỉ cần nhấn nút "Đặt lịch ngay" trên thanh menu hoặc chọn dịch vụ bất kỳ rồi bấm "Đặt lịch" là được nhé!';
      } else if (text.toLowerCase().includes('điểm') || text.toLowerCase().includes('point')) {
        botReply = 'Khi viết đánh giá cho lịch hẹn đã hoàn thành, bạn sẽ nhận được 1.000 Pet Point thưởng ngay lập tức!';
      } else if (text.toLowerCase().includes('mèo') || text.toLowerCase().includes('chó')) {
        botReply = 'Pet Phết tiếp nhận chăm sóc cả chó và mèo với không gian spa riêng biệt và chuyên viên được đào tạo bài bản!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Mascot Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:block bg-white text-[#81451F] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-[#EDC55B] animate-bounce">
            Hỗ trợ? Cún & Mèo ở đây nè! 🐾
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mở khung trò chuyện hỗ trợ"
          className="pet-chatbot-launcher relative shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <img src={ASSETS.chatbotIcon} alt="Chatbot / Hỗ trợ Pet Phết" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66BCB4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#66BCB4] border border-white"></span>
          </span>
        </button>
      </div>

      {/* Chatbox Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[92vw] max-w-md h-[540px] bg-white rounded-3xl shadow-2xl border-2 border-[#E8CCAD] z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#EC802B] to-[#EDC55B] px-5 py-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-[#FAF6F0] border border-white/50 shrink-0">
                <img
                  src={ASSETS.heroPair}
                  alt="Cún Phết và Mèo Bông"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5 font-heading">
                  Cún Phết & Mèo Bông <Sparkles className="w-4 h-4 text-yellow-200" />
                </h3>
                <p className="text-xs text-orange-100 font-medium">Trợ lý chăm sóc thú cưng 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Đóng khung chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Tags */}
          <div className="bg-[#FAF6F0] px-4 py-2 border-b border-[#E8CCAD] flex gap-2 overflow-x-auto no-scrollbar text-xs">
            {FAQ_SUGGESTIONS.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(faq.q)}
                className="whitespace-nowrap bg-white border border-[#E8CCAD] text-[#81451F] hover:bg-[#FDE8D7] px-3 py-1.5 rounded-full font-medium transition-colors shadow-2xs cursor-pointer"
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF6F0]/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-white border border-[#E8CCAD] shrink-0 mt-0.5">
                    <img
                      src={ASSETS.heroPair}
                      alt="Cún Phết và Mèo Bông"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-[#EC802B] text-white rounded-br-xs'
                      : 'bg-white text-[#81451F] border border-[#E8CCAD] rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-orange-200' : 'text-neutral-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E8CCAD] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi Cún Phết & Mèo Bông điều gì đó..."
              className="flex-1 bg-[#FAF6F0] border border-[#E8CCAD] rounded-full px-4 py-2 text-sm text-[#81451F] focus:outline-none focus:ring-2 focus:ring-[#EC802B]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-[#EC802B] hover:bg-[#D46917] disabled:opacity-50 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
