"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Engineering Lead &amp; Frontend Architect
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Mohanad Elhag
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            Building scalable web platforms across ecommerce, healthcare, and
            government sectors. 9+ years leading engineering teams and
            delivering products used by millions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/blog">
            <Button size="lg">Read the Blog</Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg">
              About Me
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
