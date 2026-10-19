import Hero from './components/Hero';
import Intro from './components/Intro';
import Timeline from './components/Timeline';
import Principles from './components/Principles';
import ThreeWays from './components/ThreeWays';
import Examples from './components/Examples';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="board">
      <Hero />
      <main>
        <Intro />
        <Timeline />
        <Principles />
        <ThreeWays />
        <Examples />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}
