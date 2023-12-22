"use client";
import "./globals.css";
import PageSelection from "@/components/PageSelect";
import options from "@/helpers/options";

// import dynamic from "next/dynamic";

// const PageSelection = dynamic(() => import("@/components/PageSelect"), {
//   ssr: false, // Isso desativará a SSR para MyComponent
// });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head></head>
      <body className="body">
        <header>
          <title>Timetabling</title>
          <PageSelection
            defaultValue={options.constantValues.pageSelection.main}
          />
        </header>
        {children}
      </body>
    </html>
  );
}
