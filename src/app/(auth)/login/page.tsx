import Link from "next/link";
import { loginAction } from "@/modules/authentication/actions";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bienvenido de nuevo</CardTitle>
          <CardDescription>Inicia sesión para gestionar finanzas mensuales en MXN y USD.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Correo
              <Input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Contraseña
              <Input name="password" type="password" minLength={8} required />
            </label>
            <Button type="submit">Iniciar sesión</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            ¿Nuevo aquí?{" "}
            <Link href="/register" className="font-medium text-primary">
              Crear cuenta
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
