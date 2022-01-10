import './index.scss';

type CodeComponentParam = {
  code?: string;
};

function CodeComponent({ code }: CodeComponentParam) {
  return (
    <>
      <pre>{code}</pre>
    </>
  );
}

export default CodeComponent;
