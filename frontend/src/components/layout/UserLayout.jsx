import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: "fas fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];

  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">User Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
/*"padding-y: 4". This means there is padding applied to both the top and bottom of the div element.
 The value 4 corresponds to the spacing scale defined in the CSS framework.

 This class indicates that the div should span all 12 columns of the grid on extra small to medium screens (usually defined as screens with a width less than 992px in Bootstrap).
In a 12-column grid system, col-12 means the element takes up the entire row width.

This class indicates that the div should span 3 out of 12 columns of the grid on large screens (usually defined as screens with a width of 992px and above in Bootstrap).
In a 12-column grid system, col-lg-3 means the element takes up one-quarter of the row width on large screens.

 */
