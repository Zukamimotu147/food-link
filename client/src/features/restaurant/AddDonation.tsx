import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import CardWrapper from './components/CardWrapper';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { addDonationSchema } from './schema/addDonationSchema';
import { toast } from 'sonner';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import useFetchCharities from '@/hooks/useFetchCharities';

type AddDonationFields = z.infer<typeof addDonationSchema>;
type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};

const AddDonation = () => {
  const form = useForm<AddDonationFields>({
    defaultValues: {
      foodItemName: '',
      quantity: 0,
      category: '',
      description: '',
      streetAddress: '',
      barangay: '',
      city: '',
      province: '',
      pickupDate: new Date(),
      specialInstructions: '',
      contactName: '',
      contactNumber: '',
      allergens: '',
      storageRequirements: '',
      photoUrl: '',
      charity: '',
    },
    resolver: zodResolver(addDonationSchema),
  });

  const { data: Charitydata } = useFetchCharities();
  //   console.log('from add donation', Charitydata);

  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;

  const userId = decodedToken?.userId;
  const handleSubmit = async (data: AddDonationFields) => {
    const formattedPickupDate = format(data.pickupDate, 'yyyy-MM-dd');

    try {
      await axios.post(
        `http://localhost:3000/api/restaurant/addDonationRequest/${userId}/${data.charity}`,
        {
          foodItemName: data.foodItemName,
          quantity: data.quantity,
          category: data.category,
          description: data.description,
          streetAddress: data.streetAddress,
          barangay: data.barangay,
          city: data.city,
          province: data.province,
          pickupDate: formattedPickupDate,
          specialInstructions: data.specialInstructions,
          contactName: data.contactName,
          contactNumber: data.contactNumber,
          allergens: data.allergens,
          storageRequirements: data.storageRequirements,
          photoUrl: data.photoUrl,
          charity: data.charity,
        }
      );
      toast.success('Donation request submitted successfully');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto max-w-7xl">
      <CardWrapper title="Food Donation Request">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="foodItemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Food Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Food Item Name..." className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Quantity..."
                        className="w-full"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description..."
                      className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-offset-background focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ maxHeight: '150px' }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="charity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charity</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="text-black" placeholder="Select Charity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Charitydata?.length > 0 ? (
                        Charitydata.map((charity: any) => (
                          <SelectItem
                            key={charity.charityId}
                            value={charity.charityName}
                            className="text-black">
                            {charity.charityName}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-muted-foreground text-sm">
                          No charities available
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address..." {...field} />
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
                      <Input placeholder="City..." {...field} />
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
                  <FormItem className="w-full flex-1">
                    <FormLabel className="text-black">Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Province..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupDate"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-black">Pick-Up Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}>
                              {field.value ? (
                                format(field.value, 'yyyy-MM-dd')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Special Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Special Instructions..."
                      className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-offset-background focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ maxHeight: '150px' }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Name..." {...field} />
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
                      <Input placeholder="Contact Number..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between gap-2">
              {' '}
              <FormField
                control={form.control}
                name="allergens"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Allergens</FormLabel>
                    <FormControl>
                      <Input placeholder="Allergens..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storageRequirements"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-black">Storage Requirements</FormLabel>
                    <FormControl>
                      <Input placeholder="Storage Requirements..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Upload Photos</FormLabel>
                  <FormControl>
                    <Input placeholder="Upload Photos..." {...field} type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={Charitydata?.length === 0}
              className="w-full bg-customGreen hover:bg-customGreen/80">
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default AddDonation;
