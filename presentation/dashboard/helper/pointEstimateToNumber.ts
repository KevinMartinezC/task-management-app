import { useCallback } from "react";

export const usePointEstimateToNumber = () => {
  return useCallback((estimate: string): string => {
    switch (estimate) {
      case "ONE":
        return "1";
      case "TWO":
        return "2";
      case "THREE":
        return "3";
      case "FOUR":
        return "4";
      case "FIVE":
        return "5";
      case "EIGHT":
        return "8";
      default:
        return "0";
    }
  }, []);
};
