"use client";
import { useSearchParams } from "next/navigation";
import { authenticationUi } from "@/composition/generated/installed-auth-ui";
import { AuthFormView } from "./auth-form-view";
import { SocialAuthProviders } from "./auth-providers";

export const AccountForm = ({
  mode,
  className,
}: {
  readonly mode: "login" | "register";
  readonly className?: string;
}) => {
  const query = Object.fromEntries(useSearchParams().entries());
  return (
    <authenticationUi.Form mode={mode}>
      <AuthFormView mode={mode} query={query} className={className}>
        <SocialAuthProviders callbackURL={query.returnTo} query={query} />
      </AuthFormView>
    </authenticationUi.Form>
  );
};
