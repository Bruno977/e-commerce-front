"use client";
import { startTransition, useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Mail, Lock, Loader2Icon } from "lucide-react";
import { createSession } from "../lib/actions/create-session";

export function FormLogin() {
  const [state, action, pending] = useActionState(createSession, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-1">
          <Mail
            className={`absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4 ${
              state?.errors?.email ? "text-red-800" : "text-gray-400"
            }`}
          />
          <Input
            id="email"
            name="email"
            type="email"
            className={`pl-10 ${
              state?.errors?.email
                ? "border-red-300 placeholder:text-red-800"
                : ""
            }`}
            placeholder="exemplo@exemplo.com.br"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-red-600 pt-0.5 text-xs">{state.errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <div className="relative mt-1">
          <Lock
            className={`absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4 ${
              state?.errors?.password ? "text-red-800" : "text-gray-400"
            }`}
          />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={`pl-10 pr-10 ${
              state?.errors?.password
                ? "border-red-300 placeholder:text-red-800"
                : ""
            }`}
            placeholder="Sua senha de administrador"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {state?.errors?.password && (
          <p className="text-red-600 pt-0.5 text-xs">{state.errors.password}</p>
        )}
        {state?.errors?.general && (
          <div className="text-red-600 text-sm mt-2 mb-4">
            {state.errors.general}
          </div>
        )}
      </div>

      <Button
        disabled={pending}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
      >
        {pending && <Loader2Icon className="animate-spin" />}
        Acessar Painel
      </Button>
    </form>
  );
}
