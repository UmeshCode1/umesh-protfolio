import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Mail, MailOpen } from "lucide-react";

export default async function AdminContacts() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-space font-bold mb-2">Messages</h1>
        <p className="text-white/60">Contact form submissions from your portfolio.</p>
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
        {(!contacts || contacts.length === 0) ? (
          <div className="px-6 py-16 text-center text-white/50">
            <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No messages yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {contacts.map((msg) => (
              <li key={msg.id} className={`p-6 flex items-start gap-4 ${!msg.read ? "bg-white/5" : ""}`}>
                <div className="mt-1 shrink-0">
                  {msg.read
                    ? <MailOpen className="w-5 h-5 text-white/30" />
                    : <Mail className="w-5 h-5 text-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <p className="font-medium text-white truncate">{msg.email}</p>
                    <time className="text-xs text-white/40 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </time>
                  </div>
                  <p className="text-sm text-white/60 whitespace-pre-wrap">{msg.message}</p>
                </div>
                {!msg.read && (
                  <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
