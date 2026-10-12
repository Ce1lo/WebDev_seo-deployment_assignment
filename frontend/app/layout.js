import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif/400-italic.css";
import "./globals.css";

// TODO SEO: thay metadata mẫu bằng metadata phù hợp với đề bài trong README.
export const metadata = { title: "E-commerce Starter" };

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
