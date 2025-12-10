const target_tauri = true;

export const DEST_API = target_tauri ? "https://192.168.1.100:8001/api" : "/api";
export const DEST_ROOT = target_tauri ? "/" : "/dia-frontend";
