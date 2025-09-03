"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, ArrowDown } from "lucide-react";
import { bioInfo } from "@/lib/bio-data";
import { Button } from "@/components/ui/button";
import { WritingText } from "@/components/ui/shadcn-io/writing-text";
import Image from "next/image";

export default function Bio() {
  return (
    <Card className="w-full gap-0 backdrop-blur-md bg-white/10 dark:bg-white/5 border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Hi, I&apos;m Justin
            </CardTitle>
            <CardDescription>
              {bioInfo.title} based in {bioInfo.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-4">
            <div className="w-full max-w-[16rem] h-auto aspect-square relative rounded-full overflow-hidden">
              <Image
                src={bioInfo.avatarSrc}
                alt={bioInfo.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 16rem"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            <div className="w-full space-y-3">
              {bioInfo.education.map((edu, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {/* We use h-6 and w-6 because the GraduationCap is a little smaller */}
                  <GraduationCap className="h-6 w-6 text-muted-foreground" />
                  <div className="leading-tight">
                    <p className="text-sm font-medium">
                      {edu.degree} · {edu.field}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {edu.school} · {edu.year}
                    </p>
                  </div>
                </div>
              ))}

              {/* <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-sm font-medium">{bioInfo.age}</p>
                </div>
              </div> */}

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{bioInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div>
              <div className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                <WritingText className="text-4xl" text={bioInfo.bio[0]} />
              </div>
              {bioInfo.bio.length > 1 && (
                <div className="mt-4 space-y-3 text-muted-foreground text-base md:text-lg">
                  {bioInfo.bio.slice(1).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById("portfolio");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <ArrowDown className="h-5 w-5" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Proficient</p>
            <div className="rounded-xl p-4 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 w-full overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {bioInfo.skills?.proficient?.map(
                  (skill: Record<string, unknown>, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-2 p-3"
                    >
                      {skill?.Icon ? (
                        React.createElement(
                          skill.Icon as React.ComponentType<{
                            className?: string;
                          }>,
                          { className: "h-14 w-14 text-white" }
                        )
                      ) : (
                        <div className="h-14 w-14 rounded bg-muted" />
                      )}
                      <span className="text-sm font-medium">
                        {String(skill?.name ?? skill)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Learning</p>
            <div className="rounded-xl p-3 bg-gradient-to-r from-blue-300 to-blue-500 dark:from-blue-400 dark:to-blue-600 w-full overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {bioInfo.skills?.learning?.map(
                  (skill: Record<string, unknown>, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-2 p-3"
                    >
                      {skill?.Icon ? (
                        React.createElement(
                          skill.Icon as React.ComponentType<{
                            className?: string;
                          }>,
                          { className: "h-12 w-12 text-white" }
                        )
                      ) : (
                        <div className="h-12 w-12 rounded bg-muted" />
                      )}
                      <span className="text-sm font-medium">
                        {String(skill?.name ?? skill)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Misc</p>
            <div className="rounded-xl p-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/40 w-full overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {bioInfo.skills?.misc?.map(
                  (skill: Record<string, unknown>, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-1 p-2"
                    >
                      {skill?.Icon ? (
                        React.createElement(
                          skill.Icon as React.ComponentType<{
                            className?: string;
                          }>,
                          {
                            className:
                              "h-10 w-10 text-blue-900 dark:text-white",
                          }
                        )
                      ) : (
                        <div className="h-10 w-10 rounded bg-muted" />
                      )}
                      <span className="text-xs font-medium">
                        {String(skill?.name ?? skill)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end"></CardFooter>
    </Card>
  );
}
