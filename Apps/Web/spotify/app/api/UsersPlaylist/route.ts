import { createClient } from 'redis';
import { NextResponse } from 'next/server'; // Import NextResponse

// Khởi tạo Redis client
const redisClient = createClient();

// Kết nối Redis
redisClient.connect().catch(console.error);

export async function GET(req: Request) { // Sử dụng Request thay vì req như trong express
  // Lấy cookies từ header request
  const cookies = req.headers.get('cookie') || '';
  console.log("Đây là cookie ", cookies);
  // Lấy sessionID từ cookie `connect.sid`
  const rawSessionID = cookies.split('connect.sid=')[1]?.split(';')[0]; // Lấy session ID từ cookie
  const sessionID = rawSessionID?.split('.')[0].replace(/^s%3A/, '');  ; // Lấy phần trước dấu '.'
  
    console.log("Đây là session",sessionID)
  // Kiểm tra nếu không có session ID
  if (!sessionID) {
    return NextResponse.json({ error: 'No session ID found' }, { status: 401 });
  }

  try {
    // Truy xuất session từ Redis với key `sess:{sessionID}`
    const sessionKey = `myapp:${sessionID}`; // Cấu trúc key trong connect-redis mặc định
    const sessionData = await redisClient.get(sessionKey); // Lấy dữ liệu session từ Redis
    console.log("seData",sessionData)
    // Kiểm tra nếu có dữ liệu session
    if (sessionData) {
      const session = JSON.parse(sessionData); // Giải mã dữ liệu JSON
      console.log("Đây là ketqua", session);
      return NextResponse.json({ playlists: session.playlists }); // Trả lại playlists và access_token
    }

    // Nếu không tìm thấy session, trả về lỗi 404
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  } catch (err:unknown) {
    // Nếu gặp lỗi, log và trả về lỗi 500
    console.error("Error message:", err);
    return NextResponse.json({ error: 'Error retrieving session' }, { status: 500 });
  }
}
