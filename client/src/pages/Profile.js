import React, { createRef, useState } from "react";
import UploadService from "../api/uploadService";

export default function Profile({ user, setUserState }) {
  const uploadService = new UploadService();
  const form = createRef();

  const [err, setError] = useState(null);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const data = new FormData(form.current);
      const user = await uploadService.uploadProfile(data);
      setUserState(user);
      setError(null);
    } catch (err) {
      debugger;
      const { message } = err.response.data;
      setError(message);
    }
  };

  return (
    <div>
      <h1>Hi, {user.username}</h1>

      <form onSubmit={submitHandler} ref={form} encType="multipart/form-data">
        <input
          type="file"
          name="profile-photo"
          placeholder="upload your profile"
        />
        <input type="text" placeholder="Add a caption!" name="caption" />
        <button type="submit">Upload photo</button>
        {err && <p>{err}</p>}
      </form>
      {user.profilePhoto && (
        <div>
          <h1>{user.profilePhoto.caption}</h1>
          <img src={user.profilePhoto.imageUrl} alt="" />
        </div>
      )}
    </div>
  );
}
