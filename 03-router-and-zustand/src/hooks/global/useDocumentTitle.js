const APP_NAME = 'DevJobs';

export function useDocumentTitle(title) {
  document.title = title
    ? title
    : APP_NAME;
}
