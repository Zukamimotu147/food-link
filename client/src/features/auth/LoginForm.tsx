import CardWrapper from './components/CardWrapper';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
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
import { loginAuthSchema } from './schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

type DecodedToken = {
  userId: number;
  email: string;
  role: string;
  password: string;
};

type AuthFields = z.infer<typeof loginAuthSchema>;
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  const form = useForm<AuthFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginAuthSchema),
  });

  const handleLogin = async (data: AuthFields) => {
    try {
      const response = await axios.post('https://food-link.onrender.com/auth/login', data);
      //   console.log('User Info:', response.data);
      const decodedToken: DecodedToken = jwtDecode(response.data.token);

      localStorage.setItem('userData', JSON.stringify(response.data.user));
      localStorage.setItem('role', decodedToken.role);
      localStorage.setItem('token', response.data.token);

      if (decodedToken.role === 'ADMIN') {
        navigation('/dashboard/admin');
      } else if (decodedToken.role === 'RESTAURANT') {
        navigation('/dashboard/restaurant');
      } else {
        navigation('/');
      }
      toast.success(`User logged in successfully`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleLoginGoogle = async () => {
    window.open('https://food-link.onrender.com/auth/google', '_self');
  };
  return (
    <section className="relative h-screen w-screen">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/6893982/6893982-uhd_2560_1440_25fps.mp4"
        autoPlay
        loop
        muted
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <CardWrapper
          label="Login Form"
          title="Login"
          backButtonHref="/auth/register"
          backButtonLabel="Don't have an account?">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
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
                  <FormItem className="relative">
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Password..."
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className="pr-10"
                      />
                    </FormControl>
                    <p
                      className="absolute right-3 top-[62%] transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <div className="flex justify-center mt-2">
              <Button className="m-2" onClick={handleLoginGoogle}>
                <img
                  src="https://img.icons8.com/?size=100&id=P7UIlhbpWzZm&format=png&color=000000"
                  alt="gmail icon"
                  className="w-6 h-6"
                />
                Sign In with Google
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant={'link'} className="text-white">
                <Link to="/">Go Back to Home</Link>
              </Button>
            </div>
          </Form>
        </CardWrapper>
      </div>
    </section>
  );
};

export default LoginForm;
