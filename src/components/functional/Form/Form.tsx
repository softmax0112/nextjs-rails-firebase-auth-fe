import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { SubmitHandler, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>,
>({
  children,
  className,
  id,
  onSubmit,
  options,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form className={clsx(className)} onSubmit={methods.handleSubmit(onSubmit)} id={id}>
      {children(methods)}
    </form>
  );
};
