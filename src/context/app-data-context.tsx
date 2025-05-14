"use client";

import React, { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSession } from "next-auth/react";

// Define types
type UserApiData = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    status: string;
  }>;
};

type CheckAdminData = {
  isAdmin: boolean;
  message?: string;
};

type AppDataContextType = {
  user: UserApiData | undefined;
  isAdmin: boolean;
  session: any;
  loading: boolean;
  error: any;
  mutateUser: () => void;
  mutateAdmin: () => void;
};

// Create context
const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// Define SWR config
const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute
  focusThrottleInterval: 60000, // 1 minute
  errorRetryCount: 3
};

// Provider component
export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  // Only fetch user data if the user is authenticated
  const { data: user, error: userError, isLoading: userLoading, mutate: mutateUser } = useSWR<UserApiData>(
    status === "authenticated" ? "/api/me" : null,
    fetcher,
    swrConfig
  );
  
  // Only fetch admin status if the user is authenticated
  const { data: adminData, error: adminError, isLoading: adminLoading, mutate: mutateAdmin } = useSWR<CheckAdminData>(
    status === "authenticated" ? "/api/auth/check-admin" : null,
    fetcher,
    swrConfig
  );

  // Effect to prefetch and cache data on initial load
  useEffect(() => {
    if (status === "authenticated") {
      // Prefetch user data and admin status once authenticated
      fetcher("/api/me");
      fetcher("/api/auth/check-admin");
    }
  }, [status]);

  const loading = userLoading || adminLoading || status === "loading";
  const error = userError || adminError;

  return (
    <AppDataContext.Provider
      value={{
        user,
        isAdmin: !!adminData?.isAdmin,
        session,
        loading,
        error,
        mutateUser,
        mutateAdmin,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

// Hook to use the context
export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
}

// Ensure exports are visible
export { AppDataContext };
