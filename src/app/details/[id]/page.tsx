
import { notFound } from 'next/navigation';

export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  const { id } = await params;     

  const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
    cache: "no-store",
    next: { revalidate: 0 }
  });


  if (!res.ok) {
    console.error(`not found: ${id}`);
    notFound();
  }

  const project = await res.json();



  return (
    <div className="max-w-3xl mx-auto p-8" id='projectContainer'>
      <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-500 mb-8">ID: {project.id}</p>
      <p>Created at: {project.date}</p>
      <div className="prose text-lg">
        <p>{project.description}</p>
      </div>

      <div className="mt-8">
        <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full">
          {project.status}
        </span>
        <button>
          <img src="/delete.svg" alt="delete" />
          delete
        </button>
      </div>
    </div>
  );
}
