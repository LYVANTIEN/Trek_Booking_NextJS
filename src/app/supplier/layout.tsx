import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "../../../public/css/supplier.css";
import HeaderSupplier from '../components/HeaderSupplier';
import NavSupplier from '../components/NavSupplier';

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
          <NavSupplier />
          {children}
          <HeaderSupplier title="Pages"/>
          <ToastContainer/>
    </div>
  )
}

