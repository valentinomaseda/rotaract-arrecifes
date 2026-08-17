/**
 * CrosswordGame
 *
 * Lazy-loadable wrapper around Crossword.
 * Receives `dataPath` for future use (e.g. fetching week-specific clues).
 * Currently uses the static data embedded in crosswordData.js.
 *
 * @param {{ dataPath: string }} props
 */
import Crossword from './Crossword';

// eslint-disable-next-line no-unused-vars
export default function CrosswordGame({ dataPath }) {
  return <Crossword />;
}
