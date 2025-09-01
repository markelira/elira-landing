# Video Player MVP - Phase 4 Implementation

This directory contains the video player components copied and adapted from the elira app for the course platform.

## Components

### VideoPlayer
- **Location**: `components/video/VideoPlayer.tsx`
- **Purpose**: Core video player component with Mux integration
- **Features**:
  - Mux video playback with fallback to HTML5 video
  - Analytics tracking
  - Chapter support
  - Bookmark markers
  - Progress tracking
  - Client-side rendering for SSR compatibility

### VideoPlayerControls  
- **Location**: `components/video/VideoPlayerControls.tsx`
- **Purpose**: Custom video player controls
- **Features**:
  - Play/pause controls
  - Seek bar with progress
  - Volume control
  - Playback speed adjustment
  - Note-taking functionality
  - Bookmark creation
  - Fullscreen toggle

## Hooks

### usePlayerData
- **Location**: `hooks/usePlayerData.ts`
- **Purpose**: Fetch course and lesson data for video player
- **Features**:
  - React Query integration
  - Authentication-aware
  - Mock data for MVP
  - Error handling and retry logic

## Pages

### Course Lesson Player
- **Location**: `app/courses/[id]/lessons/[lessonId]/page.tsx`
- **Purpose**: Full lesson player page with video integration
- **Features**:
  - Video and text lesson support
  - Course navigation sidebar
  - Progress tracking
  - Note and bookmark management
  - Responsive design

## Usage

```tsx
import { VideoPlayer, VideoPlayerControls } from '@/components/video'
import { usePlayerData } from '@/hooks/usePlayerData'

// In your component
const { data, isLoading } = usePlayerData(courseId, lessonId)

if (data?.signedPlaybackUrl) {
  return (
    <VideoPlayer
      src={data.signedPlaybackUrl}
      lessonTitle={data.currentLesson.title}
      onProgress={handleProgress}
      onEnded={handleVideoEnd}
    />
  )
}
```

## Integration Notes

1. **Mux Integration**: The VideoPlayer uses Mux for video streaming with signed URLs
2. **Authentication**: The usePlayerData hook requires user authentication
3. **Progress Tracking**: Implement backend endpoints to persist video progress
4. **Analytics**: Video analytics are tracked but need backend integration
5. **Mobile Optimization**: Components are responsive and touch-friendly

## Future Enhancements

- Real backend integration for progress persistence
- Advanced analytics dashboard
- Subtitle support
- Video quality selection
- Picture-in-picture mode
- Offline video caching
- Interactive video elements
- Quiz integration within videos

## Dependencies

- `@mux/mux-player-react`: Video player component
- `@tanstack/react-query`: Data fetching and caching
- `lucide-react`: Icons
- `tailwindcss`: Styling