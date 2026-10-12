# SEO & Deployment - Website E-commerce

Đây là bài tập kiểm tra kỹ năng **deploy website** và **cấu hình Metadata chuẩn SEO**, sử dụng **Next.js** cho frontend và **Node.js + Express** cho backend.

## Ngữ cảnh & Nghiệp vụ (Business Specs)

Bạn đang triển khai website cho cửa hàng nội thất **Nest**. Dự án đã có sẵn giao diện e-commerce và **6 sản phẩm mock**, không cần database.

**Yêu cầu cốt lõi:**

1. Frontend deploy trên **Vercel**, backend deploy trên **Render hoặc Railway**.
2. Website truy cập công khai qua HTTPS và hiển thị đủ sản phẩm lấy từ API backend.
3. Metadata mô tả đúng cửa hàng, sử dụng URL production và có thông tin xem trước khi chia sẻ liên kết.

---

## Cài đặt và Khởi chạy

Yêu cầu **Node.js 22+**, Git và tài khoản GitHub.

1. Fork repo về tài khoản của bạn, clone và tạo nhánh làm bài:

   ```bash
   git clone <URL-fork-cua-ban>
   cd seo-deployment_assignment
   git checkout -b lam-bai
   ```

2. Chạy backend trong terminal thứ nhất:

   ```bash
   cd backend
   npm ci
   npm run dev
   ```

   API chạy tại `http://localhost:5000`. Mock data có sẵn trong `backend/data/products.js`, không cần seed.

3. Mở terminal thứ hai từ thư mục gốc và chạy frontend:

   ```bash
   cd frontend
   npm ci
   cp .env.local.example .env.local
   npm run dev
   ```

   Trên Windows PowerShell, dùng `Copy-Item .env.local.example .env.local` thay cho `cp`. Nếu bị chặn `npm.ps1`, dùng `npm.cmd` thay cho `npm`.

   File `frontend/.env.local`:

   ```dotenv
   API_BASE_URL=http://localhost:5000
   SITE_URL=http://localhost:3000
   ```

   Mở `http://localhost:3000`. Không commit file `.env.local`.

---

## Nhiệm Vụ Của Bạn

Bạn được tự do sáng tạo giao diện, màu sắc, nội dung hoặc bổ sung tính năng, nhưng phải giữ cấu trúc thư mục bên dưới và đảm bảo frontend lấy sản phẩm từ backend. Có thể thêm file/thư mục con khi cần. Không bắt buộc xây dựng giỏ hàng, thanh toán hay đăng nhập.

```text
seo-deployment_assignment/
├── frontend/
│   ├── app/                 # Giao diện và cấu hình SEO
│   ├── public/              # Ảnh và tài nguyên tĩnh
│   └── package.json
├── backend/
│   ├── data/products.js     # Mock data sản phẩm
│   ├── index.js             # Express app và API
│   ├── server.js            # Khởi động backend
│   └── package.json
└── README.md
```

### 1. Deploy backend lên Render hoặc Railway

- Tạo tài khoản **Render hoặc Railway**, kết nối GitHub và chọn repository đã fork, nhánh `lam-bai`.
- **Render:** tạo Web Service, Root Directory là `backend`, Build Command là `npm ci`, Start Command là `npm start`.
- **Railway:** tạo service từ GitHub repo, Root Directory là `/backend`, Start Command là `npm start`; sau khi deploy, chọn **Generate Domain** để có URL công khai.
- Backend đã sử dụng `process.env.PORT` do nền tảng cung cấp. Kiểm tra `/api/health` và `/api/products` trên URL vừa deploy trả về `200`.

Tham khảo: [Express trên Render](https://render.com/docs/deploy-node-express-app), [Express trên Railway](https://docs.railway.com/guides/express).

### 2. Deploy frontend lên Vercel

- Tạo tài khoản **Vercel**, kết nối GitHub và import repository đã fork.
- Chọn Root Directory là `frontend`, Framework Preset là **Next.js**, Production Branch là `lam-bai`.
- Thêm `API_BASE_URL` bằng URL HTTPS của backend, không kèm `/api/products`.
- Deploy để lấy URL frontend, sau đó đặt `SITE_URL` bằng URL production này và redeploy. Cấu hình các biến cho môi trường **Production**.
- Website phải hiển thị đủ 6 sản phẩm từ backend. Push thay đổi lên nhánh làm bài và kiểm tra Vercel tự deploy lại.

### 3. Cấu hình Metadata chuẩn SEO

Hoàn thiện `frontend/app/layout.js` bằng **Next.js Metadata API**:

- **Title và description:** thay nội dung mẫu bằng tiêu đề, mô tả phù hợp với cửa hàng Nest.
- **Metadata base và canonical:** dùng `SITE_URL`, trỏ về URL production của frontend.
- **Open Graph và Twitter Card:** có tiêu đề, mô tả và ảnh chia sẻ PNG/JPG truy cập công khai; Open Graph có URL trang, Twitter dùng `summary_large_image`.
- Tạo `frontend/app/robots.js` và `frontend/app/sitemap.js`, cho phép thu thập trang production và khai báo đúng URL trang chủ.

Giữ ngôn ngữ trang là tiếng Việt, một H1 chính và alt cho ảnh. `SITE_URL` chỉ là biến có sẵn; bạn phải tự dùng nó để cấu hình SEO. Tham khảo [Next.js Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

---

## Kiểm tra Website sau khi Deploy

1. Chạy `npm run build` trong `frontend` để kiểm tra lỗi build.
2. Mở URL frontend bằng cửa sổ ẩn danh: truy cập được, hiển thị đủ sản phẩm và ảnh trên desktop/mobile.
3. Dùng Postman hoặc trình duyệt kiểm tra backend: `GET /api/health` trả trạng thái `ok`, `GET /api/products` trả 6 sản phẩm.
4. Dùng **View Page Source** kiểm tra metadata và nội dung sản phẩm. Mở ảnh chia sẻ, `/robots.txt`, `/sitemap.xml`; không được còn URL `localhost`.
5. Chạy **Chrome DevTools → Lighthouse → SEO** để tự kiểm tra. Không yêu cầu nộp ảnh báo cáo hoặc website xuất hiện ngay trên Google.

Nếu backend Render đang khởi động lại sau thời gian không hoạt động, truy cập `/api/health`, đợi API sẵn sàng rồi tải lại frontend.

## Nộp bài qua Fork và Pull Request

1. Sau khi code và test xong, commit và push nhánh làm bài lên fork:

   ```bash
   git add frontend
   git commit -m "Hoan thanh bai tap SEO va Deployment"
   git push -u origin lam-bai
   ```

2. Trên GitHub, bấm **Compare & pull request**:
   - Base repository: `LuckSnow/seo-deployment_assignment`, base branch: `main`.
   - Head repository: fork của bạn, compare branch: `lam-bai`.
3. Trong mô tả PR, chỉ cung cấp **mã số sinh viên và họ tên**.
4. Trong mục **About của repository GitHub đã fork** (bấm biểu tượng bánh răng), đặt **URL frontend** ở trường **Website**, đặt **URL backend** ở **Description** với nhãn `Backend:`. Dùng URL HTTPS công khai để nhóm mở website và gọi `/api/health`, `/api/products` kiểm tra API.
5. Dán link PR để nộp bài. **Giữ PR mở và website hoạt động tới khi có điểm; không đóng và không tự bấm Merge PR.**
