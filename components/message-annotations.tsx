import { ReasonSearchResearchProgress } from './reason-search-research-progress';
import type { WebSearchUpdate } from '@/lib/ai/tools/research-updates-schema';
import { Sources } from './sources';
import type { ChatMessage } from '@/lib/ai/types';

export const SourcesAnnotations = ({
  parts,
}: { parts?: ChatMessage['parts'] }) => {
  if (!parts) return null;

  const researchUpdates = parts
    .filter((part) => part.type === 'data-researchUpdate')
    .map((u) => u.data);

  if (researchUpdates.length === 0) return null;

  const researchCompleted = researchUpdates.find(
    (u) => u.type === 'progress' && u.status === 'completed',
  );

  if (!researchCompleted) return null;

  const webSearchUpdates = researchUpdates
    .filter<WebSearchUpdate>((u) => u.type === 'web')
    .filter((u) => u.results)
    .flatMap((u) => u.results)
    .filter((u) => u !== undefined);

  const deduppedSources = webSearchUpdates.filter(
    (source, index, self) =>
      index === self.findIndex((t) => t.url === source.url),
  );

  return <Sources sources={deduppedSources} />;
};

export const ResearchUpdateAnnotations = ({
  parts,
}: { parts?: ChatMessage['parts'] }) => {
  if (!parts) return null;

  const researchUpdates = parts
    .filter((part) => part.type === 'data-researchUpdate')
    .map((u) => u.data);

  console.log('researchUpdates', researchUpdates);
  if (researchUpdates.length === 0) return null;

  return <ReasonSearchResearchProgress updates={researchUpdates} />;
};
