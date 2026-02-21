import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

type AIProviderType = "openai" | "google";

interface AIProviderConfig {
  provider: AIProviderType;
  model: string;
}

const getProviderConfig = (): AIProviderConfig => {
  const provider = (process.env.AI_PROVIDER as AIProviderType) || "openai";

  const modelMap: Record<AIProviderType, string> = {
    openai: "gpt-4o-mini",
    google: "gemini-1.5-flash",
  };

  return {
    provider,
    model: modelMap[provider] || modelMap.openai,
  };
};

export const getAIModel = (): LanguageModel => {
  const config = getProviderConfig();

  switch (config.provider) {
    case "google": {
      const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      });
      return google(config.model);
    }
    default: {
      const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      return openai(config.model);
    }
  }
};

export const getCurrentProvider = (): AIProviderType => {
  return (process.env.AI_PROVIDER as AIProviderType) || "openai";
};
