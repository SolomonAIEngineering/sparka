import Exa from 'exa-js';
import type { StreamWriter } from '../../types';

export type AcademicSearchResult = {
  source: 'academic';
  title: string;
  url: string;
  content: string;
};

export type AcademicSearchResponse = {
  results: AcademicSearchResult[];
  error?: string;
};

const exa = new Exa(process.env.EXA_API_KEY as string);

export async function academicSearchStep({
  query,
  maxResults,
  dataStream,
  stepId,
  annotate = true,
}: {
  query: string;
  maxResults: number;
  dataStream: StreamWriter;
  stepId: string;
  annotate?: boolean;
}): Promise<AcademicSearchResponse> {
  try {
    // Send running annotation
    if (annotate) {
      dataStream.write({
        type: 'data-researchUpdate',
        data: {
          id: stepId,
          type: 'web',
          status: 'running',
          title: `Searching academic papers for "${query}"`,
          query,
          subqueries: [query],
          message: `Searching academic sources...`,
          timestamp: Date.now(),
        },
      });
    }
    const academicResults = await exa.searchAndContents(query, {
      type: 'auto',
      numResults: maxResults,
      category: 'research paper',
      summary: true,
    });

    const results = academicResults.results.map((r) => ({
      source: 'academic' as const,
      title: r.title || '',
      url: r.url || '',
      content: r.summary || '',
    }));

    // Send completed annotation
    if (annotate) {
      dataStream.write({
        type: 'data-researchUpdate',
        data: {
          id: stepId,
          type: 'web',
          status: 'completed',
          title: `Searched academic papers for "${query}"`,
          query,
          subqueries: [query],
          results,
          message: `Found ${results.length} results`,
          timestamp: Date.now(),
          overwrite: true,
        },
      });
    }

    return { results };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    // Send error annotation
    if (annotate) {
      dataStream.write({
        type: 'data-researchUpdate',
        data: {
          id: stepId,
          type: 'web',
          status: 'completed',
          title: `Error searching academic papers for "${query}"`,
          query,
          subqueries: [query],
          message: `Error: ${errorMessage}`,
          timestamp: Date.now(),
          overwrite: true,
        },
      });
    }

    return { results: [], error: errorMessage };
  }
}
