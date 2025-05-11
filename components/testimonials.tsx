"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    quote: "The textile I purchased is absolutely stunning. The craftsmanship is exceptional, and knowing it directly supports the artisans makes it even more special.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    quote: "My Thangka painting arrived beautifully packaged with a certificate of authenticity. The attention to detail is remarkable - truly a piece I'll treasure forever.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amelia Patel",
    location: "London, UK",
    quote: "As a collector of Asian textiles, I can attest to the exceptional quality of Bhutan Art's pieces. The colors are vibrant, and the patterns are authentic.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lars Svensson",
    location: "Stockholm, Sweden",
    quote: "The Bhutanese tapestry I purchased has become the centerpiece of my living room. The quality and cultural significance bring joy to my home every day.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const nextTestimonial = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection("left");
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover why collectors and art enthusiasts love our authentic Bhutanese crafts.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border border-border/30 shadow-sm bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-10">
                      {/* Rating */}
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < testimonial.rating ? "text-[#D4A017] fill-[#D4A017]" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <p className="text-lg md:text-xl text-neutral-700 italic mb-6">
                        "{testimonial.quote}"
                      </p>
                      
                      {/* Customer info */}
                      <div>
                        <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                        <p className="text-sm text-neutral-500">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full border-neutral-200 hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full border-neutral-200 hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-1">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === i ? "w-6 bg-primary" : "w-2 bg-neutral-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;