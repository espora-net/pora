import axios from "axios"

export type LLMProvider = "openai" | "azure" | "local"

export interface LLMOptions {
  provider: LLMProvider
  apiKey?: string
  endpoint?: string
  model?: string
}

export async function generateCompletion(
  prompt: string,
  options: LLMOptions
): Promise<string> {
  switch (options.provider) {
    case "openai":
      return requestOpenAI(prompt, options)
    case "azure":
      return requestAzure(prompt, options)
    case "local":
      return requestLocal(prompt, options)
    default:
      throw new Error(`Unsupported provider: ${options.provider}`)
  }
}

async function requestOpenAI(prompt: string, options: LLMOptions): Promise<string> {
  const url =
    options.endpoint || "https://api.openai.com/v1/chat/completions"

  const response = await axios.post(
    url,
    {
      model: options.model || "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data.choices?.[0]?.message?.content?.trim() || ""
}

async function requestAzure(prompt: string, options: LLMOptions): Promise<string> {
  if (!options.endpoint) {
    throw new Error("Azure endpoint required")
  }

  const response = await axios.post(
    options.endpoint,
    {
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "api-key": options.apiKey || "",
        "Content-Type": "application/json",
      },
    }
  )

  return response.data.choices?.[0]?.message?.content?.trim() || ""
}

async function requestLocal(prompt: string, options: LLMOptions): Promise<string> {
  const url = options.endpoint || "http://localhost:1234/v1/chat/completions"

  const response = await axios.post(
    url,
    {
      model: options.model || "local",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return response.data.choices?.[0]?.message?.content?.trim() || ""
}
