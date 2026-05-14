import Link from "next/link";
import { registerAction } from "@/modules/authentication/actions";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>Comienza con un perfil seguro basado en roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Nombre
              <Input name="name" placeholder="Sergio Alcala" required />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Correo
              <Input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Contraseña
              <Input name="password" type="password" minLength={8} required />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Rol
              <Select name="role" defaultValue="USER">
                <option value="USER">Usuario</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </label>
            <Button type="submit">Crear cuenta</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-medium text-primary">
              Iniciar sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
