import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { resources, type Resource } from '@/data/core-data';

export type CoreProfile = {
  name: string;
  region: string;
  purpose: string;
  notes: string;
};

const STORAGE_KEY = 'project-core-state-v1';
const defaultProfile: CoreProfile = {
  name: 'My CORE',
  region: 'Unspecified region',
  purpose: 'A dependable offline reference for the people and places I care about.',
  notes: '',
};

type PersistedState = {
  selectedIds: string[];
  profile: CoreProfile;
};

type CoreStore = PersistedState & {
  selectedResources: Resource[];
  toggleResource: (id: string) => void;
  addMany: (ids: string[]) => void;
  removeResource: (id: string) => void;
  updateProfile: (profile: CoreProfile) => void;
  importState: (incoming: unknown) => void;
  reset: () => void;
  isReady: boolean;
};

function readState(): PersistedState {
  if (typeof window === 'undefined') return { selectedIds: [], profile: defaultProfile };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '');
    return {
      selectedIds: Array.isArray(parsed.selectedIds) ? parsed.selectedIds : [],
      profile: { ...defaultProfile, ...(parsed.profile || {}) },
    };
  } catch {
    return { selectedIds: [], profile: defaultProfile };
  }
}

const CoreContext = createContext<CoreStore | null>(null);

function useCoreStoreState(): CoreStore {
  const [state, setState] = useState<PersistedState>(readState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setIsReady(true);
  }, [state]);

  const selectedResources = useMemo(
    () => state.selectedIds.map((id) => resources.find((resource) => resource.id === id)).filter(Boolean) as Resource[],
    [state.selectedIds],
  );

  const toggleResource = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      selectedIds: current.selectedIds.includes(id)
        ? current.selectedIds.filter((selectedId) => selectedId !== id)
        : [...current.selectedIds, id],
    }));
  }, []);

  const addMany = useCallback((ids: string[]) => {
    setState((current) => ({
      ...current,
      selectedIds: Array.from(new Set([...current.selectedIds, ...ids])),
    }));
  }, []);

  const removeResource = useCallback((id: string) => {
    setState((current) => ({ ...current, selectedIds: current.selectedIds.filter((selectedId) => selectedId !== id) }));
  }, []);

  const updateProfile = useCallback((profile: CoreProfile) => {
    setState((current) => ({ ...current, profile }));
  }, []);

  const importState = useCallback((incoming: unknown) => {
    if (!incoming || typeof incoming !== 'object') throw new Error('That file is not a CORE manifest.');
    const candidate = incoming as Partial<PersistedState>;
    const validIds = Array.isArray(candidate.selectedIds)
      ? candidate.selectedIds.filter((id): id is string => typeof id === 'string' && resources.some((resource) => resource.id === id))
      : [];
    const profile = candidate.profile && typeof candidate.profile === 'object'
      ? { ...defaultProfile, ...(candidate.profile as Partial<CoreProfile>) }
      : defaultProfile;
    setState({ selectedIds: validIds, profile });
  }, []);

  const reset = useCallback(() => setState({ selectedIds: [], profile: defaultProfile }), []);

  return { ...state, selectedResources, toggleResource, addMany, removeResource, updateProfile, importState, reset, isReady };
}

export function CoreProvider({ children }: { children: ReactNode }) {
  const store = useCoreStoreState();
  return <CoreContext.Provider value={store}>{children}</CoreContext.Provider>;
}

export function useCoreStore() {
  const context = useContext(CoreContext);
  const localStore = useCoreStoreState();
  return context ?? localStore;
}

export const coreStorageKey = STORAGE_KEY;