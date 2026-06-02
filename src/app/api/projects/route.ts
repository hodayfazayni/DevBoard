import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/lib/data.json");
const data = fs.readFileSync(filePath, "utf-8");
const projects = JSON.parse(data);


export async function GET() {
  return NextResponse.json(projects);
}



export async function POST(request: Request) {
  const body = await request.formData();

  const newProject = {
    "title": body.get("title"),
    "description": body.get("description"),
    "status": "in progress",
    "id": Date.now().toString(),
  }
  
  projects.push(newProject);

  const filePath = path.join(process.cwd(), "src/lib/data.json");
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), "utf-8");

  return NextResponse.json(newProject, { status: 201 });
}

export async function DELETE(request: Request) {
  
}