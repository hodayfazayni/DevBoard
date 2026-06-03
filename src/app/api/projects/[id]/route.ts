import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
interface Object {
  id: string;
  title: string;
  description: string;
  status: string;
}

function getProject(){
  const filePath = path.join(process.cwd(), "src/lib/data.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }   
) {
  const projects = getProject();
  const { id } = await params;    

  const project = projects.find((p: Object) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const projects = getProject();
  const { id } = await params;

  const projectIndex = projects.findIndex((p: Object) => p.id === id);

  if (projectIndex === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  projects.splice(projectIndex, 1);
  const filePath = path.join(process.cwd(), "src/lib/data.json");
  fs.writeFileSync(filePath, JSON.stringify(projects));

  return NextResponse.json({ message: "Project deleted successfully" });
}



export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const projects = getProject();
  const body = await request.formData();
  const { id } = await params;

  const projectIndex = projects.findIndex((p: Object) => p.id === id);

  if (projectIndex === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const updatedProject = {
    id,
    title: body.get("title") as string,
    description: body.get("description") as string,
    status: body.get("status") as string,
  };
  const filePath = path.join(process.cwd(), "src/lib/data.json");

  projects[projectIndex] = updatedProject;
  fs.writeFileSync(filePath, JSON.stringify(projects));
  return NextResponse.json(updatedProject);
}
