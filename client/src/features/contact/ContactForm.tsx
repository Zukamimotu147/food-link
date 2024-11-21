import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CardWrapper from './components/CardWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { contactSchema } from './schema/contactSchema';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type ContactFields = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const navigation = useNavigate();
  const form = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFields) => {
    console.log(data);
    navigation('/');
  };
  return (
    <CardWrapper title="Contact Us">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between space-x-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name..." className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name..." className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Message..."
                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-offset-background focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ maxHeight: '150px' }}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-right text-xs text-muted-foreground">
                  {field.value.length}/1000 characters
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-customGreen hover:bg-customGreen/80"
            onClick={() => toast.success('Message sent successfully')}>
            Contact Us
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ContactForm;
