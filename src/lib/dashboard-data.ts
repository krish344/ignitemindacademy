// Dashboard Types
export interface Subject {
  name: string;
  progress: number;
  mastery: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  earned: boolean;
}

export interface UpcomingSession {
  subject: string;
  tutor: string;
  time: string;
  duration: string;
}

export interface Activity {
  type: "quiz" | "study" | "achievement";
  title: string;
  details: string;
  time: string;
  icon: string;
}

export interface StudentData {
  name: string;
  level: number;
  xp: number;
  streak: number;
  subjects: Subject[];
  achievements: Achievement[];
  upcomingSession: UpcomingSession;
  activities: Activity[];
}

// Mock Data
export const mockStudentData: StudentData = {
  name: "Aditya",
  level: 5,
  xp: 2450,
  streak: 7,
  subjects: [
    { name: "Numeracy", progress: 72, mastery: "Intermediate" },
    { name: "Reading", progress: 65, mastery: "Intermediate" },
    { name: "Writing", progress: 45, mastery: "Beginner" },
    { name: "Language", progress: 58, mastery: "Intermediate" },
  ],
  achievements: [
    { id: 1, name: "First Quiz", icon: "🎯", earned: true },
    { id: 2, name: "7-Day Streak", icon: "🔥", earned: true },
    { id: 3, name: "Perfect Score", icon: "⭐", earned: false },
    { id: 4, name: "Speed Demon", icon: "⚡", earned: false },
    { id: 5, name: "Early Bird", icon: "🌅", earned: false },
    { id: 6, name: "Bookworm", icon: "📚", earned: true },
  ],
  upcomingSession: {
    subject: "Numeracy",
    tutor: "Mr. Sharma",
    time: "Tomorrow, 4:00 PM",
    duration: "60 min",
  },
  activities: [
    { type: "quiz", title: "Completed Numeracy Quiz", details: "Score: 85% • 12 questions", time: "2 hours ago", icon: "✅" },
    { type: "study", title: "Study Session", details: "45 minutes • Algebra", time: "5 hours ago", icon: "📖" },
    { type: "achievement", title: "Earned 7-Day Streak Badge", details: "Amazing consistency!", time: "Yesterday", icon: "🔥" },
    { type: "quiz", title: "Completed Grammar Quiz", details: "Score: 92% • 10 questions", time: "Yesterday", icon: "✅" },
  ],
};
