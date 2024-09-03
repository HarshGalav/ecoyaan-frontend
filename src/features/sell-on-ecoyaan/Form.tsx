import { KeyboardEvent, useEffect, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SellerFormSchema,
  SellerValidationSchema,
} from "../../models/SellerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../components/ui/CustomButton";
import CustomAlert from "../../components/ui/CustomAlert";
import { CONSTANTS } from "../../utils/constants";

function Form() {
  const [successMsg, setSuccessMsg] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SellerValidationSchema>({
    mode: "all",
    resolver: zodResolver(SellerFormSchema),
  });
  const onSubmit = async (data: SellerValidationSchema) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${CONSTANTS.API_ENDPOINT}/v1/admin/seller_request`,
        data,
      );
      setLoading(false);
      setSuccessMsg("Submitted successfully! We will get back to you shortly");
      setShow(true);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShow(false);
      setSuccessMsg("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <CustomAlert
        className={`alert-trans ${show ? "show-alert" : ""}`}
        severity="success"
        message={successMsg}
        alertTitle="Success"
        onClose={handleClose}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            className={`input-field ${errors.first_name && "invalid-field"}`}
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
            className={`input-field ${errors.last_name && "invalid-field"}`}
            {...register("last_name")}
            placeholder="Enter your Last Name"
          />
          {errors.last_name && (
            <span className="error-msg">{errors.last_name?.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Business Name: </label>
          <input
            type="text"
            className={`input-field ${errors.business_name && "invalid-field"}`}
            {...register("business_name")}
            placeholder="Enter your Business Name"
          />
          {errors.business_name && (
            <span className="error-msg">{errors.business_name?.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Business Page:</label>
          <input
            type="text"
            className={`input-field ${errors.business_url && "invalid-field"}`}
            {...register("business_url")}
            placeholder="Share your Business Page or Share your Instagram Link"
          />
          {errors.business_url && (
            <span className="error-msg">{errors.business_url?.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Enter your Email ID: </label>
          <input
            type="email"
            className={`input-field ${errors.email && "invalid-field"}`}
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
        <div className="form-group" style={{ marginTop: "4rem" }}>
          <label>Message: </label>
          <textarea
            style={{ minHeight: "100px" }}
            className={`input-field ${errors.message && "invalid-field"}`}
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
    </>
  );
}

export default Form;
