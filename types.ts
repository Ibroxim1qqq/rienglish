
export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  definition: string;
  example: string;
  createdAt?: number;
}

export interface Lesson {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface MockTest {
  id: string;
  title: string;
  type: 'Full' | 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  duration: string;
  questionsCount: number;
  isPremium: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
}

export type ViewMode = 'auth' | 'home' | 'scan' | 'lessons' | 'mocks' | 'admin' | 'processing' | 'list' | 'flashcards';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}