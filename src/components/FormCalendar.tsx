import { Control, FieldValues } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

export interface IFormCalendar {
    control?: Control<FieldValues>,
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
}
export default function FormCalendar(props: IFormCalendar) {
    const {control, name, label, description, disabled} = props

    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                      <Button
                          variant={"outline"}
                          className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd-MM-yyyy")
                          ) : (
                            <span>Selectionner une date</span>
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
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                    disabled={disabled}
                  />
                </PopoverContent>
              </Popover>
              {
                description && (
                    <FormDescription>
                        {description}
                    </FormDescription>
                )
              }
              <FormMessage />
            </FormItem>
          )}
        />
    )
}