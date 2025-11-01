import { config } from 'dotenv';
config();

import '@/ai/flows/handle-inappropriate-language.ts';
import '@/ai/flows/explain-mood-with-context.ts';