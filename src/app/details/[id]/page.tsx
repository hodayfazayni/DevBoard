export const dynamic = "force-dynamic";


import { notFound } from "next/navigation";
import DeleteButton from "@/components/deleteButton";
import Link from "next/link";


async function fetchProject(id: string) {
  const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    console.error(`not found: ${id}`);
    notFound();
  }

  return res.json();
}


export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const { id } = await params;

  const project = await fetchProject(id);
  

  return (
    <div className="projectContainer">
      <h1 className="text-5xl text-center font-bold mb-4">{project.title}</h1>
      <div className="info">
        <h2 className="text-xl text-center">ID: {project.id}</h2>
        <span className="status">{project.status}</span>
      </div>

      <div className="flex justify-center items-center gap-4 mb-4">
        <DeleteButton id={id} />
        <Link href={`/edit/${id}`} className="edit">
          Edit
        </Link>
      </div>

      <div className="description">
        <p>{project.description}</p>
      </div>
    </div>
  );
}

