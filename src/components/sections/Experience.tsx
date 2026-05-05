import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ExperienceClient from "./ExperienceClient";

export default async function Experience() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: experiences, error } = await supabase
    .from("experience")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching experiences:", error);
  }

  return <ExperienceClient experiences={experiences || []} />;
}
