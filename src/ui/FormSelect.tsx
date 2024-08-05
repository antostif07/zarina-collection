'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"

interface IFormSelect {
    name: string;
    options: {value: any, id: any}[];
    title?: string;
    placeholder?: string;
    form: any;
}

export default function FormSelect(props: IFormSelect) {
    return (
        // <Select name={props.name} onValueChange={props.handleChange}>
        //     <SelectTrigger className="w-[180px]">
        //         <SelectValue placeholder={props.placeholder} />
        //     </SelectTrigger>
        //     <SelectContent>
        //         <SelectGroup>
        //             <SelectLabel>{props.title}</SelectLabel>
                    
        //         </SelectGroup>
        //     </SelectContent>
        // </Select>
        <FormField 
            control={props.form.control}
            name={props.name}
            render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>{props.title}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {
                                props.options.map(option => (
                                    <SelectItem value={option.id} key={option.id}>
                                        {option.value}
                                    </SelectItem>
                                ))
                            }
                            </SelectContent>
                        </Select>
                        {/* <FormDescription>
                            You can manage email addresses in your{" "}
                            <Link href="/examples/forms">email settings</Link>.
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}