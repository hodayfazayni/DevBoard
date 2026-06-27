import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from  "@/lib/prisma";
import { ProjectItem } from "@/components/projectItem";


export default async function Home() {
  const session = await auth();
  if(!session){
    redirect("/account");
  }

  const projects = await prisma.project.findMany({
         where: {
            userId: session?.user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
  });

  if( projects.length === 0){
    return(
      <p>no projects yet</p>
    )
  }

  return(
    <div className="flex gap-4 flex-wrap">
      {projects.map((project) => (
        <ProjectItem 
        key={project.id}
        id={project.id}
        title={project.title} 
        completed={project.completed} 
        description={project.description}
      />
      ))}
    </div>
  );
}
