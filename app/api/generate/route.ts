export async function POST(req: Request) {
  const date = await req.json();
  const params = date.messages?.[0]?.content;

  /*const ollama = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2:1b",
      prompt: params,
      stream: false,
    }),
  });


  const result = await ollama.json();
  */
  const api = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/cypher-alpha:free",
      messages: [
        {
          role: "user",
          content: params,
        },
      ],
    }),
  });
  const result = await api.json();
  if (!api.ok) {
    return Response.json({
      errCode: api.status,
      message: result.error.message,
    });
  }

  console.log(result);
  return Response.json({ response: result.choices?.[0]?.message?.content });
}
