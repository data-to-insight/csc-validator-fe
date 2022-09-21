import { ChangeEvent } from "react";

export interface TestFormProps {
  onClick: () => void;
  onUpload: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const TestForm = (props: TestFormProps) => {
  const { onClick, onUpload } = props;

  return (
    <div>
      <button
        onClick={() => {
          onClick();
        }}
      >
        Call API
      </button>
      <form>
        <input type="file" onChange={onUpload} />
      </form>
    </div>
  );
};

export default TestForm;
