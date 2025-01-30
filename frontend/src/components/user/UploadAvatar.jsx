import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
  );
  const navigate = useNavigate();
  const [upload_avatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Avatar Uploaded");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };
    upload_avatar(userData); //this will upload the file to the cloudinary
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        //this means that file reading is successuful
        setAvatarPreview(reader.result); //this reader will give us the result and we will set that in the Avatar preview
        setAvatar(reader.result); //this reader will give us the result and we will set that in the Avatar
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <div class="row wrapper">
        <div class="col-10 col-lg-8">
          <form class="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 class="mb-4">Upload Avatar</h2>

            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <figure class="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      class="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div class="input-foam">
                  <label class="form-label" for="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    class="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              class="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Uploading" : "Upload"} Upload
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
