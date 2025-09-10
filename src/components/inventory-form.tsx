"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function InventoryForm() {
    const [page, setPage] = useState(1);

    const handleNext = () => {
        setPage(page+1);
    }

    const handlePrev = () => {
        setPage(page-1)
    }
    return (
        <>
            <form>
                <div className="flex flex-col gap-6">
                        {page === 1 ? (
                            <>
                    <div className="grid gap-2">
                        <Label htmlFor="item-name">Nama Barang</Label>
                        <Input
                            id="item-name"
                            type="text"
                            placeholder="Lemari"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="procurement-year">Procurement Year</Label>
                        <Input id="procurement-year" type="number" placeholder="2025" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="specification">Specification</Label>
                        <Input id="specification" type="text" placeholder="Azko" required />
                    </div>
                            </>
                        ) : (
                            <>
                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" placeholder="10" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="good-condition">Good Condition</Label>
                        <Input id="good-condition" type="number" placeholder="10" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fair-condition">Fair Condition</Label>
                        <Input id="fair-condition" type="number" placeholder="10" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="poor-condition">Poor Condition</Label>
                        <Input id="poor-condition" type="number" placeholder="10" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="note">Note</Label>
                        <Textarea id="note" placeholder="Occaecat consequat qui consectetur enim consectetur in nulla duis mollit non enim pariatur anim." required/>
                    </div>
                            </>
                        )}

                        {page === 1 ? (
                            <div className="w-full flex justify-end">
                                <Button variant={"secondary"} className="w-fit" onClick={handleNext}>
                                    Next <ArrowRight/>
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full gap-4 grid grid-cols-2">
                                <Button variant={"secondary"} onClick={handlePrev}>
                                    <ArrowLeft/> Back
                                </Button>
                                <Button>
                                    Submit
                                </Button>
                            </div>
                        )}
                </div>
            </form>
        </>
    )
}