export interface RegistryResponse {
  response: {
    ok: boolean;
    status: number;
    statusText: string;
  };
  body?: {
    name: string;
    latest_version: string;
  };
}

export function defaultRegistryResponse(): RegistryResponse {
  return {
    response: {
      ok: false,
      status: 0,
      statusText: "",
    },
  };
}
