'use client'
import addAttendances from "@/src/actions/attendances"
import { useState, useTransition } from "react"
import * as XLSX from 'xlsx'
import { parseExcelLogs } from "@/src/lib/parseExcelLogs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableHeader, TableHead, TableBody, TableCell, Table, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Employee } from "@/src/common/Employee"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from "../LoadingButton"

export default function CreateForm({employees}: {employees: Array<Employee>}) {
    const [excelData, setExcelData] = useState([])
    const [pending, startTransition] = useTransition()

    const handleChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const data = new Uint8Array(event.target?.result)
            const workbook = XLSX.read(data, {'type': 'array'})
            const sheetNames = workbook.SheetNames
            
            // const sheetName = sheetNames[1]
            const sheet = workbook.Sheets["Logs"]
            
            const result = parseExcelLogs(sheet)

            const resultWithEmployeeId = result.map((res) => {
                const employee = employees.filter(emp => {
                    return emp.name.toLowerCase().includes(res.name)
                })
                
                return { //@ts-ignore
                    ...res, employeeId: employee[0] ? employee[0]["@id"] : ""
                }
            })
// @ts-ignore
            setExcelData(resultWithEmployeeId)
        }
        reader.readAsArrayBuffer(file)
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        
        startTransition(async () => {
            await addAttendances(excelData)
        })
    }
    
    return (
        <div>
            <div className="flex justify-center">
                <label className="bg-black text-white py-2 px-3 rounded-lg cursor-pointer" htmlFor="attendance-file">Importer le fichier</label>
                <input type="file" onChange={handleChange} id="attendance-file" hidden/>
            </div>
            <form action="" className="mt-8" onSubmit={onSubmit}>
            {
                excelData.length > 0 ? (
                    <>
                        <div className="flex justify-end">
                            <LoadingButton text="Enregistrer les présences" pending={pending} />
                        </div>
                        {/* @ts-ignore */}
                        <Tabs className="" defaultValue={excelData[0].name}>
                        <TabsList>
                            {
                                excelData.map((eD, index) => ( //@ts-ignore
                                    <TabsTrigger key={index} value={eD.name}>{eD.name}</TabsTrigger>
                                ))
                            }
                        </TabsList>
                        {
                                excelData.map((eD, index) => ( //@ts-ignore
                                    <TabsContent key={index} value={eD.name}>
                                        <div className="flex">
                                            <h2 className="w-full">
                                                {/* @ts-ignore */}
                                                <span className="font-bold">Nom</span>: <span className="capitalize">{eD.name}</span>
                                            </h2>
                                            <div className="w-full">
                                                <h2>Employé Systeme</h2>
                                                {/* @ts-ignore */}
                                                <Select onValueChange={(d) => console.log(d)} defaultValue={eD.employeeId}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={"Employé"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Employé Système</SelectLabel>
                                                            {
                                                                employees.map((option) => (
                                                                    // @ts-ignore
                                                                    <SelectItem value={option["@id"]} key={option.id}>
                                                                        {option.name}
                                                                    </SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Table>
                                            {/* <TableCaption>Fichier importé</TableCaption> */}
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="whitespace-nowrap">Date</TableHead>
                                                    <TableHead className="whitespace-nowrap">Heure</TableHead>
                                                    <TableHead className="whitespace-nowrap">Statut</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {
                                                // @ts-ignore
                                                eD.dateandtime.map((row: any, index: number) => parseInt(row.day) !== 7 && (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{row.date}</TableCell>
                                                        <TableCell className="font-medium">{parseInt(row.day) === 7 ? "Dimanche" : row.time}</TableCell>
                                                        <TableCell className="font-medium">
                                                            <Badge variant={(row.status === "ABSENT" || row.status === "Dimanche") ? "destructive" : row.status === "PRESENT" ? "outline" : "default"}>
                                                                {row.status}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            </TableBody>
                                        </Table>
                                    </TabsContent>
                                ))
                            }
                    </Tabs>
                    </>
                ) : (
                    <p>Veuillez importer le fichier des présences</p>
                )
            }
            </form>
        </div>
    )
}