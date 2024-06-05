'use client'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer/>
        </body>
    </html>
  );
}
