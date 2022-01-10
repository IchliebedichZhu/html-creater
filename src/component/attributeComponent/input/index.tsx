import { ReactNode } from 'react';
import { Input } from 'antd';
import './index.scss';

type returnData = {
  key: string;
  codes: {
    [key: string]: string;
  };
  ast: CommonAstTree;
  Component: ReactNode;
};

type InputComponentParam = {
  key: string;
  params: InputChildParam;
};

function InputComponent({ key, params }: InputComponentParam): returnData {
  return {
    key,
    codes: {},
    ast: {},
    Component: () => <InputChild placeholder={params.placeholder} />,
  };
}

type InputChildParam = {
  placeholder: string;
  stateName?: string;
};

function InputChild({ placeholder }: InputChildParam) {
  return <Input placeholder={placeholder} />;
}

export default InputComponent;
