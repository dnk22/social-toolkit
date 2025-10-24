# 🚀 Social Toolkit - Hướng dẫn sử dụng

## ✨ Tính năng mới

Extension đã được cập nhật với giao diện toggle switch cho **Facebook** và **Instagram**!

### 🎯 Các tính năng chính:

1. **Toggle Switch cho Facebook**
   - Bật/tắt tính năng cho Facebook
   - Icon màu xanh Facebook
   - Lưu cài đặt tự động

2. **Toggle Switch cho Instagram**
   - Bật/tắt tính năng cho Instagram
   - Icon gradient Instagram đẹp mắt
   - Lưu cài đặt tự động

3. **Giao diện đẹp mắt**
   - Gradient tím đậm
   - Toggle switch hiện đại
   - Hiệu ứng hover mượt mà
   - Hiển thị trạng thái real-time

## 📦 Cách tải extension vào Chrome

1. **Mở Chrome Extensions**
   ```
   chrome://extensions/
   ```

2. **Bật Developer Mode** (góc trên bên phải)

3. **Click "Load unpacked"**

4. **Chọn thư mục `dist`**:
   ```
   /Users/duynk/Documents/project/Social/dist
   ```

5. **Hoàn tất!** 🎉

## 🎮 Cách sử dụng

### Bước 1: Mở Extension
Click vào icon Social Toolkit trên thanh công cụ Chrome

### Bước 2: Bật/Tắt tính năng
- Bật toggle cho **Facebook** nếu muốn sử dụng trên Facebook
- Bật toggle cho **Instagram** nếu muốn sử dụng trên Instagram

### Bước 3: Truy cập website
- Vào **facebook.com** - Bạn sẽ thấy thông báo "🚀 Facebook Toolkit Active" ở góc dưới bên phải
- Vào **instagram.com** - Bạn sẽ thấy thông báo "🚀 Instagram Toolkit Active"

### Bước 4: Tận hưởng!
- Tất cả cài đặt được lưu tự động
- Tính năng tự động kích hoạt khi bạn reload trang

## 🎨 Giao diện

### Toggle Switch
- **Màu xám**: Tính năng TẮT
- **Màu xanh lá**: Tính năng BẬT
- Click để bật/tắt

### Trạng thái
- **Ready** (xanh lá): Sẵn sàng
- **Facebook enabled/disabled**: Đang thay đổi cài đặt Facebook
- **Instagram enabled/disabled**: Đang thay đổi cài đặt Instagram

### Danh sách tính năng
Hiển thị các tính năng đang hoạt động:
- ✓ Facebook - Auto scroll, Download posts
- ✓ Instagram - Story viewer, Download media

## 🛠️ Development

### Build lại extension sau khi sửa code:
```bash
npm run build
```

### Development mode (tự động build):
```bash
npm run dev
```

### Reload extension trong Chrome:
1. Vào `chrome://extensions/`
2. Click icon reload ở extension Social Toolkit
3. Test lại tính năng

## 📝 Thêm tính năng mới

### Thêm tính năng cho Facebook:
Sửa file `src/content/content.js`, tìm hàm `activateFacebookFeatures()`:

```javascript
function activateFacebookFeatures() {
  console.log('Facebook features activated');
  
  // Thêm code của bạn ở đây
  // Ví dụ: Auto scroll, download post, etc.
  
  addPlatformIndicator('Facebook', '#1877f2');
}
```

### Thêm tính năng cho Instagram:
Sửa file `src/content/content.js`, tìm hàm `activateInstagramFeatures()`:

```javascript
function activateInstagramFeatures() {
  console.log('Instagram features activated');
  
  // Thêm code của bạn ở đây
  // Ví dụ: Story viewer, download media, etc.
  
  addPlatformIndicator('Instagram', '#e1306c');
}
```

## 🎯 Các tính năng có thể thêm

### Cho Facebook:
- ✅ Auto scroll feed
- ✅ Download ảnh/video
- ✅ Xem ai đã unfriend
- ✅ Tự động like/comment
- ✅ Export friends list
- ✅ Bulk delete posts

### Cho Instagram:
- ✅ Download stories
- ✅ Download posts/reels
- ✅ View stories ẩn danh
- ✅ Xem ai unfollow
- ✅ Auto like/follow
- ✅ Export followers/following

## 🐛 Troubleshooting

**Extension không load?**
- Kiểm tra đã chọn đúng thư mục `dist` chưa
- Xem console errors tại `chrome://extensions/`

**Toggle không hoạt động?**
- Reload extension
- Mở developer console (F12) xem lỗi

**Tính năng không chạy trên website?**
- Kiểm tra đã bật toggle cho nền tảng đó chưa
- Reload trang web
- Xem console log (F12)

## 📊 Cấu trúc dữ liệu

Extension lưu cài đặt trong Chrome Storage:
```javascript
{
  facebookEnabled: true/false,
  instagramEnabled: true/false
}
```

## 🚀 Tiếp theo

1. Thêm nhiều tính năng cho Facebook và Instagram
2. Thêm hỗ trợ cho Twitter, TikTok, LinkedIn
3. Thêm trang settings chi tiết hơn
4. Export/import cài đặt

---

**Chúc bạn code vui vẻ!** ❤️
