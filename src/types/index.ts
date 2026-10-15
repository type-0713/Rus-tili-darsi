export type ThemeMode = 'dark' | 'light';

export type UserLevel = 'Новичок' | 'Читатель' | 'Знаток' | 'Мастер слов' | 'Книжный эксперт';

export interface InteractiveWord {
  word: string;
  lemma: string;
  translation: string;
  explanation: string;
  transcription?: string;
  partOfSpeech: string;
  examples: { ru: string; uz: string }[];
}

export interface LessonStep {
  id: number;
  slug: string;
  titleRu: string;
  titleUz: string;
  descriptionRu: string;
  descriptionUz: string;
  estimatedMinutes: number;
  xpReward: number;
}

export interface DictionaryItem {
  id: string;
  wordRu: string;
  wordUz: string;
  partOfSpeech: 'глагол' | 'существительное' | 'прилагательное' | 'наречие' | 'фраза';
  transcription?: string;
  exampleRu: string;
  exampleUz: string;
  difficulty: 'A1' | 'A2' | 'B1';
}

export interface GrammarTopic {
  id: string;
  letterCode: string; // 'A', 'B', 'C', ... 'K'
  titleRu: string;
  titleUz: string;
  level: 'Начальный уровень' | 'Средний уровень' | 'Продвинутый уровень';
  summaryUz: string;
  ruleRu: string;
  formula?: string;
  examples: {
    ru: string;
    uz: string;
    highlight?: string;
  }[];
  comparisons: {
    correctRu: string;
    incorrectRu: string;
    explanationUz: string;
  }[];
  commonMistakesUz: string[];
  exercises: {
    id: string;
    instructionRu: string;
    instructionUz: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanationRu: string;
    explanationUz: string;
  }[];
}

export interface ListeningExercise {
  id: string;
  level: 'Лёгкий' | 'Средний' | 'Сложный';
  titleRu: string;
  titleUz: string;
  audioTextRu: string;
  audioTextUz: string;
  questionRu: string;
  questionUz: string;
  optionsRu: string[];
  correctIndex: number;
  explanationUz: string;
  vocabulary: { ru: string; uz: string }[];
}

export interface PronunciationItem {
  id: string;
  textRu: string;
  textUz: string;
  phonetics?: string;
  notesUz: string;
  category: 'Приветствия' | 'О чтении' | 'Грамматика в речи' | 'Мудрость';
}

export interface QuizQuestion {
  id: string;
  category: 'Текст' | 'Словарь' | 'Грамматика' | 'Падежи' | 'Числа и проценты' | 'Части речи';
  questionRu: string;
  questionUz: string;
  optionsRu: string[];
  correctIndex: number;
  explanationRu: string;
  explanationUz: string;
}

export interface TeacherStep {
  minuteRange: string;
  titleRu: string;
  titleUz: string;
  teacherGoalUz: string;
  teacherScriptRu: string;
  teacherScriptUz: string;
  suggestedAction: string;
  screenContentRu: string;
  screenContentUz: string;
  keyPoints: string[];
}
