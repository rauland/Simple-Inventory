import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  price: z.string().min(0),
})

function AddProduct() {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    handleFormSubmit(values)
  }

  const [responseText, setResponseText] = useState("");

  async function handleFormSubmit(values: { name: string; description: string; price: string; }) {

    // Make a POST request to the specified endpoint
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('Item updated successfully!');
        const data = await response.json();
        console.log(data);
        setResponseText("ID returned: " + JSON.stringify(data.id)); // Convert the data to a string
      } else {
        console.error('Failed to update item.');
        setResponseText('Failed to update Item');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseText('Error occurred');
    }
  }

  return (
    <Card>
      <Form {...form}>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Add in the new Product Details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Vodka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="Number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
							control={form.control}
							name="tax"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tax</FormLabel>
									<FormControl>
										<Input type="Number" placeholder="0" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </CardContent>
        <CardFooter>
          {responseText}
        </CardFooter>
      </Form>
    </Card>

  )
}


export default AddProduct;