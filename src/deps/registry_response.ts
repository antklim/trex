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

export const defaultRegistryResponse = (): RegistryResponse => ({
  response: {
    ok: false,
    status: 0,
    statusText: "",
  },
});
