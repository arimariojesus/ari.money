import React, { useCallback, useMemo, useState } from "react";

type SubmitCallback<T> = (
  event: React.FormEvent<HTMLFormElement>,
  values: T
) => Promise<void>;

export interface IUseFormValuesResponse<FormValues, ChangeEvent> {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  loadingFormValues: boolean;
  setLoadingFormValues: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeFormValues: (event: React.ChangeEvent<ChangeEvent>) => void;
  handleSubmitFormValues: (
    callback: SubmitCallback<FormValues>
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  handleClearFormValues: (allowed?: string[]) => void;
}

export function useFormValues<
  FormValues,
  ChangeEvent = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>(initialState: FormValues): IUseFormValuesResponse<FormValues, ChangeEvent> {
  const [formValues, setFormValues] = useState<FormValues>({ ...initialState });
  const [loadingFormValues, setLoadingFormValues] = useState(false);

  const handleChangeFormValues = useCallback(
    event => {
      let type = event.target?.type ?? null;
      let value: any = event.target?.value ?? "";
      let name = event.target?.name ?? "";

      if (type === "file") {
        const files = event.target?.files ?? [];
        value = files.length === 1 ? files[0] : files;
      } else if (type === "number") {
        value = Number(event.target?.value);
      } else if (["radio", "checkbox"].includes(type)) {
        value = event.target?.checked ?? false;
      }

      setFormValues((oldValues) => ({
        ...oldValues,
        [name]: value,
      }));
    },
    []
  );

  const handleClearFormValues = useCallback((allowedValues?: string[]) => {
    setFormValues(prevFormvalues => {
      const newFormValues = { ...initialState };

      if (Array.isArray(allowedValues)) {
        allowedValues.forEach((key) => {
          // @ts-ignore
          newFormValues[key] = prevFormvalues[key];
        });
      }

      return newFormValues;
    });
  }, [initialState]);

  const handleSubmitFormValues = useCallback(
    (callback: SubmitCallback<FormValues>) =>
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();

        try {
          setLoadingFormValues(true);
          await callback(event, formValues);
        } finally {
          setLoadingFormValues(false);
        }
      },
    [formValues]
  );

  return useMemo(
    () => ({
      formValues,
      setFormValues,
      loadingFormValues,
      setLoadingFormValues,
      handleChangeFormValues,
      handleSubmitFormValues,
      handleClearFormValues,
    }),
    [
      formValues,
      loadingFormValues,
      handleChangeFormValues,
      handleClearFormValues,
      handleSubmitFormValues,
    ]
  );
}
