/**
 * Content schema — app-design.md §8.2
 */

export type VisualType =
  | 'overview'
  | 'compass'
  | 'layered_cards'
  | 'drill_deck'
  | 'calm_chamber'
  | 'loop_diagram'
  | 'compare_prompts'
  | 'ascent_path';

export type SourceBlock =
  | 'strategist_os_intro'
  | 'I_intent'
  | 'II_structured'
  | 'III_questioning'
  | 'IV_mindset'
  | 'V_convergence'
  | 'VI_prompting'
  | 'VII_final_teaching'
  | 'evolution'
  | 'next_steps_offer';

export interface QuoteBlock {
  text: string;
}

export interface LayerCard {
  title: string;
  bullets: string[];
}

export interface LoopStep {
  step: number;
  title: string;
  subtitle?: string;
  bullets: string[];
}

export interface QuestionType {
  id: string;
  title: string;
  quote: string;
}

export interface ExampleBlock {
  label: string;
  content: string;
}

export interface ContentModule {
  module_id: string;
  title: string;
  subtitle?: string;
  source_block: SourceBlock;
  visual_type: VisualType;
  /** Verbatim excerpt for Reference / audits */
  source_excerpt: string;
  body: string[];
  quotes?: QuoteBlock[];
  layers?: LayerCard[];
  loop_steps?: LoopStep[];
  question_types?: QuestionType[];
  comparisons?: {
    weak_label: string;
    weak: string;
    strong_label: string;
    strong: string;
  };
  examples?: ExampleBlock[];
  training_checklist?: string[];
  traits?: string[];
  weak_strong_examples?: { weak: string; strong: string };
  reflection_prompt?: string;
}

export const SATELLITE_MODULE_ORDER = [
  'intent',
  'structured',
  'questioning',
  'mindset',
  'convergence',
  'prompting',
  'evolution',
] as const;
