"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // This would typically connect to a newsletter service
      setIsSubmitted(true);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-white relative">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-24 h-24 md:w-48 md:h-48 bg-[#D4A017]/5 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#A61C3C]/5 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-accent rounded-2xl p-8 md:p-12 shadow-sm border border-border/10">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Join Our Community
            </h2>
            <p className="text-neutral-600">
              Subscribe to receive exclusive offers, artisan stories, and cultural insights from Bhutan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full h-12 border-[#A61C3C]/20 focus:border-[#A61C3C] focus:ring-[#A61C3C]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit"
              className="h-12 bg-[#A61C3C] hover:bg-[#A61C3C]/90 text-white"
            >
              {isSubmitted ? (
                "Thank You!"
              ) : (
                <>
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-neutral-500 mt-4 text-center">
            By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;