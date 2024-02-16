"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import { api } from '@/convex/_generated/api';
import {toast} from "sonner";
import { useParams, useRouter } from 'next/navigation';
const DocumentsPage=()=> {
  const {user} = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const params = useParams();

  const onCreate = () =>{
   const promise = create({title: "Untitled" });

   toast.promise(promise,{
    loading:"Creating a new note...",
    success:"New note created!",
    error:"Failed to create a new note."
   });

   router.push(`/documents/${params.documentId}`);
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image height={300} width={300} alt='Empty' src={"/empty.png"} className='dark:hidden'/>
      <Image height={300} width={300} alt='Empty' src={"/empty-dark.png"} className='dark:block hidden'/>
      <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Jotion</h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2'/>
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage