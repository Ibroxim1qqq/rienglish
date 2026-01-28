
import { User, Lesson, MockTest, VocabularyItem } from '../types';

const KEYS = {
  USERS: 'lingo_users',
  CURRENT_USER: 'lingo_current_user',
  LESSONS: 'lingo_lessons',
  MOCKS: 'lingo_mocks',
  VOCABULARY_PREFIX: 'lingo_vocab_'
};

export const Storage = {
  // Users handling
  getUsers: (): User[] => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  saveUser: (user: User) => {
    const users = Storage.getUsers();
    if (!users.find(u => u.email === user.email)) {
      users.push(user);
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  },
  
  // Auth state
  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(KEYS.CURRENT_USER);
  },
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  // Content handling
  getLessons: (initial: Lesson[]): Lesson[] => {
    const stored = localStorage.getItem(KEYS.LESSONS);
    return stored ? JSON.parse(stored) : initial;
  },
  saveLessons: (lessons: Lesson[]) => localStorage.setItem(KEYS.LESSONS, JSON.stringify(lessons)),

  getMocks: (initial: MockTest[]): MockTest[] => {
    const stored = localStorage.getItem(KEYS.MOCKS);
    return stored ? JSON.parse(stored) : initial;
  },
  saveMocks: (mocks: MockTest[]) => localStorage.setItem(KEYS.MOCKS, JSON.stringify(mocks)),

  // Vocabulary handling (per user)
  getUserVocabulary: (userId: string): VocabularyItem[] => {
    const stored = localStorage.getItem(KEYS.VOCABULARY_PREFIX + userId);
    return stored ? JSON.parse(stored) : [];
  },
  saveUserVocabulary: (userId: string, items: VocabularyItem[]) => {
    localStorage.setItem(KEYS.VOCABULARY_PREFIX + userId, JSON.stringify(items));
  }
};
