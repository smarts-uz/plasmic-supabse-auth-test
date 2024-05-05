import { PlasmicComponent, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";
import { PLASMIC_AUTH_DATA_KEY } from "../utils/cache-keys";
import { PLASMIC } from "@/plasmic-init";


export function AuthButton({
  className,
  children,
  redirectOnSuccess,
}: {
  className?: string;
  children?: React.ReactElement;
  redirectOnSuccess?: string;
}): JSX.Element {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  return (
   <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicComponent
        forceOriginal
        component="AuthButton"
        componentProps={{
          logoutBtn: {
            onClick: async () => {
              await supabaseClient.auth.signOut();
              await mutate(PLASMIC_AUTH_DATA_KEY);
              router.reload();
            },
          },
        }}
      />

   </PlasmicRootProvider>

  
  );
}