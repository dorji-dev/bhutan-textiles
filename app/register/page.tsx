import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Palette, ShoppingBag } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
            Join Bhutan Art
          </h1>
          <p className="text-neutral-600">
            Choose how you'd like to be part of our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/register/customer" className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Register as Customer</h2>
                <p className="text-neutral-600">
                  Discover and purchase authentic Bhutanese crafts from our talented artisans
                </p>
                <Button className="w-full group-hover:bg-primary">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/register/artisan" className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 hover:border-secondary/20">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                  <Palette className="h-8 w-8 text-secondary" />
                </div>
                <h2 className="text-xl font-semibold">Register as Artisan</h2>
                <p className="text-neutral-600">
                  Share your craft with the world and connect with customers who value authentic Bhutanese art
                </p>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Join as Artisan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}