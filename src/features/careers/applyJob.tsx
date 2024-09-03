import { useState, ChangeEvent, useRef, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import post from "../home/components/feed/post";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ApplyFormSchema,
  ApplyFormValidation,
} from "../../models/ApplyFormSchema";
import CustomAlert from "../../components/ui/CustomAlert";
import CustomButton from "../../components/ui/CustomButton";
import { CONSTANTS } from "../../utils/constants";
import { ROUTES } from "../../utils/Routes";

type formProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone: {
    code: String;
    number: String;
  };
  message: String;
  file_path: String;
  role: String;
};
function ApplyForInternship() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showErrFile, setShowFile] = useState(false);
  const [errFileMsg, setErrFileMsg] = useState("");
  const [showErrForm, setShowForm] = useState(false);
  const [errFormMsg, setErrFormMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm<ApplyFormValidation>({
    mode: "all",
    resolver: zodResolver(ApplyFormSchema),
  });
  const { state } = useLocation();
  const nav = useNavigate();
  const dateTimeString =
    new Date().toLocaleDateString() +
    "_" +
    Math.random().toString(36).substring(7) +
    "_" +
    new Date().toLocaleTimeString().replace(/\s+/g, "");

  const onSubmit = async (data: ApplyFormValidation) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(
        `${CONSTANTS.API_ENDPOINT}/v1/admin/careers_request`,
        data,
      );
      setLoading(false);
      setShowSuccess(true);
      setSuccessMsg("Submitted successfully! We will get back to you shortly");
    } catch (error: any) {
      setShowForm(true);
      console.log(error);
      setLoading(false);
      setShowSuccess(false);
      setErrFormMsg(error.response.data.error.message);
    }
  };
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file", file);
      if (file.size > 3 * 1024 * 1024) {
        setShowFile(true);
        setErrFileMsg("File size must be less than 3 MB");
        e.currentTarget.value = "";
        setValue("file_path", "");
        setError("file_path", {
          type: "custom",
          message: "File size must be less than 3 MB",
        });
      } else if (
        file.type !== "application/pdf" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setShowFile(true);
        setErrFileMsg("Only PDF and Word (docx) files are allowed");
        e.currentTarget.value = "";
        setValue("file_path", "");
        setError("file_path", {
          type: "custom",
          message: "Only PDF and Word (docx) files are allowed",
        });
      } else {
        clearErrors("file_path");
        setShowFile(false);
        setValue("file_path", file.name);
        await uploadToS3Bucket(file);
      }
    }
  };
  const uploadToS3Bucket = async (file: any) => {
    try {
      const resposne = await axios.get(
        `${CONSTANTS.API_ENDPOINT}/v1/admin/upload_url?BucketName=eco-core&DirectoryName=temp&FileName=${
          dateTimeString + "_" + file.name
        }&ContentType=${file.type}&Content=Content`,
      );
      console.log("resposne", resposne);
      setValue("file_path", resposne.data.access_path);
      setValue("role", state.role);
      return resposne.data.access_path;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFile(false);
      setShowForm(false);
      setShowSuccess(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [showErrFile, showErrForm, showSuccess]);

  const handleClose = () => {
    setShowFile(false);
    setShowForm(false);
    setShowSuccess(false);
  };

  console.log("errFormMsg", errFormMsg);

  return (
    <>
      <CustomAlert
        className={`alert-trans ${showSuccess ? "show-alert" : ""}`}
        severity="success"
        message={successMsg}
        alertTitle="Success"
        onClose={handleClose}
      />
      <CustomAlert
        className={`alert-trans ${showErrForm ? "show-alert" : ""}`}
        severity="error"
        message={errFormMsg}
        alertTitle="Error"
        onClose={handleClose}
      />
      <div className="pagePadding container-sub">
        <div className="back-icon-display">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="pointer-class left-arrow"
            onClick={() => nav(ROUTES.CAREER_DESCRIPTION, { state: state })}
          />
          <div>
            <h2 className="subHeading">Application Form</h2>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <div className="form-group">
              <label>First Name: </label>
              <input
                type="text"
                className={`input-field mt-1 ${
                  errors.first_name && "invalid-field"
                }`}
                {...register("first_name")}
                placeholder="Enter your First Name"
              />
              {errors.first_name && (
                <span className="error-msg">{errors.first_name?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                className={`input-field mt-1 ${
                  errors.last_name && "invalid-field"
                }`}
                {...register("last_name")}
                placeholder="Enter your Last Name"
              />
              {errors.last_name && (
                <span className="error-msg">{errors.last_name?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Enter your Email ID: </label>
              <input
                type="email"
                className={`input-field mt-1 ${
                  errors.email && "invalid-field"
                }`}
                {...register("email")}
                placeholder="Enter your Email ID"
              />
              {errors.email && (
                <span className="error-msg">{errors.email?.message}</span>
              )}
            </div>
            <div>
              <div className="form-group phone-num-wrapper">
                <label>Enter your Phone Number: </label>
                <input
                  type="tel"
                  className="input-field phone-code-inp"
                  {...register("phone.code")}
                  defaultValue={"+91"}
                  readOnly
                />
                <input
                  type="number"
                  className={`input-field phone-num ${
                    errors.phone?.number && "invalid-field"
                  }`}
                  {...register("phone.number")}
                  placeholder="Enter your Phone Number"
                />
                {errors.phone?.number && (
                  <span className="err-msg-phn-code-inp">
                    {errors.phone?.number?.message}
                  </span>
                )}
              </div>
            </div>
            <div
              className="form-group"
              style={{ marginTop: "4rem", marginBottom: "1rem" }}
            >
              <label>Upload Your Resume (max size 3 MB) </label>
              <Controller
                name="file_path"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      className={`${errors.file_path && "invalid-field"}`}
                      onChange={(e) => {
                        field.onChange(e);
                        onFileChange(e);
                      }}
                    />
                    {errors.file_path && (
                      <span className="error-msg">
                        {errors.file_path?.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className="form-group">
              <label>Message (Optional): </label>
              <textarea
                style={{ minHeight: "100px" }}
                className={`input-field mt-1 ${
                  errors.message && "invalid-field"
                }`}
                {...register("message")}
                placeholder="Message to share with Ecoyaan:"
              />
              {errors.message && (
                <span className="error-msg">{errors.message?.message}</span>
              )}
            </div>
            <CustomButton type="submit" loading={loading}>
              Submit
            </CustomButton>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplyForInternship;

function setPost(arg0: any) {
  throw new Error("Function not implemented.");
}
