import { toastService } from "../services/toast.service";

// Function to handle API calls with toast notifications
export const handleApiCall = async (
  apiCall: () => Promise<any>,
  successMessage: string,
  loadingMessage: string,
  updateState: (response: any) => void
) => {
  toastService.showToast(loadingMessage, "loading", {
    position: "top-center",
  });
  try {
    const response = await apiCall();
    updateState(response);
    toastService.showToast(successMessage, "success", {
      position: "top-center",
    });
  } catch (error) {
    toastService.showToast("Operation failed", "error", {
      position: "top-center",
    });
    console.error("API call failed", error);
  } finally {
    toastService.dismissToast();
  }
};
