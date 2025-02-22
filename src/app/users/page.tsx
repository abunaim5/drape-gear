'use client'
import { useAppSelector } from "@/lib/hooks";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { PiTrashLight } from "react-icons/pi";

const Users = () => {
    const { users } = useAppSelector((state) => state.users);

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-412px)] mb-20'>
                <div className='flex flex-col md:flex-row gap-8 mt-16'>
                    <DashboardNav />
                    <Table className='border'>
                        <TableCaption>A list of your recent users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Manage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>United States</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell className="text-right">
                                        <button className={`text-center text-base px-5 py-2 transition-all duration-500 bg-black text-white hover:bg-gray-800 hover:text-red-500 ${user.role === 'admin' ? 'pointer-events-none bg-gray-500' : ''}`}><PiTrashLight /></button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Users;