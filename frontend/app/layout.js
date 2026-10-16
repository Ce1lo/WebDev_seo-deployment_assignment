import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif/400-italic.css";
import "./globals.css";

const siteUrl = process.env.SITE_URL || "http://localhost:3000";
const title = "Nest — Nội thất tối giản cho tổ ấm Việt";
const description =
  "Nest là cửa hàng nội thất tối giản: đèn bàn, ghế gỗ, bình gốm với sắc màu dịu nhẹ cho góc nhà an yên.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Nest",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nest — Nội thất tối giản" }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
