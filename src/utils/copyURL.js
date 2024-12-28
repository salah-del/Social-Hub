import { showToast } from "./showToast";

export const copyURL = (url) => { 
    if (url) {
        navigator.clipboard.writeText(url)
        .then(() => {
            showToast('success', 'URL copied successfully');
        })
        .catch(() => {
            showToast( "error", "Failed to copy URL");
        });
    }
}