import Link from "next/link";

export default async function Projects() {

  const response = await fetch("http://localhost:3000/api/projects");
  const projects = await response.json();
  
  return(
    <div className="flex gap-4 flex-wrap justify-center items-center h-screen">
      {projects.length > 0 ? (
        projects.map((project: any) => {
        return(
          <article className="w-100 h-40 bg-sky-400 rounded-lg ml-7" key={project.id}>
            <section className="header">
                <Link className="position-absolute top-2 left-0" title="see more" href={`/details/${project.id}`}>
                  <img src="/see.svg" alt="see more" />
                </Link>
                <h2 className="text-3xl font-bold text-center text-cyan-100">{project.title}</h2>
            </section>
            
            <p className="text-cyan-100 text-center ">{project.description}</p>
          </article>
        )
      })) : (
        <p className="text-cyan-900">No projects yet.</p>
      )}
    </div>
  );
}
