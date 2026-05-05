"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteExperience(id: string): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("experience").delete().eq("id", id);

  if (error) {
    console.error("Error deleting experience:", error);
    redirect("/admin/experience?error=delete");
  }

  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function createExperience(formData: FormData): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const period = formData.get("period") as string;
  const description = formData.get("description") as string;
  const skillsString = formData.get("skills") as string;
  const order_index = parseInt(formData.get("order_index") as string || "0");

  const skills = skillsString ? skillsString.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  const { error } = await supabase.from("experience").insert([
    {
      role,
      company,
      period,
      description,
      skills,
      order_index
    }
  ]);

  if (error) {
    console.error("Error creating experience:", error);
    // Can't return error object from form action - redirect back with error param
    redirect("/admin/experience?error=1");
  }

  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}
