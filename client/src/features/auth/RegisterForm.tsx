import CardWrapper from './components/CardWrapper';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { registerAuthSchema } from './schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

type AuthFields = z.infer<typeof registerAuthSchema>;
const RegisterForm = () => {
  const navigation = useNavigate();
  const form = useForm<AuthFields>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    resolver: zodResolver(registerAuthSchema),
  });

  const handleLogin = (data: AuthFields) => {
    console.log(data);
  };
  return (
    <section className="relative h-screen w-screen">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/6893983/6893983-uhd_2560_1440_25fps.mp4"
        autoPlay
        loop
        muted
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <CardWrapper
          label="Register Form"
          title="Register"
          backButtonHref="/auth/login"
          backButtonLabel="Already have an account?">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email..." {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password..." {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter confirm Password..." {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="flex justify-center">
              <Button className="m-2">Sign In with Google</Button>
            </div>
          </Form>
        </CardWrapper>
      </div>
    </section>
  );
};

export default RegisterForm;
