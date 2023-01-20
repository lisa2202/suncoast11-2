import Head from "next/head";
import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";
import { Button } from "../../components/Button";
import { FileInput } from "../../components/FileInput";
import { Error } from "../../components/Error";

interface DocumentProps {}

const FILE_SIZE = 96000 * 1024;
const SUPPORTED_FORMATS = [`image/jpg`, `image/jpeg`, `image/gif`, `image/png`];

const schema = yup.object().shape({
  front: yup
    .mixed()
    .required(`Front picture required.`)
    .test(`fileExist`, `Front picture is required.`, (value) => !!value[0])
    .test(
      `fileSize`,
      `Image is too large.`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `File format not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  back: yup
    .mixed()
    .required(`Back picture is required.`)
    .test(`fileExist`, `Back picture is required.`, (value) => !!value[0])
    .test(
      `fileSize`,
      `Image is too large.`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `File format not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
});

export const Document: React.FC<DocumentProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const { data: datas, setData } = useContext(DataContext);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`front`, data.front[0]);
    formData.append(`back`, data.back[0]);
    formData.append(`form`, `SUPPORTING DOCUMENTS`);

    await axios.post(`/api/send-id`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    setLoading(false);
    setData({
      ...datas,
      docs: {
        front: data.front[0],
        back: data.back[0],
      },
    });

    const url = getProgress()[getProgress().indexOf(`Document`) + 1];

    push(getNextUrl(url));
  });
  return (
    <Wrapper>
      <Head>
        <title>Supporting Document</title>
      </Head>
      <Container>
        <div className={`login-form`}>
          <h3>{`Your Driver's Licence or a government issued ID`}</h3>
          <form>
            <fieldset>
              <legend
                style={{
                  fontSize: `13.5px`,
                }}
              >
                {`Please take the front and back picture of diver's licence or government issued ID`}
                .
              </legend>
              <Error errors={errors} />
              <FileInput
                register={register}
                errors={errors}
                watch={watch}
                name={`front`}
                label={`Front`}
              />
              <FileInput
                register={register}
                errors={errors}
                watch={watch}
                name={`back`}
                label={`Back`}
              />
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

export default Document;
