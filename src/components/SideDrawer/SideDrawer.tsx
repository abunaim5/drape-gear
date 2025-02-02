import { IoMdClose } from "react-icons/io";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { ReactNode } from "react";

const SideDrawer = ({ title, place, open, setOpen, drawerElem }: { title: string, place: 'top' | 'bottom' | 'left' | 'right', open: boolean, setOpen: (value: boolean) => void, drawerElem: ReactNode }) => {
    return (
        <Drawer direction={place} open={open} onOpenChange={() => setOpen(false)}>
            <DrawerContent className='rounded-none w-full md:w-[340px]'>
                <DrawerHeader className='border-b flex items-center justify-between'>
                    <DrawerTitle className='text-base tracking-normal'>{title}</DrawerTitle>
                    <DrawerClose>
                        <IoMdClose className='text-2xl' />
                    </DrawerClose>
                </DrawerHeader>
                <div className='p-4'>
                    {drawerElem}
                </div>
                <DrawerFooter className='border-t'>
                    <span>View all</span>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SideDrawer;