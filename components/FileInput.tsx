import React, { useRef } from "react";
import Image from "next/image";
import { watch } from "fs";
import { UseFormRegister, FieldValues, UseFormWatch } from "react-hook-form";
import { ref } from "yup";

interface FileInputProps {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: {
    [x: string]: any;
  };
  name: string;
  label: string;
  placeholder?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  register,
  watch,
  errors,
  name,
  label,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name);

  return (
    <>
      {watch(name) && watch(name).length ? (
        <Image
          alt={name}
          src={URL.createObjectURL(watch(name)[0])}
          height={`100px`}
          width={`100px`}
          layout={`fixed`}
          objectFit={`contain`}
        />
      ) : null}
      <div className={`control-group`}>
        <input
          type={`file`}
          accept={`image/*`}
          style={{
            position: `absolute`,
            cursor: `pointer`,
            zIndex: 1,
            opacity: 0,
          }}
          onFocus={() => console.log(`Focused: ${name}`)}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <input
          type="text"
          value={watch(name) && watch(name).length ? watch(name)[0].name : ``}
          placeholder={label}
        />
      </div>
    </>
  );
};
