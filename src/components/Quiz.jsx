import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { quiz } from '../data/content';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { IconCheck, IconX, IconArrowRight, IconSpark } from './icons';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = quiz.questions.length;
  const question = quiz.questions[index];
  const answered = selected !== null;
  const isCorrect = selected === question.answer;

  const choose = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.answer) setScore((prev) => prev + 1);
  };

  const next = () => {
    if (index + 1 >= total) {
      setDone(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  return (
    <section id="quiz" className="band bg-violet-soft/50">
      <SectionHeader index="06" eyebrow="Interativo" title={quiz.heading} lead={quiz.lead} tone="violet" />

      <Reveal delay={0.1}>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-surface-raised p-6 shadow-card md:p-9">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between text-sm font-medium text-cream/55">
                    <span>
                      Pergunta {index + 1} de {total}
                    </span>
                    <span>Acertos: {score}</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet to-learning"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-cream md:text-2xl">{question.q}</h3>

                  <div className="mt-5 space-y-3">
                    {question.options.map((option, optionIndex) => {
                      let style = 'border-white/15 bg-surface hover:border-violet/40 hover:bg-violet-soft/40';
                      if (answered) {
                        if (optionIndex === question.answer) {
                          style = 'border-learning bg-learning-soft text-learning-bright';
                        } else if (optionIndex === selected) {
                          style = 'border-coral bg-coral/10 text-coral';
                        } else {
                          style = 'border-white/10 bg-surface opacity-60';
                        }
                      }
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => choose(optionIndex)}
                          disabled={answered}
                          className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition ${style}`}
                        >
                          <span>{option}</span>
                          {answered && optionIndex === question.answer && (
                            <IconCheck className="h-5 w-5 shrink-0" />
                          )}
                          {answered && optionIndex === selected && optionIndex !== question.answer && (
                            <IconX className="h-5 w-5 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`mt-5 flex items-start gap-3 rounded-2xl p-4 ${
                            isCorrect ? 'bg-learning-soft' : 'bg-feedback-soft'
                          }`}
                        >
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-white ${
                              isCorrect ? 'bg-learning' : 'bg-feedback'
                            }`}
                          >
                            {isCorrect ? <IconCheck className="h-4 w-4" /> : <IconX className="h-4 w-4" />}
                          </span>
                          <p className="text-sm leading-relaxed text-ink-soft">
                            <span className="font-bold text-ink">{isCorrect ? 'Isso! ' : 'Quase. '}</span>
                            {question.explain}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={next}
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-ink/90"
                        >
                          {index + 1 >= total ? 'Ver resultado' : 'Próxima pergunta'}
                          <IconArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-violet-soft text-violet-bright">
                    <IconSpark className="h-8 w-8" />
                  </span>
                  <p className="mt-5 font-display text-4xl font-bold tracking-tight">
                    {score}
                    <span className="text-cream/55">/{total}</span>
                  </p>
                  <p className="mt-2 text-cream/70">
                    {score === total
                      ? 'Perfeito. Você domina a cultura DevOps e as três maneiras.'
                      : score >= total - 2
                        ? 'Muito bom. Revise os pontos que escaparam e volte ao conteúdo.'
                        : 'Bom começo. Releia as três maneiras e tente novamente.'}
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet/90"
                  >
                    Refazer o quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
    </section>
  );
}
