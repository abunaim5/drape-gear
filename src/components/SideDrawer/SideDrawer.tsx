import { IoMdClose, IoMdArrowForward } from "react-icons/io";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { ReactNode } from "react";
import Link from "next/link";

const SideDrawer = ({ title, place, open, setOpen, drawerElem }: { title: string, place: 'top' | 'bottom' | 'left' | 'right', open: boolean, setOpen: (value: boolean) => void, drawerElem: ReactNode }) => {
    return (
        <Drawer direction={place} open={open} onOpenChange={() => setOpen(false)}>
            <DrawerContent className='max-h-[100vh] rounded-none w-full md:w-[340px]' aria-describedby="">
                <DrawerHeader className='border-b flex items-center justify-between'>
                    <DrawerTitle className='text-base tracking-normal'>{title}</DrawerTitle>
                    <DrawerClose>
                        <IoMdClose className='text-2xl' />
                    </DrawerClose>
                </DrawerHeader>
                <div className='flex-1'>
                    {drawerElem}
                </div>
                <DrawerFooter className='border-t mt-0'>
                    <Link href='/products/all' className='flex items-center gap-2 hover:text-cyan-500'>
                        View all
                        <IoMdArrowForward />
                    </Link>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SideDrawer;