'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultSimulationSettings, resolveSimulationSettings } from '@/lib/simulationConfig';

const SimulationConfigContext = createContext(defaultSimulationSettings);

export function SimulationConfigProvider({ children }) {
  const [settings, setSettings] = useState(defaultSimulationSettings);

  useEffect(() => {
    let active = true;
    fetch('/api/site-config', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active && data?.settings) setSettings(resolveSimulationSettings(data.settings));
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return <SimulationConfigContext.Provider value={settings}>{children}</SimulationConfigContext.Provider>;
}

export function useSimulationConfig() {
  return useContext(SimulationConfigContext);
}
