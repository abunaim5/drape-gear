import { IoMdClose } from "react-icons/io";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const SideDrawer = () => {
    return (
        <Drawer direction='right'>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent className='rounded-none w-full md:w-[340px]'>
                <DrawerHeader className='border-b flex items-center justify-between'>
                    <DrawerTitle className='text-base tracking-normal'>Search Products</DrawerTitle>
                    <DrawerClose>
                        <IoMdClose className='text-2xl' />
                    </DrawerClose>
                </DrawerHeader>
                <DrawerFooter className='border-t'>
                    <span>View all</span>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SideDrawer;