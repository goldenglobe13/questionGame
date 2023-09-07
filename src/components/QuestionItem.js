const QuestionItem = ({ questionState }) => {
  console.log(questionState);
  return (
    <>
      {questionState.map((item, i) => {
        return (
          <div key={i}>
            <p>{item.question}</p>
            <ul>
              {item.options.map((items) => (
                <li key={items}>{items}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default QuestionItem;
