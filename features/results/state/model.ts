export interface Result {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  file: string;
  createdAt: number;
  createdBy: string | null;
  createdByName: string | null;
  updatedAt: number | null;
  sentForClient: boolean;
  sentForClientAt: number | null;
  readByClient: boolean;
  readByClientAt: number | null;
  archive: boolean;
  archiveAt: number | null;
  archiveBy: string | null;
  archiveByName: string | null;
  sending?: boolean;
}

export const defultValueOnCreate: Partial<Result> = {
  createdAt: Date.now(),
  updatedAt: null,
  sentForClient: false,
  sentForClientAt: null,
  readByClient: false,
  readByClientAt: null,
  archive: false,
  archiveAt: null,
  archiveBy: null,
};

export function checkFileIsPdf(file: File): boolean {
  return file.type === "application/pdf";
}
