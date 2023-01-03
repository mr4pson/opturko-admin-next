export function getImageUrl(fileName: string): string {
  return `/api/attachments/${fileName}`;
}
