const target_tauri = false;
const target_gh_pages = false;

export const DEST_API =
  target_tauri || target_gh_pages ? "https://192.168.1.100:8001/api" : "/api";
export const DEST_ROOT = target_tauri ? "/" : "/dia-frontend";
