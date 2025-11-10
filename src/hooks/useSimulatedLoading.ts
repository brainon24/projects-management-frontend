import { useState, useCallback } from 'react';

interface UseSimulatedLoadingOptions {
  enabled?: boolean;
  delay?: number;
}

export const useSimulatedLoading = (options: UseSimulatedLoadingOptions = {}) => {
  const { enabled = true, delay = 2000 } = options; // Cambiar a false para desactivar
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleLoadStart = useCallback((key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
  }, []);

  const handleLoadEnd = useCallback((key: string) => {
    if (enabled) {
      // Simular delay solo en desarrollo
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [key]: false }));
      }, delay);
    } else {
      // En producción, sin delay
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  }, [enabled, delay]);

  return {
    loadingStates,
    handleLoadStart,
    handleLoadEnd,
    isLoading: (key: string) => loadingStates[key] || false
  };
};