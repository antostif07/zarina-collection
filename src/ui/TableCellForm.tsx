import { TableCell } from "@/components/ui/table";
import { useRef, useState } from "react";

interface TTableCellForm {
    value: string;
    className?: string;
}

export default function TableCellForm({value, className,}: TTableCellForm) {
    const [isEditing, setIsEditing] = useState(false)
    const inputRef = useRef();

    return (
        <TableCell className={className} onClick={() => {
            setIsEditing(true)
            // inputRef.current.focus();
        }}>
            {
                isEditing ? (
                    <input
                        type="text" name="name" className="border rounded-sm h-8" onBlur={(e) => console.log("On Blur: " + e)}
                        onChange={(e) => console.log(e.target.value)}
                        // ref={inputRef}
                    />
                ) : (
                    value
                )
            }
        </TableCell>
    )
}