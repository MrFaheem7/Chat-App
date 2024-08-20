import React from "react";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <header>
        <nav>Navbar</nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
};

export default PrivateLayout;
