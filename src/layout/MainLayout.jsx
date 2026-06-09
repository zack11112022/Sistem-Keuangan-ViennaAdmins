import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Gunakan ./ bukan .
import Header from './Header';   // Gunakan ./ bukan .

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> 
      <div className="flex-1 flex flex-col">
        <Header /> 
        <main className="p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
//import { Outlet } from "react-router-dom"//
//import Sidebar from "../layout/Sidebar"//
//import Header from "../layout/Header"//
//export default function MainLayout() {//
 //   return (//
 //       <div className="bg-gray-100 min-h-screen flex">//
 //           <div className="flex flex-row flex-1">//
 //               <Sidebar />//
 //               <div className="flex-1 p-4">//
 //                   <Header />//

   //                 <Outlet />//
  //              </div>//
   //         </div>//
 //       </div>//
 //   )//
//}//