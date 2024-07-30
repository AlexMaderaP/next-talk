import React from "react";

async function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>Here I will load conversations that belongs to the user</div>
      {children}
    </>
  );
}

export default ServerLayout;
