import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center py-4">{children}</section>
  );
}

export default Layout;
