Dự án sử dụng api của spotify và gg để lấy playlist của spotify. Truy xuất ra lấy tên nhạc trong playlist người dùng chọn 
Dùng Api của gg để tìm kiếm, tạo playlist và thêm kết quả tìm kiếm vào playlist YT 
Lưu trữ dùng session, kho lưu trữ của session là redis. Chọn redis vì thông tin lưu trữ cũng ít mà truy xuất lại nhanh.
Viết client bằng nextjs để dùng các UI có sẵn. 

- Sẽ cải thiện: deloy backend không dùng server less 
- cấu trúc file thành monorepo. 
- xin cấp phép sản phẩm với spotify và gg vì hiện tại chỉ những tài khoản nào được add và thì mới dùng được. Dự án đang là develop nên chưa thể dùng đưọc tài khoản bất kỳ 