'use client';

import { useRouter } from 'next/navigation';
import { Play, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserProgress } from '@/hooks/useUserProgress';

export function CourseQuickAccess() {
  const router = useRouter();
  const { data: progressData, isLoading } = useUserProgress();

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  // Get the first enrolled course that's not completed
  const currentCourse = progressData?.enrolledCourses?.find(c => !c.isCompleted);

  if (!currentCourse) {
    return (
      <div className="relative h-[280px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
        {/* Blurred video player aesthetic background */}
        <div className="absolute inset-0 bg-[url('/video-pattern.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl" />

        {/* Center content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Kezdj el tanulni még ma
          </h3>
          <p className="text-white/80 mb-6 max-w-md">
            Fedezd fel a masterclass programjainkat
          </p>
          <Button
            onClick={() => router.push('/courses')}
            className="bg-white hover:bg-gray-100 text-gray-900 rounded-xl px-8 py-6 h-auto font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Programok megtekintése
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = currentCourse.progressPercentage || 0;

  return (
    <div className="relative h-[280px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden group">
      {/* Video Player Aesthetic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient blobs simulating video content */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Video player UI elements - blurred */}
        <div className="absolute inset-0 backdrop-blur-3xl bg-black/30" />

        {/* Simulated video thumbnail grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 p-8 h-full">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded" />
            ))}
          </div>
        </div>

        {/* Video player controls bar - bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-xl border-t border-white/5">
          <div className="h-full px-8 flex items-center justify-between">
            {/* Left side controls */}
            <div className="flex items-center gap-6 opacity-30">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-40 bg-white/30 rounded-full" />
                <div className="h-1.5 w-28 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4 opacity-30">
              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm" />
              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm" />
              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm" />
            </div>
          </div>
        </div>

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 transition-all duration-700"
            style={{ width: `${Math.round(progressPercentage)}%` }}
          />
        </div>

        {/* Center vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      </div>

      {/* Center Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 z-10">
        {/* Course Title */}
        <div className="mb-6">
          <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
            Folytatás
          </p>
          <h3 className="text-2xl font-bold text-white mb-3 max-w-2xl drop-shadow-lg">
            {currentCourse.courseTitle}
          </h3>
          <div className="flex items-center justify-center gap-4 text-sm text-white/80 font-medium">
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              {currentCourse.completedLessons}/{currentCourse.totalLessons} modul
            </span>
            <span>•</span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              {Math.round(progressPercentage)}% kész
            </span>
          </div>
        </div>

        {/* Center Play Button */}
        <Button
          onClick={() => router.push(`/courses/${currentCourse.courseId}/learn`)}
          className="bg-white hover:bg-white text-gray-900 rounded-2xl px-12 py-8 h-auto font-bold text-lg shadow-2xl hover:scale-110 hover:shadow-white/20 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Play className="w-7 h-7 mr-3 fill-current relative z-10" />
          <span className="relative z-10">Masterclass folytatása</span>
        </Button>
      </div>
    </div>
  );
}
