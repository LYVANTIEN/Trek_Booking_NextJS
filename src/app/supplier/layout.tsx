import React from 'react'


import "../../../public/css/supplier.css";
import HeaderSupplier from '../components/HeaderSupplier';
import NavSupplier from '../components/NavSupplier';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
   
          <NavSupplier />
          <ToastContainer/>
          {children}
          <HeaderSupplier title="Pages"/>
      
    </div>
  )
}

