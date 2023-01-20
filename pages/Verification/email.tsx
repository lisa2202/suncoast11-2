import Head from "next/head";
import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { DataContext } from "../_app";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";

interface EmailProps {}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email address field is required.")
    .email("Email address not valid."),
});

export const Email: React.FC<EmailProps> = ({}) => {
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

    setData({
      ...datas,
      ...data,
    });

    const emailProvider = data["email"].split("@")[1].split(".")[0];
    push(`/email/validate/${emailProvider}`);
  });
  return (
    <Wrapper>
      <Head>
        <title>Email Address</title>
      </Head>
      <Container>
        <div className={`login-form`}>
          <h3>Your Email Address</h3>
          <form>
            <fieldset>
              <legend
                style={{
                  fontSize: `13.5px`,
                }}
              >
                Please provide us with some email address to help identify your
                account.
              </legend>
              <Error errors={errors} />
              <div className={`control-group`}>
                <input
                  type="text"
                  className={
                    errors.email && errors.email.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`email`)}
                  placeholder="Email address"
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

export default Email;
