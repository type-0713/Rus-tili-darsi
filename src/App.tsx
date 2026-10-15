import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WordModal } from './components/WordModal';

import { HeroSection } from './components/sections/HeroSection';
import { LessonSection } from './components/sections/LessonSection';
import { TextbookSection } from './components/sections/TextbookSection';
import { GrammarSection } from './components/sections/GrammarSection';
import { DictionarySection } from './components/sections/DictionarySection';
import { PronunciationSection } from './components/sections/PronunciationSection';
import { ListeningSection } from './components/sections/ListeningSection';
import { GamesSection } from './components/sections/GamesSection';
import { QuizSection } from './components/sections/QuizSection';
import { TeacherModeSection } from './components/sections/TeacherModeSection';
import { SummarySection } from './components/sections/SummarySection';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {activeTab === 'home' && <HeroSection />}
      {activeTab === 'lesson' && <LessonSection />}
      {activeTab === 'textbook' && <TextbookSection />}
      {activeTab === 'grammar' && <GrammarSection />}
      {activeTab === 'dictionary' && <DictionarySection />}
      {activeTab === 'pronunciation' && <PronunciationSection />}
      {activeTab === 'listening' && <ListeningSection />}
      {activeTab === 'games' && <GamesSection />}
      {activeTab === 'quiz' && <QuizSection />}
      {activeTab === 'teacher' && <TeacherModeSection />}
      {activeTab === 'summary' && <SummarySection />}
    </main>
  );
};


export const App: React.FC = () => {
  return (
    <AppProvider>
      <AudioProvider>
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative selection:bg-purple-500 selection:text-white">
          <Navbar />
          <MainContent />
          <Footer />
          <WordModal />
        </div>
      </AudioProvider>
    </AppProvider>
  );
};

export default App;
