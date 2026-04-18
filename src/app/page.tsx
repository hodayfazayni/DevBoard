
import Link from "next/link";

export default async function Projects() {

  const response = await fetch("http://localhost:3000/api/projects");
  const projects = await response.json();
  
  return(
    <div className="container">
      {projects.map((project: any) => {
        return(
          <article key={project.id}>
            <section className="header">
                <Link title="see more" className="details" href={`/details/${project.id}`}>
                  <img src="/see.svg" alt="see more" />
                </Link>
                <h2>{project.title}</h2>
            </section>
            
            <p>{project.description}</p>
          </article>
        )
      })}
    </div>
  );
}
