import { updateDonationSchema } from '../../schema/updateDonationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import useFetchCharities from '@/hooks/useFetchCharities';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
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
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';

type updateDonationField = z.infer<typeof updateDonationSchema>;

type UpdateDonationProps = {
  donationId: number;
};
const UpdateDonation: FC<UpdateDonationProps> = ({ donationId }) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: Charitydata } = useFetchCharities();

  const form = useForm<updateDonationField>({
    resolver: zodResolver(updateDonationSchema),
    defaultValues: {
      restaurantName: '',
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
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
    }
  };

  const saveChanges = async (data: updateDonationField) => {
    const formattedPickupDate = format(data.pickupDate, 'yyyy-MM-dd');
    const formData = new FormData();

    formData.append('restaurantName', data.restaurantName);
    formData.append('foodItemName', data.foodItemName);
    formData.append('quantity', data.quantity.toString());
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('streetAddress', data.streetAddress);
    formData.append('barangay', data.barangay);
    formData.append('city', data.city);
    formData.append('province', data.province);
    formData.append('pickupDate', formattedPickupDate);
    formData.append('specialInstructions', data.specialInstructions);
    formData.append('contactName', data.contactName);
    formData.append('contactNumber', data.contactNumber);
    formData.append('allergens', data.allergens);
    formData.append('storageRequirements', data.storageRequirements);
    formData.append('charity', data.charity);
    if (imgFile) {
      formData.append('photoUrl', imgFile);
    }
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/restaurant/updateDonationRequest/${donationId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Donation request updated successfully');
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Update</Button>
      </SheetTrigger>
      <SheetContent className="bg-customGreen w-full">
        <SheetHeader>
          <SheetTitle className="text-white">Edit Donation Request</SheetTitle>
          <SheetDescription className="text-white/80">
            Make changes to your donation here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[90%] w-full rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(saveChanges)} className="space-y-8">
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="foodItemName"
                  render={({ field }) => (
                    <FormItem className="w-[120px]">
                      <FormLabel className="text-white">Food Item Name</FormLabel>
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
                      <FormLabel className="text-white">Quantity</FormLabel>
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
                    <FormItem className="w-[120px]">
                      <FormLabel className="text-white">Category</FormLabel>
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
                    <FormLabel className="text-white">Description</FormLabel>
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
                    <FormLabel className="text-white">Charity</FormLabel>
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
                    <FormLabel className="text-white">Street Address</FormLabel>
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
                      <FormLabel className="text-white">Barangay</FormLabel>
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
                      <FormLabel className="text-white">City</FormLabel>
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
                      <FormLabel className="text-white">Province</FormLabel>
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
                    <FormItem className="flex-1">
                      <FormLabel className="text-white">Pick-Up Date</FormLabel>
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
                    <FormLabel className="text-white">Special Instructions</FormLabel>
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
                      <FormLabel className="text-white">Contact Name</FormLabel>
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
                      <FormLabel className="text-white">Contact Number</FormLabel>
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
                      <FormLabel className="text-white">Allergens</FormLabel>
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
                      <FormLabel className="text-white">Storage Requirements</FormLabel>
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
                    <FormLabel className="text-white">Upload Photos</FormLabel>
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

              <SheetClose asChild>
                <Button type="submit" disabled={Charitydata?.length === 0} className="w-full">
                  {loading ? <LoaderCircle className="animate-spin" /> : 'Save Changes'}
                </Button>
              </SheetClose>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateDonation;
