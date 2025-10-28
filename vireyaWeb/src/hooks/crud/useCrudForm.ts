import { useState } from "react";

export function useCrudForm<T extends { id: number }>(props: {
  item: T | null;
  onSave: (data: Partial<T>) => Promise<void>;
  onCancel: () => void;
}) {
  const { item, onSave } = props;
  
  const [form, setForm] = useState<Partial<T>>(item || {});
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string>>>({}); 

  const handleChange = (key: keyof T, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      await onSave(form);
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors: Partial<Record<keyof T, string>> = {};
    Object.keys(form).forEach((key) => {
      if (!form[key as keyof T]) {
        errors[key as keyof T] = "Este campo é obrigatório!";
        valid = false;
      }
    });
    setFormErrors(errors);
    return valid;
  };

  return {
    form,
    formErrors,
    setForm,
    handleSubmit,
    handleChange,
  };
}
