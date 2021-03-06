import React, { Component, createRef } from "react";
import UploadService from "../api/uploadService";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null
    };
    this.form = createRef();
    this.uploadService = new UploadService();
  }

  submitHandler = async e => {
    e.preventDefault();
    try {
      const data = new FormData(this.form.current);
      const user = await this.uploadService.uploadProfile(data);
      this.props.setUserState(user);
      this.setState({ err: null });
    } catch (err) {
      debugger;
      const { message } = err.response.data;
      this.setState({ err: message });
    }
  };

  render() {
    console.log(this.form);
    return (
      <div>
        <h1>Hi, {this.props.user.username}</h1>

        <form
          id="form"
          onSubmit={this.submitHandler}
          ref={this.form}
          encType="multipart/form-data"
        >
          <input name="profile-photo" placeholder="upload your profile" />
          <input type="text" placeholder="Add a caption!" name="caption" />
          <button type="submit">Upload photo</button>
          {this.state.err && <p>{this.state.err}</p>}
        </form>

        {this.props.user.profilePhoto && (
          <div>
            <h1>{this.props.user.profilePhoto.caption}</h1>
            <img src={this.props.user.profilePhoto.imageUrl} alt="" />
          </div>
        )}
      </div>
    );
  }
}
