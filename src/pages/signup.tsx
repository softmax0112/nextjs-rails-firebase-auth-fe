import type { NextPage } from 'next';
import { Form } from '@/components/functional/Form';
import { InputControl } from '@/components/functional/InputControl';
import { Button } from '@/components/ui/ui-elements/Button';
import { GoogleSignInButton } from '@/components/ui/ui-elements/GoogleSignInButton';
import { z } from 'zod';

export const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスは必ず入力してください。' })
    .regex(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), {
      message: 'メールアドレスの形式が不正です。',
    })
    .max(40, { message: 'メールアドレスは40文字以内で入力してください。' }),
  emailVerification: z
    .string()
    .min(1, { message: 'メールアドレスは必ず入力してください。' })
    .regex(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), {
      message: 'メールアドレスの形式が不正です。',
    })
    .max(40, { message: 'メールアドレスは40文字以内で入力してください。' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください。' })
    .regex(new RegExp(/^[a-zA-Z0-9]+$/), {
      message: 'パスワードの形式が不正です。',
    })
    .max(20, { message: 'パスワードは20文字以内で入力してください。' }),
});

type SignUpFormValues = {
  email: string;
  emailVerification: string;
  password: string;
};

const SignUpPage: NextPage = () => {
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>会員登録</h2>
      <Form<SignUpFormValues, typeof validationSchema>
        id='translate-form'
        onSubmit={async (data) => {
          console.log(data);
        }}
        options={{
          reValidateMode: 'onChange',
          defaultValues: {
            email: '',
            emailVerification: '',
            password: '',
          },
        }}
        className='pt-4'
        schema={validationSchema}
      >
        {({ control, formState }) => {
          return (
            <>
              <InputControl placeholder='Email' name='email' type='email' control={control} />
              <div className='h-5'></div>
              <InputControl
                placeholder='Email Verification'
                name='emailVerification'
                type='email'
                control={control}
              />
              <div className='h-5'></div>
              <InputControl
                placeholder='Password'
                name='password'
                type='password'
                control={control}
              />
              <div className='mt-10 flex justify-center'>
                <div>
                  <Button isLoading={formState.isSubmitting} type='submit' className='w-full'>
                    会員登録
                  </Button>
                  <div className='h-5'></div>
                  <GoogleSignInButton variant='inverse'>Googleで始める</GoogleSignInButton>
                </div>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default SignUpPage;
