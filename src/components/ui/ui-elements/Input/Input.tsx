import clsx from 'clsx';
import type { ChangeEventHandler, Ref } from 'react';

export type InputProps = {
  placeholder: string;
  error?: string;
  name: string;
  type?: string;
};

export const Input = ({
  error,
  inputRef,
  type,
  name,
  onChange,
  placeholder,
  value,
}: InputProps & {
  inputRef?: Ref<HTMLInputElement>;
  isSubmitting?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const errorStyle =
    error &&
    'border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:border-red-500';

  return (
    <div>
      <input
        onChange={onChange}
        name={name}
        value={value}
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-md border p-2 valid:ring-green-500 focus:ring-indigo',
          errorStyle,
        )}
      />
      {!!error && <p className='text-xs text-red-500 empty:hidden'>{error}</p>}
    </div>
  );
};
