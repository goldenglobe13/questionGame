import { useState } from "react";
import "./Questions.css";
import QuestionItem from "./QuestionItem";

// const r = document.querySelector(":root");
// r.style.setProperty("--hours-deg", `${hoursHandlea}deg`);

const Questions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionState, setQuestionState] = useState([]);

  const clickHandler = (e) => {
    const controller = new AbortController();
    e.preventDefault();
    fetchMovies(controller);
  };

  async function fetchMovies(controller) {
    try {
      setIsLoading(true);
      setError("");
      const url = `https://imaginative-genie-851c43.netlify.app/api/v1/series/whatIsYear`;

      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const result = await res.json();
      const data = result.data;
      const answer = data.options[0];
      let mappedOptions = [];
      [...data.opsIndex].forEach((item, i) => {
        mappedOptions[item - 1] = [...data.options][i];
      });
      setQuestionState((prev) => {
        return [
          ...prev,
          {
            question: data.question,
            options: mappedOptions,
            answer: answer,
          },
        ];
      });
      if (data.Response === "False") throw new Error("Movie not found");
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <p>Question Game</p>
      <button onClick={clickHandler}>Fetch</button>
      {questionState.length > 0 && (
        <QuestionItem questionState={questionState} />
      )}
    </div>
  );
};

export default Questions;
