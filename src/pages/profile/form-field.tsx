import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

interface formFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  isTextarea: boolean;
}

const FormFieldComponent = ({
  control,
  name,
  label,
  placeholder,
  isTextarea,
}: formFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : name === "mobileNumber" ? (
              <div className="flex items-center border rounded">
                <span className="h-10 flex justify-center items-center p-2 bg-slate-50">+91</span>
                <Input placeholder={placeholder} {...field} className="border-0"/>
              </div>
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
