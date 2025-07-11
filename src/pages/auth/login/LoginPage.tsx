import React, { useEffect } from "react";

import { useAuth } from "@/app/providers/AuthProvider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { LoginForm, SignupForm } from "@/components";
import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/ui";
import { Navbar } from "@/shared/ui";

export const LoginPage = () => {
 const { user, userType, redirectToDashboard } = useAuth();

 useEffect(() => {
  if (user && userType) {
   console.log("Login page: User is logged in with type:", userType);
   console.log("Attempting redirect from login page...");
   redirectToDashboard();
  }
 }, [user, userType, redirectToDashboard]);

 return (
  <div className="min-h-screen flex flex-col">
   <Navbar />
   <main className="flex-grow flex items-center justify-center pt-24 px-4 py-24">
    <div className="w-full max-w-md">
     <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
       <TabsTrigger value="login">Login</TabsTrigger>
       <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
       <Card>
        <CardHeader>
         <CardTitle>Login</CardTitle>
         <CardDescription>
          Enter your credentials to access your account
         </CardDescription>
        </CardHeader>
        <LoginForm />
       </Card>
      </TabsContent>

      <TabsContent value="register">
       <Card>
        <CardHeader>
         <CardTitle>Create Account</CardTitle>
         <CardDescription>Register as a client or freelancer</CardDescription>
        </CardHeader>
        <SignupForm />
       </Card>
      </TabsContent>
     </Tabs>
    </div>
   </main>
  </div>
 );
};
