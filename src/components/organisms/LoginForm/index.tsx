import React, { useState } from "react";
import { Button, Input, Label, CardContent, CardFooter } from "@/shared/ui";
import { useAuth } from "@/app/providers/AuthProvider";
import { useToast } from "@/shared/hooks/ui/useToast";

export const LoginForm = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { signIn } = useAuth();
 const { toast } = useToast();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || !password) {
   toast({
    title: "Error",
    description: "Email and password are required",
    variant: "destructive",
   });
   return;
  }

  setIsSubmitting(true);
  try {
   await signIn(email, password);
   toast({
    title: "Success",
    description: "You have successfully logged in.",
   });
  } catch (error) {
   console.error("Login error:", error);
   toast({
    title: "Error",
    description:
     error instanceof Error
      ? error.message
      : "Failed to login. Please check your credentials.",
    variant: "destructive",
   });
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <form onSubmit={handleLogin}>
   <CardContent className="space-y-4">
    <div className="space-y-2">
     <Label htmlFor="email">Email</Label>
     <Input
      id="email"
      type="email"
      placeholder="name@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
     />
    </div>
    <div className="space-y-2">
     <Label htmlFor="password">Password</Label>
     <Input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
     />
    </div>
   </CardContent>
   <CardFooter>
    <Button type="submit" className="w-full" disabled={isSubmitting}>
     {isSubmitting ? "Logging in..." : "Login"}
    </Button>
   </CardFooter>
  </form>
 );
};
