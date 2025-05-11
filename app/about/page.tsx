"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Paintbrush, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/19287541/pexels-photo-19287541/free-photo-of-paro-taktsang-in-bhutan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm uppercase tracking-wider px-3 py-1 rounded-full mb-6">
            Est. 2025
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Preserving Bhutanese Heritage
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connecting artisans with art enthusiasts worldwide through authentic craftsmanship
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href="/products">
              Explore Our Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-primary/10 text-primary text-sm uppercase tracking-wider px-3 py-1 rounded-full">
                Our Mission
              </span>
              <h2 className="font-heading text-4xl font-bold text-neutral-900">
                Bridging Tradition with the Modern World
              </h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-lg text-neutral-600">
                  Founded in the spiritual heart of the Himalayas, we are dedicated to preserving 
                  and promoting Bhutan's rich artistic heritage while providing sustainable 
                  livelihoods for local artisans. Each piece in our collection carries centuries 
                  of tradition, telling stories of our kingdom's unique cultural identity.
                </p>
                <p className="text-lg text-neutral-600">
                  Through our platform, we create meaningful connections between skilled Bhutanese 
                  craftspeople and art enthusiasts worldwide. We ensure that traditional techniques 
                  and designs continue to thrive, adapting to contemporary aesthetics while 
                  maintaining their cultural authenticity.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: "url('https://images.pexels.com/photos/6192351/pexels-photo-6192351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                  }}
                ></div>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden mt-8">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: "url('https://images.pexels.com/photos/19287537/pexels-photo-19287537/free-photo-of-woman-holding-fabric.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crafts Section */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary/10 text-secondary text-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Our Expertise
            </span>
            <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-6">
              Traditional Craftsmanship
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover the intricate artistry of Bhutanese crafts, where each piece tells a story 
              of cultural heritage and spiritual significance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Textiles */}
            <div className="group">
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('https://images.pexels.com/photos/19287537/pexels-photo-19287537/free-photo-of-woman-holding-fabric.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">Traditional Textiles</h3>
                  <p className="text-white/90">Handwoven with centuries of tradition</p>
                </div>
              </div>
              <p className="text-neutral-600">
                Our textile collection showcases the mastery of Bhutanese weaving traditions. 
                From the intricate patterns of Kishuthara to the warm embrace of Yathra, each piece 
                is handwoven using natural dyes and traditional looms, preserving techniques passed 
                down through generations.
              </p>
            </div>

            {/* Paintings */}
            <div className="group">
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('https://images.pexels.com/photos/7486798/pexels-photo-7486798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">Sacred Paintings</h3>
                  <p className="text-white/90">Embodying spiritual heritage</p>
                </div>
              </div>
              <p className="text-neutral-600">
                Our collection of Thangka paintings and traditional Buddhist art represents the 
                spiritual essence of Bhutan. Each piece is meticulously crafted using natural 
                pigments and time-honored techniques, depicting sacred imagery and mandalas that 
                tell stories of Buddhist philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowering Artisans Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Our Impact
            </span>
            <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-6">
              Empowering Bhutanese Artisans
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We're committed to supporting our artisan communities through fair trade practices 
              and sustainable development initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fair Trade */}
            <Card className="group border-2 hover:border-primary/20 bg-white transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 px-6 pb-6 flex flex-col items-center text-center h-full">
                <div className="h-16 w-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fair Trade Practices</h3>
                <p className="text-neutral-600 flex-grow">
                  We ensure our artisans receive fair compensation for their work, supporting 
                  sustainable livelihoods and traditional craft preservation.
                </p>
              </CardContent>
            </Card>

            {/* Skill Development */}
            <Card className="group border-2 hover:border-secondary/20 bg-white transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 px-6 pb-6 flex flex-col items-center text-center h-full">
                <div className="h-16 w-16 flex items-center justify-center bg-secondary/10 text-secondary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Paintbrush className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Skill Development</h3>
                <p className="text-neutral-600 flex-grow">
                  We support workshops and training programs to pass traditional crafting 
                  techniques to the next generation of artisans.
                </p>
              </CardContent>
            </Card>

            {/* Community Support */}
            <Card className="group border-2 hover:border-[#1E3A8A]/20 bg-white transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 px-6 pb-6 flex flex-col items-center text-center h-full">
                <div className="h-16 w-16 flex items-center justify-center bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                <p className="text-neutral-600 flex-grow">
                  A portion of our proceeds goes back to local communities, supporting education 
                  and cultural preservation initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}