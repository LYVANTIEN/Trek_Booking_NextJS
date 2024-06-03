'use client'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import NavbarRegisterSupplier from '../components/NavbarRegisterSupplier';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarRegisterSupplier />
                {children}
        </body>
    </html>
  );
}
