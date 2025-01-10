// pages/index.js (Hoặc bạn có thể tạo file mới, ví dụ HomePage.js nếu bạn dùng custom route)
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Link của Next.js thay vì từ 'lucide-react'

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center" >
        <h1 className="text-3xl font-bold  flex justify-center  mb-6 ">
          Transfer Playlists Between Music Services
        </h1>
        
        {/* Link chuyển đến trang loginSpotify */}
        <Link href="/api/loginSpotify">
        <Button className=" p-12 bg-transparent hover:scale-110 transition-all rounded-full">
            <img
              src="https://cdn.tgdd.vn/GameApp/3/220135/Screentshots/spotify-ung-dung-nghe-nhac-am-thanh-chat-luong-cao-logo-19-05-2020.png"
              alt="Spotify"
              className="w-14 h-13  object-contain rounded-md"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}
