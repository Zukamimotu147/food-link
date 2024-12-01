import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CardWrapper from './components/CardWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addCharitySchema } from './schema/addCharitySchema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

type CharityFields = z.infer<typeof addCharitySchema>;
const AddCharity = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<CharityFields>({
    defaultValues: {
      charityName: '',
      streetAddress: '',
      barangay: '',
      city: '',
      province: '',
      contactNumber: '',
      email: '',
      charityPhotoUrl: '',
    },
    resolver: zodResolver(addCharitySchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
    }
  };

  const addCharity = async (data: CharityFields) => {
    const formData = new FormData();
    formData.append('charityName', data.charityName);
    formData.append('streetAddress', data.streetAddress);
    formData.append('barangay', data.barangay);
    formData.append('city', data.city);
    formData.append('province', data.province);
    formData.append('contactNumber', data.contactNumber);
    formData.append('email', data.email);
    if (imgFile) {
      formData.append('charityPhotoUrl', imgFile);
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/admin/addCharity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard/admin/charities');
      toast.success('Charity added successfully');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 500 || error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-screen flex justify-center items-center">
      <CardWrapper label="Add Charity" title="Add Charity">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addCharity)} className="space-y-8">
            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="charityName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Charity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Charity name..." className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email..." className="w-full" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address..." className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Barangay</FormLabel>
                    <FormControl>
                      <Input placeholder="Barangay..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City..." className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Province</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Province..." className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contact Number..." className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="charityPhotoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Upload Photos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Upload Photos..."
                      {...field}
                      type="file"
                      onChange={(e) => {
                        handleFileChange(e);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-customGreen hover:bg-customGreen/80">
              {loading ? <LoaderCircle className="animate-spin" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};

export default AddCharity;
