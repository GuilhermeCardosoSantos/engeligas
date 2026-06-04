import React from "react";

export const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    setForm: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target;
  
    setForm((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };

export const handleCpfChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<any>>
) => {
  const value = e.target.value.replace(/\D/g, "");

  setForm((prev: any) => ({
    ...prev,
    cpf: value,
  }));
};

export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<any>>
) => {
  const value = e.target.value.replace(/\D/g, "");

  setForm((prev: any) => ({
    ...prev,
    phone: value,
  }));
};