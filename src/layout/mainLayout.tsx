import React from "react";
import PrincipalNavbar from "../components/navbar/principalNavbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  ">
      <PrincipalNavbar />
      <main className="flex-grow mt-20 max-w-6xl mx-auto h-full px-4 w-full">{children}</main>
    </div>
  );
};

export default MainLayout;