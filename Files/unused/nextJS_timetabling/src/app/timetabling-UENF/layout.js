export const metadata = {
  title: "Timetabling UENF",
  description: "A timetabling system for UENF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="body">{children}</body>
    </html>
  );
}
