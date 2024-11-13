import { useForm } from "react-hook-form";
import FormFieldComponent from "./form-field";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface userFormProps {
  addUserAddress: (
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    pin: number,
    state: string,
    town: string,
    mobileNumber: string
  ) => void;
  onClose: () => void;
}

// Define the form schema with all required fields
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 3 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 3 characters.",
  }),
  addressLine1: z.string().min(5, {
    message: "Address Line 1 must be at least 5 characters.",
  }),
  addressLine2: z.string().min(5, {
    message: "Address Line 1 must be at least 5 characters.",
  }),
  pin: z
    .string()
    .length(6, {
      message: "Pin must be exactly 6 characters.",
    })
    .transform((val) => parseInt(val)),
  state: z.string().min(2, {
    message: "State must be at least 3 characters.",
  }),
  town: z.string().min(2, {
    message: "Town must be at least 3 characters.",
  }),

  mobileNumber: z.string().min(10, {
    message: "Phone Number must be at least 10 characters.",
  }),
});

function UserForm({ addUserAddress }: userFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      pin: 0,
      state: "",
      town: "",
      mobileNumber: "",
    },
    mode: "onBlur",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addUserAddress(
      values.firstName,
      values.lastName,
      values.addressLine1,
      values.addressLine2,
      values.pin,
      values.town,
      values.state,
      values.mobileNumber
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4">
          <FormFieldComponent
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="first name"
            isTextarea={false}
          />
          <FormFieldComponent
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="last name"
            isTextarea={false}
          />
        </div>

        <FormFieldComponent
          control={form.control}
          name="addressLine1"
          label="Address Line 1"
          placeholder="address 1"
          isTextarea={true}
        />

        <FormFieldComponent
          control={form.control}
          name="addressLine2"
          label="Address Line 2"
          placeholder="address 2"
          isTextarea={true}
        />

        <div className="grid grid-cols-2 gap-x-4">
          <FormFieldComponent
            control={form.control}
            name="town"
            label="Town"
            placeholder="town"
            isTextarea={false}
          />
          <FormFieldComponent
            control={form.control}
            name="state"
            label="State"
            placeholder="state"
            isTextarea={false}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <FormFieldComponent
            control={form.control}
            name="pin"
            label="Pin"
            placeholder="214343"
            isTextarea={false}
          />
          <FormFieldComponent
            control={form.control}
            name="mobileNumber"
            label="Phone Number"
            placeholder="+91 - 1234567890"
            isTextarea={false}
          />
        </div>
        <DialogTrigger asChild>
          <Button type="submit" className=" bg-green-600 text-xs">
            Submit
          </Button>
        </DialogTrigger>
      </form>
    </Form>
  );
}

export default UserForm;
