import type { ModelId } from '@/lib/ai/model-id';

// List of unique providers extracted from models data
export const providers = [
  'alibaba',
  'amazon',
  'anthropic',
  'cohere',
  'deepseek',
  'google',
  'inception',
  'meta',
  'mistral',
  'moonshotai',
  'morph',
  'openai',
  'perplexity',
  'vercel',
  'xai',
] as const;

export type ProviderId = (typeof providers)[number];

export interface ModelData {
  id: ModelId;
  object: string;
  owned_by: ProviderId;
  name: string;
  description: string;
  context_window: number; // Max input tokens
  max_tokens: number; // Max output tokens
  pricing: {
    input: string; // Input price per token
    output: string; // Output price per token
  };
}

// Define the data with proper typing
export const modelsData: ModelData[] = [
  {
    id: 'alibaba/qwen-3-14b',
    object: 'model',
    owned_by: 'alibaba',
    name: 'Qwen3-14B',
    description:
      'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support',
    context_window: 40960,
    max_tokens: 8192,
    pricing: {
      input: '0.00000008',
      output: '0.00000024',
    },
  },
  {
    id: 'alibaba/qwen-3-235b',
    object: 'model',
    owned_by: 'alibaba',
    name: 'Qwen3-235B-A22B',
    description:
      'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support',
    context_window: 40960,
    max_tokens: 8192,
    pricing: {
      input: '0.0000002',
      output: '0.0000006',
    },
  },
  {
    id: 'alibaba/qwen-3-30b',
    object: 'model',
    owned_by: 'alibaba',
    name: 'Qwen3-30B-A3B',
    description:
      'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support',
    context_window: 40960,
    max_tokens: 8192,
    pricing: {
      input: '0.0000001',
      output: '0.0000003',
    },
  },
  {
    id: 'alibaba/qwen-3-32b',
    object: 'model',
    owned_by: 'alibaba',
    name: 'Qwen 3.32B',
    description:
      'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support',
    context_window: 40960,
    max_tokens: 8192,
    pricing: {
      input: '0.0000001',
      output: '0.0000003',
    },
  },
  {
    id: 'alibaba/qwen3-coder',
    object: 'model',
    owned_by: 'alibaba',
    name: 'Qwen3 Coder',
    description:
      'Qwen3-Coder is an advanced agentic code model delivering performance comparable to Claude Sonnet across coding tasks, browser automation, and repository-scale understanding. With native 256K token context (extendable to 1M via Yarn) and specialized function calling for platforms like Qwen Code and CLINE, it excels at complex agentic coding workflows.',
    context_window: 262144,
    max_tokens: 8192,
    pricing: {
      input: '0.000002',
      output: '0.0000035',
    },
  },
  {
    id: 'amazon/nova-lite',
    object: 'model',
    owned_by: 'amazon',
    name: 'Nova Lite',
    description:
      'A very low cost multimodal model that is lightning fast for processing image, video, and text inputs.',
    context_window: 300000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000006',
      output: '0.00000024',
    },
  },
  {
    id: 'amazon/nova-micro',
    object: 'model',
    owned_by: 'amazon',
    name: 'Nova Micro',
    description:
      'A text-only model that delivers the lowest latency responses at very low cost.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.000000035',
      output: '0.00000014',
    },
  },
  {
    id: 'amazon/nova-pro',
    object: 'model',
    owned_by: 'amazon',
    name: 'Nova Pro',
    description:
      'A highly capable multimodal model with the best combination of accuracy, speed, and cost for a wide range of tasks.',
    context_window: 300000,
    max_tokens: 4096,
    pricing: {
      input: '0.0000008',
      output: '0.0000032',
    },
  },
  {
    id: 'anthropic/claude-3-haiku',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 3 Haiku',
    description:
      "Claude 3 Haiku is Anthropic's fastest model yet, designed for enterprise workloads which often involve longer prompts. Haiku to quickly analyze large volumes of documents, such as quarterly filings, contracts, or legal cases, for half the cost of other models in its performance tier.",
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.00000025',
      output: '0.00000125',
    },
  },
  {
    id: 'anthropic/claude-3-opus',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 3 Opus',
    description:
      "Claude 3 Opus is Anthropic's most intelligent model, with best-in-market performance on highly complex tasks. It can navigate open-ended prompts and sight-unseen scenarios with remarkable fluency and human-like understanding. Opus shows us the outer limits of what's possible with generative AI.",
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.000015',
      output: '0.000075',
    },
  },
  {
    id: 'anthropic/claude-3.5-haiku',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 3.5 Haiku',
    description:
      'Claude 3.5 Haiku is the next generation of our fastest model. For a similar speed to Claude 3 Haiku, Claude 3.5 Haiku improves across every skill set and surpasses Claude 3 Opus, the largest model in our previous generation, on many intelligence benchmarks.',
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000008',
      output: '0.000004',
    },
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 3.5 Sonnet',
    description:
      'Claude 3.5 Sonnet strikes the ideal balance between intelligence and speed—particularly for enterprise workloads. It delivers strong performance at a lower cost compared to its peers, and is engineered for high endurance in large-scale AI deployments.',
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'anthropic/claude-3.7-sonnet',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 3.7 Sonnet',
    description:
      "Claude 3.7 Sonnet is the first hybrid reasoning model and Anthropic's most intelligent model to date. It delivers state-of-the-art performance for coding, content generation, data analysis, and planning tasks, building upon its predecessor Claude 3.5 Sonnet's capabilities in software engineering and computer use.",
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'anthropic/claude-4-opus',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 4 Opus',
    description:
      "Claude Opus 4 is Anthropic's most powerful model yet and the best coding model in the world, leading on SWE-bench (72.5%) and Terminal-bench (43.2%). It delivers sustained performance on long-running tasks that require focused effort and thousands of steps, with the ability to work continuously for several hours—dramatically outperforming all Sonnet models and significantly expanding what AI agents can accomplish.",
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.000015',
      output: '0.000075',
    },
  },
  {
    id: 'anthropic/claude-4-sonnet',
    object: 'model',
    owned_by: 'anthropic',
    name: 'Claude 4 Sonnet',
    description:
      "Claude Sonnet 4 significantly improves on Sonnet 3.7's industry-leading capabilities, excelling in coding with a state-of-the-art 72.7% on SWE-bench. The model balances performance and efficiency for internal and external use cases, with enhanced steerability for greater control over implementations. While not matching Opus 4 in most domains, it delivers an optimal mix of capability and practicality.",
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'cohere/command-a',
    object: 'model',
    owned_by: 'cohere',
    name: 'Command A',
    description:
      "Command A is Cohere's most performant model to date, excelling at tool use, agents, retrieval augmented generation (RAG), and multilingual use cases. Command A has a context length of 256K, only requires two GPUs to run, and has 150% higher throughput compared to Command R+ 08-2024.",
    context_window: 256000,
    max_tokens: 4000,
    pricing: {
      input: '0.0000025',
      output: '0.00001',
    },
  },
  {
    id: 'cohere/command-r',
    object: 'model',
    owned_by: 'cohere',
    name: 'Command R',
    description:
      'Command R is a large language model optimized for conversational interaction and long context tasks. It targets the "scalable" category of models that balance high performance with strong accuracy, enabling companies to move beyond proof of concept and into production.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.00000015',
      output: '0.0000006',
    },
  },
  {
    id: 'cohere/command-r-plus',
    object: 'model',
    owned_by: 'cohere',
    name: 'Command R+',
    description:
      "Command R+ is Cohere's newest large language model, optimized for conversational interaction and long-context tasks. It aims at being extremely performant, enabling companies to move beyond proof of concept and into production.",
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000025',
      output: '0.00001',
    },
  },
  {
    id: 'deepseek/deepseek-r1',
    object: 'model',
    owned_by: 'deepseek',
    name: 'DeepSeek-R1',
    description:
      'The DeepSeek R1 model has undergone a minor version upgrade, with the current version being DeepSeek-R1-0528. In the latest update, DeepSeek R1 has significantly improved its depth of reasoning and inference capabilities by leveraging increased computational resources and introducing algorithmic optimization mechanisms during post-training. The model has demonstrated outstanding performance across various benchmark evaluations, including mathematics, programming, and general logic. Its overall performance is now approaching that of leading models, such as O3 and Gemini 2.5 Pro.',
    context_window: 64000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000055',
      output: '0.00000219',
    },
  },
  {
    id: 'deepseek/deepseek-r1-distill-llama-70b',
    object: 'model',
    owned_by: 'deepseek',
    name: 'DeepSeek R1 Distill Llama 70B',
    description:
      'DeepSeek-R1-Distill-Llama-70B is a distilled, more efficient variant of the 70B Llama model. It preserves strong performance across text-generation tasks, reducing computational overhead for easier deployment and research. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.',
    context_window: 131072,
    max_tokens: 4096,
    pricing: {
      input: '0.00000075',
      output: '0.00000099',
    },
  },
  {
    id: 'deepseek/deepseek-v3',
    object: 'model',
    owned_by: 'deepseek',
    name: 'DeepSeek-V3',
    description:
      "DeepSeek-V3 is an open-source large language model that builds upon LLaMA (Meta's foundational language model) to enable versatile functionalities such as text generation, code completion, and more, served by Fireworks AI.",
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000009',
      output: '0.0000009',
    },
  },
  {
    id: 'google/gemini-2.0-flash',
    object: 'model',
    owned_by: 'google',
    name: 'Gemini 2.0 Flash',
    description:
      'Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.',
    context_window: 1048576,
    max_tokens: 4096,
    pricing: {
      input: '0.00000015',
      output: '0.0000006',
    },
  },
  {
    id: 'google/gemini-2.0-flash-lite',
    object: 'model',
    owned_by: 'google',
    name: 'Gemini 2.0 Flash Lite',
    description:
      'Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.',
    context_window: 1048576,
    max_tokens: 4096,
    pricing: {
      input: '0.000000075',
      output: '0.0000003',
    },
  },
  {
    id: 'google/gemini-2.5-flash',
    object: 'model',
    owned_by: 'google',
    name: 'Gemini 2.5 Flash',
    description:
      'Gemini 2.5 Flash is a thinking model that offers great, well-rounded capabilities. It is designed to offer a balance between price and performance with multimodal support and a 1M token context window.',
    context_window: 1000000,
    max_tokens: 4096,
    pricing: {
      input: '0.0000003',
      output: '0.0000025',
    },
  },
  {
    id: 'google/gemini-2.5-pro',
    object: 'model',
    owned_by: 'google',
    name: 'Gemini 2.5 Pro',
    description:
      'Gemini 2.5 Pro is our most advanced reasoning Gemini model, capable of solving complex problems. It features a 2M token context window and supports multimodal inputs including text, images, audio, video, and PDF documents.',
    context_window: 1048576,
    max_tokens: 4096,
    pricing: {
      input: '0.0000025',
      output: '0.00001',
    },
  },
  {
    id: 'google/gemma-2-9b',
    object: 'model',
    owned_by: 'google',
    name: 'Gemma 2 9B IT',
    description:
      '9 billion parameter open source model by Google fine-tuned for chat purposes. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.',
    context_window: 8192,
    max_tokens: 1000,
    pricing: {
      input: '0.0000002',
      output: '0.0000002',
    },
  },
  {
    id: 'inception/mercury-coder-small',
    object: 'model',
    owned_by: 'inception',
    name: 'Mercury Coder Small Beta',
    description:
      'Mercury Coder Small is ideal for code generation, debugging, and refactoring tasks with minimal latency.',
    context_window: 32000,
    max_tokens: 8192,
    pricing: {
      input: '0.00000025',
      output: '0.000001',
    },
  },
  {
    id: 'meta/llama-3-70b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3 70B Instruct',
    description:
      'Llama is a 70 billion parameter open source model by Meta fine-tuned for instruction following purposes. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.',
    context_window: 8192,
    max_tokens: 1000,
    pricing: {
      input: '0.00000059',
      output: '0.00000079',
    },
  },
  {
    id: 'meta/llama-3-8b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3 8B Instruct',
    description:
      'Llama is a 8 billion parameter open source model by Meta fine-tuned for instruction following purposes. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.',
    context_window: 8192,
    max_tokens: 1000,
    pricing: {
      input: '0.00000005',
      output: '0.00000008',
    },
  },
  {
    id: 'meta/llama-3.1-70b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.1 70B Instruct',
    description:
      'An update to Meta Llama 3 70B Instruct that includes an expanded 128K context length, multilinguality and improved reasoning capabilities.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000072',
      output: '0.00000072',
    },
  },
  {
    id: 'meta/llama-3.1-8b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.1 8B Instruct',
    description:
      'Llama 3.1 8B with 128K context window support, making it ideal for real-time conversational interfaces and data analysis while offering significant cost savings compared to larger models. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.',
    context_window: 128000,
    max_tokens: 4000,
    pricing: {
      input: '0.00000005',
      output: '0.00000008',
    },
  },
  {
    id: 'meta/llama-3.2-11b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.2 11B Vision Instruct',
    description:
      'Instruction-tuned image reasoning generative model (text + images in / text out) optimized for visual recognition, image reasoning, captioning and answering general questions about the image.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000016',
      output: '0.00000016',
    },
  },
  {
    id: 'meta/llama-3.2-1b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.2 1B Instruct',
    description:
      'Text-only model, supporting on-device use cases such as multilingual local knowledge retrieval, summarization, and rewriting.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.0000001',
      output: '0.0000001',
    },
  },
  {
    id: 'meta/llama-3.2-3b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.2 3B Instruct',
    description:
      'Text-only model, fine-tuned for supporting on-device use cases such as multilingual local knowledge retrieval, summarization, and rewriting.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000015',
      output: '0.00000015',
    },
  },
  {
    id: 'meta/llama-3.2-90b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.2 90B Vision Instruct',
    description:
      'Instruction-tuned image reasoning generative model (text + images in / text out) optimized for visual recognition, image reasoning, captioning and answering general questions about the image.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000072',
      output: '0.00000072',
    },
  },
  {
    id: 'meta/llama-3.3-70b',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 3.3 70B Instruct',
    description:
      'Where performance meets efficiency. This model supports high-performance conversational AI designed for content creation, enterprise applications, and research, offering advanced language understanding capabilities, including text summarization, classification, sentiment analysis, and code generation.',
    context_window: 128000,
    max_tokens: 4096,
    pricing: {
      input: '0.00000072',
      output: '0.00000072',
    },
  },
  {
    id: 'meta/llama-4-maverick',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 4 Maverick 17B Instruct',
    description:
      'The Llama 4 collection of models are natively multimodal AI models that enable text and multimodal experiences. These models leverage a mixture-of-experts architecture to offer industry-leading performance in text and image understanding. Llama 4 Maverick, a 17 billion parameter model with 128 experts. Served by DeepInfra.',
    context_window: 131072,
    max_tokens: 4096,
    pricing: {
      input: '0.0000002',
      output: '0.0000006',
    },
  },
  {
    id: 'meta/llama-4-scout',
    object: 'model',
    owned_by: 'meta',
    name: 'Llama 4 Scout 17B Instruct',
    description:
      'The Llama 4 collection of models are natively multimodal AI models that enable text and multimodal experiences. These models leverage a mixture-of-experts architecture to offer industry-leading performance in text and image understanding. Llama 4 Scout, a 17 billion parameter model with 16 experts. Served by DeepInfra.',
    context_window: 131072,
    max_tokens: 4096,
    pricing: {
      input: '0.0000001',
      output: '0.0000003',
    },
  },
  {
    id: 'mistral/codestral',
    object: 'model',
    owned_by: 'mistral',
    name: 'Mistral Codestral 25.01',
    description:
      'Mistral Codestral 25.01 is a state-of-the-art coding model optimized for low-latency, high-frequency use cases. Proficient in over 80 programming languages, it excels at tasks like fill-in-the-middle (FIM), code correction, and test generation.',
    context_window: 256000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000003',
      output: '0.0000009',
    },
  },
  {
    id: 'mistral/magistral-medium',
    object: 'model',
    owned_by: 'mistral',
    name: 'Magistral Medium 2506',
    description:
      'Complex thinking, backed by deep understanding, with transparent reasoning you can follow and verify. The model excels in maintaining high-fidelity reasoning across numerous languages, even when switching between languages mid-task.',
    context_window: 128000,
    max_tokens: 32768,
    pricing: {
      input: '0.000002',
      output: '0.000005',
    },
  },
  {
    id: 'mistral/magistral-small',
    object: 'model',
    owned_by: 'mistral',
    name: 'Magistral Small 2506',
    description:
      'Complex thinking, backed by deep understanding, with transparent reasoning you can follow and verify. The model excels in maintaining high-fidelity reasoning across numerous languages, even when switching between languages mid-task.',
    context_window: 128000,
    max_tokens: 32768,
    pricing: {
      input: '0.0000005',
      output: '0.0000015',
    },
  },
  {
    id: 'mistral/ministral-3b',
    object: 'model',
    owned_by: 'mistral',
    name: 'Ministral 3B',
    description:
      'A compact, efficient model for on-device tasks like smart assistants and local analytics, offering low-latency performance.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.00000004',
      output: '0.00000004',
    },
  },
  {
    id: 'mistral/ministral-8b',
    object: 'model',
    owned_by: 'mistral',
    name: 'Ministral 8B',
    description:
      'A more powerful model with faster, memory-efficient inference, ideal for complex workflows and demanding edge applications.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000001',
      output: '0.0000001',
    },
  },
  {
    id: 'mistral/mistral-large',
    object: 'model',
    owned_by: 'mistral',
    name: 'Mistral Large',
    description:
      'Mistral Large is ideal for complex tasks that require large reasoning capabilities or are highly specialized - like Synthetic Text Generation, Code Generation, RAG, or Agents.',
    context_window: 32000,
    max_tokens: 1024,
    pricing: {
      input: '0.000002',
      output: '0.000006',
    },
  },
  {
    id: 'mistral/mistral-saba-24b',
    object: 'model',
    owned_by: 'mistral',
    name: 'Mistral Saba 24B',
    description:
      'Mistral Saba 24B is a 24 billion parameter open source model by Mistral.ai. Saba is a specialized model trained to excel in Arabic, Farsi, Urdu, Hebrew, and Indic languages. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.',
    context_window: 32768,
    max_tokens: 16384,
    pricing: {
      input: '0.00000079',
      output: '0.00000079',
    },
  },
  {
    id: 'mistral/mistral-small',
    object: 'model',
    owned_by: 'mistral',
    name: 'Mistral Small',
    description:
      'Mistral Small is the ideal choice for simple tasks that one can do in bulk - like Classification, Customer Support, or Text Generation. It offers excellent performance at an affordable price point.',
    context_window: 32000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000001',
      output: '0.0000003',
    },
  },
  {
    id: 'mistral/mixtral-8x22b-instruct',
    object: 'model',
    owned_by: 'mistral',
    name: 'Mixtral MoE 8x22B Instruct',
    description:
      '8x22b Instruct model. 8x22b is mixture-of-experts open source model by Mistral served by Fireworks.',
    context_window: 2048,
    max_tokens: 256,
    pricing: {
      input: '0.0000012',
      output: '0.0000012',
    },
  },
  {
    id: 'mistral/pixtral-12b',
    object: 'model',
    owned_by: 'mistral',
    name: 'Pixtral 12B 2409',
    description:
      'A 12B model with image understanding capabilities in addition to text.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.00000015',
      output: '0.00000015',
    },
  },
  {
    id: 'mistral/pixtral-large',
    object: 'model',
    owned_by: 'mistral',
    name: 'Pixtral Large',
    description:
      'Pixtral Large is the second model in our multimodal family and demonstrates frontier-level image understanding. Particularly, the model is able to understand documents, charts and natural images, while maintaining the leading text-only understanding of Mistral Large 2.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.000002',
      output: '0.000006',
    },
  },
  {
    id: 'moonshotai/kimi-k2',
    object: 'model',
    owned_by: 'moonshotai',
    name: 'Kimi K2',
    description:
      'Kimi K2 is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for agentic capabilities, including advanced tool use, reasoning, and code synthesis. Kimi K2 excels across a broad range of benchmarks, particularly in coding (LiveCodeBench, SWE-bench), reasoning (ZebraLogic, GPQA), and tool-use (Tau2, AceBench) tasks.',
    context_window: 131072,
    max_tokens: 8192,
    pricing: {
      input: '0.00000055',
      output: '0.0000022',
    },
  },
  {
    id: 'morph/morph-v3-fast',
    object: 'model',
    owned_by: 'morph',
    name: 'Morph V3 Fast',
    description:
      'Morph offers a specialized AI model that applies code changes suggested by frontier models (like Claude or GPT-4o) to your existing code files FAST - 4500+ tokens/second. It acts as the final step in the AI coding workflow. Supports 16k input tokens and 16k output tokens.',
    context_window: 32768,
    max_tokens: 4096,
    pricing: {
      input: '0.0000008',
      output: '0.0000012',
    },
  },
  {
    id: 'morph/morph-v3-large',
    object: 'model',
    owned_by: 'morph',
    name: 'Morph V3 Large',
    description:
      'Morph offers a specialized AI model that applies code changes suggested by frontier models (like Claude or GPT-4o) to your existing code files FAST - 2500+ tokens/second. It acts as the final step in the AI coding workflow. Supports 16k input tokens and 16k output tokens.',
    context_window: 32768,
    max_tokens: 4096,
    pricing: {
      input: '0.0000009',
      output: '0.0000019',
    },
  },
  {
    id: 'openai/gpt-3.5-turbo',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-3.5 Turbo',
    description:
      "OpenAI's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    context_window: 4096,
    max_tokens: 500,
    pricing: {
      input: '0.0000005',
      output: '0.0000015',
    },
  },
  {
    id: 'openai/gpt-3.5-turbo-instruct',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-3.5 Turbo Instruct',
    description:
      'Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.',
    context_window: 4096,
    max_tokens: 200,
    pricing: {
      input: '0.0000015',
      output: '0.000002',
    },
  },
  {
    id: 'openai/gpt-4-turbo',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-4 Turbo',
    description:
      'gpt-4-turbo from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It has a knowledge cutoff of April 2023 and a 128,000 token context window.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.00001',
      output: '0.00003',
    },
  },
  {
    id: 'openai/gpt-4.1',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-4.1',
    description:
      "GPT 4.1 is OpenAI's flagship model for complex tasks. It is well suited for problem solving across domains.",
    context_window: 1047576,
    max_tokens: 8192,
    pricing: {
      input: '0.000002',
      output: '0.000008',
    },
  },
  {
    id: 'openai/gpt-4.1-mini',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-4.1 mini',
    description:
      'GPT 4.1 mini provides a balance between intelligence, speed, and cost that makes it an attractive model for many use cases.',
    context_window: 1047576,
    max_tokens: 8192,
    pricing: {
      input: '0.0000004',
      output: '0.0000016',
    },
  },
  {
    id: 'openai/gpt-4.1-nano',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-4.1 nano',
    description:
      'GPT-4.1 nano is the fastest, most cost-effective GPT 4.1 model.',
    context_window: 1047576,
    max_tokens: 8192,
    pricing: {
      input: '0.0000001',
      output: '0.0000004',
    },
  },
  {
    id: 'openai/gpt-4o',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-4o',
    description:
      'GPT-4o from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It matches GPT-4 Turbo performance with a faster and cheaper API.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.0000025',
      output: '0.00001',
    },
  },
  {
    id: 'openai/gpt-4o-mini',
    object: 'model',
    owned_by: 'openai',
    name: 'GPT-4o mini',
    description:
      'GPT-4o mini from OpenAI is their most advanced and cost-efficient small model. It is multi-modal (accepting text or image inputs and outputting text) and has higher intelligence than gpt-3.5-turbo but is just as fast.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.00000015',
      output: '0.0000006',
    },
  },
  {
    id: 'openai/o1',
    object: 'model',
    owned_by: 'openai',
    name: 'o1',
    description:
      "o1 is OpenAI's flagship reasoning model, designed for complex problems that require deep thinking. It provides strong reasoning capabilities with improved accuracy for complex multi-step tasks.",
    context_window: 200000,
    max_tokens: 4096,
    pricing: {
      input: '0.000015',
      output: '0.00006',
    },
  },
  {
    id: 'openai/o3',
    object: 'model',
    owned_by: 'openai',
    name: 'o3',
    description:
      "OpenAI's o3 is their most powerful reasoning model, setting new state-of-the-art benchmarks in coding, math, science, and visual perception. It excels at complex queries requiring multi-faceted analysis, with particular strength in analyzing images, charts, and graphics.",
    context_window: 200000,
    max_tokens: 16384,
    pricing: {
      input: '0.000002',
      output: '0.000008',
    },
  },
  {
    id: 'openai/o3-mini',
    object: 'model',
    owned_by: 'openai',
    name: 'o3-mini',
    description:
      "o3-mini is OpenAI's most recent small reasoning model, providing high intelligence at the same cost and latency targets of o1-mini.",
    context_window: 200000,
    max_tokens: 4096,
    pricing: {
      input: '0.0000011',
      output: '0.0000044',
    },
  },
  {
    id: 'openai/o4-mini',
    object: 'model',
    owned_by: 'openai',
    name: 'o4-mini',
    description:
      "OpenAI's o4-mini delivers fast, cost-efficient reasoning with exceptional performance for its size, particularly excelling in math (best-performing on AIME benchmarks), coding, and visual tasks.",
    context_window: 200000,
    max_tokens: 16384,
    pricing: {
      input: '0.0000011',
      output: '0.0000044',
    },
  },
  {
    id: 'perplexity/sonar',
    object: 'model',
    owned_by: 'perplexity',
    name: 'Sonar',
    description:
      "Perplexity's lightweight offering with search grounding, quicker and cheaper than Sonar Pro.",
    context_window: 127000,
    max_tokens: 1024,
    pricing: {
      input: '0.000001',
      output: '0.000001',
    },
  },
  {
    id: 'perplexity/sonar-pro',
    object: 'model',
    owned_by: 'perplexity',
    name: 'Sonar Pro',
    description:
      "Perplexity's premier offering with search grounding, supporting advanced queries and follow-ups.",
    context_window: 200000,
    max_tokens: 1024,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'perplexity/sonar-reasoning',
    object: 'model',
    owned_by: 'perplexity',
    name: 'Sonar Reasoning',
    description:
      'A reasoning-focused model that outputs Chain of Thought (CoT) in responses, providing detailed explanations with search grounding.',
    context_window: 127000,
    max_tokens: 1024,
    pricing: {
      input: '0.000001',
      output: '0.000005',
    },
  },
  {
    id: 'perplexity/sonar-reasoning-pro',
    object: 'model',
    owned_by: 'perplexity',
    name: 'Sonar Reasoning Pro',
    description:
      'A premium reasoning-focused model that outputs Chain of Thought (CoT) in responses, providing comprehensive explanations with enhanced search capabilities and multiple search queries per request.',
    context_window: 127000,
    max_tokens: 1024,
    pricing: {
      input: '0.000002',
      output: '0.000008',
    },
  },
  {
    id: 'vercel/v0-1.0-md',
    object: 'model',
    owned_by: 'vercel',
    name: 'v0-1.0-md',
    description:
      'Access the model behind v0 to generate, fix, and optimize modern web apps with framework-specific reasoning and up-to-date knowledge.',
    context_window: 128000,
    max_tokens: 1024,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'vercel/v0-1.5-md',
    object: 'model',
    owned_by: 'vercel',
    name: 'v0-1.5-md',
    description:
      'Access the model behind v0 to generate, fix, and optimize modern web apps with framework-specific reasoning and up-to-date knowledge.',
    context_window: 128000,
    max_tokens: 8192,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'xai/grok-2',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 2',
    description:
      'Grok 2 is a frontier language model with state-of-the-art reasoning capabilities. It features advanced capabilities in chat, coding, and reasoning, outperforming both Claude 3.5 Sonnet and GPT-4-Turbo on the LMSYS leaderboard.',
    context_window: 131072,
    max_tokens: 1024,
    pricing: {
      input: '0.000002',
      output: '0.00001',
    },
  },
  {
    id: 'xai/grok-2-vision',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 2 Vision',
    description:
      'Grok 2 vision model excels in vision-based tasks, delivering state-of-the-art performance in visual math reasoning (MathVista) and document-based question answering (DocVQA). It can process a wide variety of visual information including documents, diagrams, charts, screenshots, and photographs.',
    context_window: 32768,
    max_tokens: 1024,
    pricing: {
      input: '0.000002',
      output: '0.00001',
    },
  },
  {
    id: 'xai/grok-3',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 3 Beta',
    description:
      "xAI's flagship model that excels at enterprise use cases like data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science.",
    context_window: 131072,
    max_tokens: 8192,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
  {
    id: 'xai/grok-3-fast',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 3 Fast Beta',
    description:
      "xAI's flagship model that excels at enterprise use cases like data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science. The fast model variant is served on faster infrastructure, offering response times that are significantly faster than the standard. The increased speed comes at a higher cost per output token.",
    context_window: 131072,
    max_tokens: 8192,
    pricing: {
      input: '0.000005',
      output: '0.000025',
    },
  },
  {
    id: 'xai/grok-3-mini',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 3 Mini Beta',
    description:
      "xAI's lightweight model that thinks before responding. Great for simple or logic-based tasks that do not require deep domain knowledge. The raw thinking traces are accessible.",
    context_window: 131072,
    max_tokens: 8192,
    pricing: {
      input: '0.0000003',
      output: '0.0000005',
    },
  },
  {
    id: 'xai/grok-3-mini-fast',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 3 Mini Fast Beta',
    description:
      "xAI's lightweight model that thinks before responding. Great for simple or logic-based tasks that do not require deep domain knowledge. The raw thinking traces are accessible. The fast model variant is served on faster infrastructure, offering response times that are significantly faster than the standard. The increased speed comes at a higher cost per output token.",
    context_window: 131072,
    max_tokens: 8192,
    pricing: {
      input: '0.0000006',
      output: '0.000004',
    },
  },
  {
    id: 'xai/grok-4',
    object: 'model',
    owned_by: 'xai',
    name: 'Grok 4',
    description:
      "xAI's latest and greatest flagship model, offering unparalleled performance in natural language, math and reasoning - the perfect jack of all trades.",
    context_window: 256000,
    max_tokens: 8192,
    pricing: {
      input: '0.000003',
      output: '0.000015',
    },
  },
];
