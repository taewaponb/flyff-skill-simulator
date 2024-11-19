"use client";

import { AppWrapper } from "./components/context";
import { PageHeader } from "./components/PageHeader";
import { SkillDescription } from "./components/SkillDescription";
import { SkillTree } from "./components/SkillTree";
import { PageMenu } from "./components/PageMenu";
import { PageFooter } from "./components/PageFooter";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <AppWrapper>
      <main className="prevent-select flex min-h-screen flex-col items-center justify-between px-6 lg:py-12 py-20">
        <PageHeader />
        <SkillDescription />
        <SkillTree />
        <PageMenu />
        <PageFooter />
        <Analytics />
      </main>
    </AppWrapper>
  );
}
