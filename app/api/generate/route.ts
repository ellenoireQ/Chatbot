export async function POST(req: Request) {
  const date = await req.json();
  const params = date.prompt;

  const ollama = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2:1b",
      prompt: params,
      stream: false,
    }),
  });

  const result = await ollama.json();
  return Response.json({ response: result.response });
}
