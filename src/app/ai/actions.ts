'use server'

export async function askAssistant(message: string): Promise<{ reply: string }> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return { reply: "AI assistant is not configured. Please set the GEMINI_API_KEY environment variable." }
  }

  const systemPrompt = `You are Umesh's portfolio AI assistant. You help visitors learn about Umesh Patel, a Full-Stack Developer.

Key facts about Umesh:
- Full-Stack Developer specializing in Next.js, React, TypeScript, Supabase, and Tailwind CSS
- Passionate about building intelligent, high-performance web experiences
- GitHub: https://github.com/UmeshCode1
- Currently building an AI-powered portfolio platform

Your role:
- Answer questions about Umesh's skills, projects, experience, and background
- Be friendly, concise, and professional
- If asked about something you don't know, say so honestly
- Do NOT make up specific facts about Umesh that aren't provided above
- Keep replies under 3 short paragraphs`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nVisitor asks: ${message}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    )

    if (!response.ok) {
      console.error('Gemini API error:', response.status, response.statusText)
      return { reply: "Sorry, I'm having trouble connecting right now. Please try again shortly." }
    }

    const data = await response.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "I didn't get a response. Please try again."
    return { reply }
  } catch (error) {
    console.error('AI assistant error:', error)
    return { reply: "Something went wrong. Please try again later." }
  }
}
