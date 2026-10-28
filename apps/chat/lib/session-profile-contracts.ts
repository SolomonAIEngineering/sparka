import type { authenticateEveGateway } from "./eve/gateway-auth";
import type { resolveEveModel } from "./eve/model-selection";

/** A non-account session owns its authentication, model bounds and instructions together. */
export interface SessionProfile {
  readonly authenticator: string;
  readonly authenticate: typeof authenticateEveGateway;
  readonly resolveModel: typeof resolveEveModel;
  readonly instructions: string;
}
