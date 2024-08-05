'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuditReport from "./AuditReport";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Audit } from "@/src/common/Audit";

export default function AuditResultTabs ({
    baseData, resultData, totalData, audit}: {baseData: any, resultData: any, totalData: any, audit: Audit
}) {
    const [filterStatus, setFilterStatus] = useState("all")
    const baseHeader = Object.keys(baseData[0])
    const resultHeader = resultData ? Object.keys(resultData[0]) : null

    // @ts-ignore
    const baseProducts = resultData ? baseData.map(bd => ({...bd, status: resultData.find(rD => bd['Article/Code barre'] === rD['Code Barre']) === undefined ? false : true})) : baseData
    // @ts-ignore
    const manquants = baseProducts.filter(bP => !bP.status).map(bp => {
        // @ts-ignore
        const vendus = totalData.filter(tD => tD["Article/Code barre"] === bp["Article/Code barre"] && tD["Vendu"])

        return {...bp, sellStatus: vendus.length > 0}
    })
    
    return (
        <Tabs className="mb-16" defaultValue={"Base"}>
            <TabsList>
                {
                    ["Base", "Resultat Physique", "Manquant", "Resultat Final"].map((eD, index) => (
                        <TabsTrigger key={index} value={eD}>{eD}</TabsTrigger>
                    ))
                }
            </TabsList>
            <TabsContent value={"Base"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                <TableHead className="whitespace-nowrap">N</TableHead>
                            }
                            {
                                resultHeader && (
                                    <TableHead className="whitespace-nowrap">Statut Physique</TableHead>
                                )
                            }
                            {
                                baseHeader.map((header, index) => (
                                    <TableHead className="whitespace-nowrap" key={`b-${index}-${header}`}>{header}</TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            // @ts-ignore
                            baseProducts.map((b, ii) => {
                                return (
                                    <TableRow key={`b-${ii}`} className={`${!b.status && "bg-red-700 text-white hover:bg-red-800"}`}>
                                        <TableCell className="font-medium" >{ii + 1}</TableCell>
                                        {
                                            resultHeader && <TableCell className="font-medium" >{b.status ? "Trouvé" : "Non Trouvé"}</TableCell>
                                        }
                                        {
                                            baseHeader.map((bh, i) => (
                                                <TableCell className="font-medium" key={`${bh}-${i}`}>{b[bh]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value={"Resultat Physique"}>
                {
                    !resultHeader ? (
                        <div>Veuillez ajouter un fichier de resultat</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="whitespace-nowrap" >N</TableHead>
                                    <TableHead className="whitespace-nowrap" >Statut Système</TableHead>
                                    {
                                        resultHeader.map((header, index) => (
                                            <TableHead className="whitespace-nowrap" key={`r-${header}-${index}`}>{header}</TableHead>
                                        ))
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    // @ts-ignore
                                    resultData.map((b, ii) => {
                                        // @ts-ignore
                                        const pFind = baseProducts.find(p => p["Article/Code barre"] === b["Code Barre"])
                                        
                                        return (
                                            <TableRow key={`b-${ii}`} className={`${!(pFind && pFind.status) && "bg-red-700 text-white hover:bg-red-800"}`}>
                                                <TableCell className={`font-medium`}>{ii + 1}</TableCell>
                                                <TableCell className={`font-medium`}>{pFind && pFind.status ? "Trouvé" : "Non Trouvé"}</TableCell>
                                                {
                                                    resultHeader.map((bh, i) => (
                                                        <TableCell className={`font-medium`} key={`${bh}-${i}`}>{b[bh]}</TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </TabsContent>
            <TabsContent value={"Manquant"}>
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-0">
                    <div className="w-full">
                        <div className="flex py-2">
                            <div className="w-full px-4">Total: <span className="font-bold">{manquants.length}</span> manquants sur <span className="font-bold">{baseProducts.length}</span> produits dans le système</div>
                            {/* @ts-ignore */}
                            <div className="w-full px-4">Valeur: <span className="font-bold">{manquants.reduce((acc, item) => item['PV'] ? acc + item['PV'] : acc, 0)} $</span></div>
                        </div>
                        <div className="flex py-2">
                            {/* @ts-ignore */}
                            <div className="w-full px-4">Total Vendu: <span className="font-bold">{manquants.filter(m => m.sellStatus).length}</span> sur <span className="font-bold">{manquants.length}</span> produits non trouvés</div>
                            {/* @ts-ignore */}
                            <div  className="w-full px-4">Valeur Vendu: <span className="font-bold">{manquants.filter(m => m.sellStatus).reduce((acc, item) => item['PV'] ? acc + item['PV'] : acc, 0)} $</span></div>
                        </div>
                        <div className="flex py-2">
                            {/* @ts-ignore */}
                            <div className="w-full px-4">Total Non  Vendu: <span className="font-bold">{manquants.filter(m => !m.sellStatus).length}</span> sur <span className="font-bold">{manquants.length}</span> produits non trouvés</div>
                            {/* @ts-ignore */}
                            <div className="w-full px-4">Valeur Vendu: <span className="font-bold">{manquants.filter(m => !m.sellStatus).reduce((acc, item) => item['PV'] ? acc + item['PV'] : acc, 0)} $</span></div>
                        </div>
                    </div>
                    <div className="w-full">
                        <Select onValueChange={(e) => setFilterStatus(e)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Statut" defaultValue={filterStatus} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Statut de vente</SelectLabel>
                                    <SelectItem value="all">Tout</SelectItem>
                                    <SelectItem value="find">Vendu</SelectItem>
                                    <SelectItem value="not-find">Non Vendu</SelectItem>
                                    <SelectItem value="find-other">Vendu Stock Ailleurs</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table className="my-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">N</TableHead>
                            <TableHead className="whitespace-nowrap">Vendu</TableHead>
                            {
                                baseHeader.map((header, index) => (
                                    <TableHead className="whitespace-nowrap" key={`m-${header}-${index}`}>{header}</TableHead>
                                ))
                            }
                            <TableHead className="whitespace-nowrap">Stock Ailleurs</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            // @ts-ignore
                            manquants.filter(m => {
                                if (filterStatus === "all") { return true}
                                if (filterStatus === "find") { return m.sellStatus}
                                if (filterStatus === "not-find") { return !m.sellStatus}
                                if (filterStatus === "find-other") { return m.sellStatus && m["Quantité disponible"] < 0}
                                return true
                            })
                            // @ts-ignore
                            .map((b, ii) => { 
                                // @ts-ignore
                                const vendus = totalData.filter(tD => tD["Article/Code barre"] === b["Article/Code barre"] && tD["Vendu"])
                                
                                return (
                                    <TableRow key={`m-${ii}`} className={`${"bg-red-700 text-white hover:bg-red-800"}`}>
                                        <TableCell className="font-medium whitespace-nowrap" >{ii + 1}</TableCell>
                                        <TableCell className="font-medium whitespace-nowrap" >{vendus.length < 1 ? "Non Vendu" : "Vendu"}</TableCell>
                                        {
                                            baseHeader.map((bh, i) => (
                                                <TableCell className="font-medium" key={`m-${bh}-${i}`}>{b[bh]}</TableCell>
                                            ))
                                        }
                                        <TableCell className="font-medium whitespace-nowrap" >{vendus.length > 0 && b["Quantité disponible"] < 0 && vendus[1]["Lieu"]}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value={"Resultat Final"}>
                {
                    resultData ? (
                        <AuditReport audit={audit} baseProducts={baseProducts} manquants={manquants} resultProducts={resultData} />
                    ) : (
                        <p>Veuillez ajouter le fichier de resultat</p>
                    )
                }
            </TabsContent>
        </Tabs>
    )
}