"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error(`Failed to delete project with id: ${id}`);
      return;
    }

    router.push("/"); 
  }

  return (
    <button className="delete" onClick={handleDelete}>
      delete
    </button>
  );
}