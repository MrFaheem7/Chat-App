// client/src/components/RegisterForm.js

import "./RegisterForm.scss";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../Schemas/RegisterSchema";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const { signUp, loading } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    if (!selectedImage) {
      toast.error("Please select an image");
    }
    console.log(data);
    await signUp(data.name, data.email, data.password, selectedImage).catch(
      (err) => {
        console.error(err);
        toast.error(err.response.data.msg || "Bad Request");
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>| Register Your Account</h2>
        {imagePreview ? (
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={imagePreview || "https://via.placeholder.com/150"}
              alt="Profile Picture"
            />
          </div>
        ) : (
          <div className="profile-picture-container">
            <label htmlFor="profile-picture-input">
              <FontAwesomeIcon icon={faUpload} size="2x" color="white" />
              <p>Upload Profile Picture</p>
              <input
                name="image"
                required
                type="file"
                id="profile-picture-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              {!selectedImage && <p className="error">Image Is Required</p>}
            </label>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit">{loading ? "Signup... " : "Signup"}</button>
        <Link to="/login">
          <p>Already have an account? Login</p>
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
