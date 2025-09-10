import InventoryForm from "./inventory-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function InventoryDialog() {
    return (
        <>
            <Dialog>
                <DialogTrigger className="ml-2 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 text-white px-2 py-1 rounded-md font-semibold">
                    Add Item +
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add New Item</DialogTitle>
                    {/* <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new inventory item.
                    </DialogDescription>
                    <DialogFooter>
                        <Button type="submit">Add Item</Button>
                    </DialogFooter> */}
                    <InventoryForm />
                </DialogContent>
            </Dialog>
        </>
    )
}