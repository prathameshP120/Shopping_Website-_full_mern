import React from "react";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import Search from "../layout/Search";
const Header = () => {
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth); //useSelector hook will help us to select our values from state
  const { cartItems } = useSelector((state) => state.cart);
  //for logout the user
  const [logout] = useLazyLogoutQuery();

  //logout handler
  const logoutHandler = () => {
    logout();
    Navigate(0); //0 is passed for refreshing the page
  };

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3 ps-5">
          <div className="navbar-brand">
            <a href="/">
              <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <a href="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ms-3">
              {" "}
              Cart{" "}
            </span>
            <span className="ms-1" id="cart_count">
              {cartItems?.length}
            </span>
          </a>

          {user ? (
            <div className="ms-4 dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt="User Avatar"
                    className="rounded-circle"
                  />
                </figure>
                <span>{user?.name}</span>
              </button>
              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropDownMenuButton"
              >
                {user?.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/dashboard">
                    {" "}
                    Dashboard{" "}
                  </Link>
                )}

                <Link className="dropdown-item" to="/me/orders">
                  {" "}
                  Orders{" "}
                </Link>

                <Link className="dropdown-item" to="/me/profile">
                  {" "}
                  Profile{" "}
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout{" "}
                </Link>
              </div>
            </div>
          ) : (
            !isLoading && (
              <Link to="/login" className="btn ms-4" id="login_btn">
                {" "}
                Login{" "}
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

// import React from "react";
// import Search from "./Search";
// import { useGetMeQuery } from "../../redux/api/userApi";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { useLazyLogoutQuery } from "../../redux/api/authApi";

// const Header = () => {
//   //showing the user in Header
//   const navigate = useNavigate();
//   const { isLoading } = useGetMeQuery();
//   const { user } = useSelector((state) => state.auth); //useSelector hook will help us to select our values from state

//   const [logout] = useLazyLogoutQuery();

//   const { cartItems } = useSelector((state) => state.cart);

//   const logoutHandler = () => {
//     logout();
//     navigate(0);
//   };

//   return (
//     <nav className="navbar row">
//       <div className="col-12 col-md-3 ps-5">
//         <div className="navbar-brand">
//           <a href="/">
//             <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
//           </a>
//         </div>
//       </div>
//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         <Search />
//       </div>
//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//         <a href="/cart" style={{ textDecoration: "none" }}>
//           <span id="cart" className="ms-3">
//             {" "}
//             Cart{" "}
//           </span>
//           <span className="ms-1" id="cart_count">
//             {cartItems?.length}
//           </span>
//         </a>

//         {user ? (
//           <div className="ms-4 dropdown">
//             <button
//               className="btn dropdown-toggle text-white"
//               type="button"
//               id="dropDownMenuButton"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <figure className="avatar avatar-nav">
//                 <img
//                   src={
//                     user?.avatar
//                       ? user?.avatar?.url
//                       : "/images/default_avatar.jpg"
//                   }
//                   alt="User Avatar"
//                   className="rounded-circle"
//                 />
//               </figure>
//               <span>{user?.name}</span>
//             </button>
//             <div
//               className="dropdown-menu w-100"
//               aria-labelledby="dropDownMenuButton"
//             >
//               {user?.role === "admin" && (
//                 <Link className="dropdown-item" to="/admin/dashboard">
//                   {" "}
//                   Dashboard{" "}
//                 </Link>
//               )}

//               <Link className="dropdown-item" to="/me/orders">
//                 {" "}
//                 Orders{" "}
//               </Link>

//               <Link className="dropdown-item" to="/me/profile">
//                 {" "}
//                 Profile{" "}
//               </Link>

//               <Link
//                 className="dropdown-item text-danger"
//                 to="/"
//                 onClick={logoutHandler}
//               >
//                 Logout{" "}
//               </Link>
//             </div>
//           </div>
//         ) : (
//           !isLoading && (
//             <Link to="/login" className="btn ms-4" id="login_btn">
//               {" "}
//               Login{" "}
//             </Link>
//           )
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;

// //we simple check if user exists simply display dropdown menu that contains the user details  and simply check that make sure that it is not laoding simply display the login button
