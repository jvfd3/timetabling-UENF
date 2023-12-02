import "./botaoRemover.css";

function BotaoRemover(props) {
  const { key, placeholder } = props;
  return (
    <button key={key} className="">
      {placeholder}
    </button>
  );
}

export default BotaoRemover;
