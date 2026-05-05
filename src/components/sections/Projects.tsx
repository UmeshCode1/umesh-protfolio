import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return <ProjectsClient projects={projects || []} />;
}
