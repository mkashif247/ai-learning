import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

import { env } from "@/lib/env";

// ── Types ─────────────────────────────────────────────
type ProviderKey =
  | "openai"
  | "anthropic"
  | "google"
  | "groq"
  | "openrouter"
  | "xai";

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  providerId: ProviderKey;
  description?: string;
}

// ── Provider Configuration ──────────────────────────────
export const AI_PROVIDERS = {
  openai: {
    name: "OpenAI",
    checkKey: () => !!env.OPENAI_API_KEY && env.OPENAI_API_KEY !== "****",
    instance: () => createOpenAI({ apiKey: env.OPENAI_API_KEY }),
  },
  anthropic: {
    name: "Anthropic",
    checkKey: () => !!env.ANTHROPIC_API_KEY && env.ANTHROPIC_API_KEY !== "****",
    instance: () => createAnthropic({ apiKey: env.ANTHROPIC_API_KEY }),
  },
  google: {
    name: "Google Gemini",
    checkKey: () =>
      !!env.GOOGLE_GENERATIVE_AI_API_KEY &&
      env.GOOGLE_GENERATIVE_AI_API_KEY !== "****",
    instance: () =>
      createGoogleGenerativeAI({ apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY }),
  },
  groq: {
    name: "Groq",
    checkKey: () => !!env.GROQ_API_KEY && env.GROQ_API_KEY !== "****",
    instance: () =>
      createOpenAI({
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: env.GROQ_API_KEY,
      }),
  },
  openrouter: {
    name: "OpenRouter",
    checkKey: () =>
      !!env.OPENROUTER_API_KEY && env.OPENROUTER_API_KEY !== "****",
    instance: () =>
      createOpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: env.OPENROUTER_API_KEY,
      }),
  },
  xai: {
    name: "xAI",
    checkKey: () => !!env.XAI_API_KEY && env.XAI_API_KEY !== "****",
    instance: () =>
      createOpenAI({ baseURL: "https://api.x.ai/v1", apiKey: env.XAI_API_KEY }),
  },
} as const;

// ── Static Models (Default Supported) ───────────────────
export const DEFAULT_MODELS: Record<string, ModelConfig> = {
  // Google
  "gemini-2.5-flash": {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    providerId: "google",
    description: "Google's fastest multimodal model",
  },
  // OpenAI
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    providerId: "openai",
    description: "Fast and lightweight GPT-4 model",
  },
  "gpt-4o": {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerId: "openai",
    description: "OpenAI's most capable model",
  },
  // Anthropic
  "claude-3-5-sonnet-latest": {
    id: "claude-3-5-sonnet-latest",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    providerId: "anthropic",
    description: "Anthropic's latest high-performance model",
  },
  // OpenRouter (Deepseek)
  "deepseek/deepseek-r1": {
    id: "deepseek/deepseek-r1",
    name: "DeepSeek R1",
    provider: "OpenRouter",
    providerId: "openrouter",
    description: "DeepSeek reasoning model via OpenRouter",
  },
};

/**
 * Validates if the given provider ID has an API key configured
 */
export function isProviderEnabled(providerId: ProviderKey): boolean {
  return AI_PROVIDERS[providerId]?.checkKey() || false;
}

/**
 * Returns a list of all currently available models based on active API keys
 */
export function getAvailableModels(): ModelConfig[] {
  return Object.values(DEFAULT_MODELS).filter((model) =>
    isProviderEnabled(model.providerId),
  );
}

/**
 * Returns the Vercel AI SDK Core model instance ready for generation
 * @throws Error if the associated provider key is missing
 */
export function getModelInstance(modelId: string) {
  const config = DEFAULT_MODELS[modelId];
  if (!config) {
    throw new Error(`Model ${modelId} not found in registry`);
  }

  const providerDef = AI_PROVIDERS[config.providerId];
  if (!providerDef.checkKey()) {
    throw new Error(
      `Provider ${providerDef.name} is not configured (missing API key)`,
    );
  }

  const aiFactory = providerDef.instance();
  return aiFactory(modelId);
}
