"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = () => {
  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </button>
  )
}

export default DeleteButton