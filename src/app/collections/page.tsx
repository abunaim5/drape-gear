'use client';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Collection from "@/components/Collection/Collection";
import { useSession } from "next-auth/react";

const Collections = () => {
    const {data: session} = useSession();
    console.log(session)

    return (
        <>
            <Breadcrumb />
            <div className='container mb-20'>
                <Collection />
            </div>
        </>
    );
};

export default Collections;