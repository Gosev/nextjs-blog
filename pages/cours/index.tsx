
import React, { ReactElement, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import transpile from "../../shared/transpile";


interface IExec {
  ret:Array<string>;
  error?: Error;
}

const _code = `const a = 0;
let item = [
  {name: "David", place:"Paris", age: 42, gender: "M"},
  {name: "Yoda", place:"Dagobah", age: 942, gender: "M"},
  {name: "Jabba", place:"Tatouine", age: 223},
]

console.log(item);

`;

//console._log = console._log || console.log;

const toString = (item: any) => {
  if (typeof item == "string") {
    return item;
  };
  if (typeof item == "number") {
    return item.toString();
  };

  return JSON.stringify(item, null, 2);
  
}


const executeCode = (code: string) => {


  let ret:Array<string> = []

  console.log = (...args) => {

    let elts = args.map(toString);
    ret = [...ret, ...elts];
  }

  try {
    (new Function(transpile(code)))();
    return { ret } ;
  } catch (error) {
    return  {ret, error: error.toString() };
  }
};


const Cours:NextPageWithLayout<void> = ({}) => {

  const [logs, setLogs] = useState<IExec>({ret:[]});
  const [code, setCode] = useState<string>(_code);

  return <div className='w-full'>
    <CodeMirror
    value={code}
    height="300px"
    theme="dark"
    extensions={[javascript({ jsx: true, typescript: true })]}
    onChange={(value, viewUpdate) => {
      setCode(value);
    }}
  />
  <div  className='flex flex-row justify-items-end p-3'>
    <button onClick={() => {
        setLogs(executeCode(code));
      }}
    className="p-3 bg-gray-500 text-gray-100 rounded">Check</button>
  </div>
  <div className='flex flex-row justify-items-end p-3'>
    {logs.error && <div className="font-mono text-red" ><pre>{logs.error}</pre></div>}
    {logs.ret.map((item, id) => <div className="w-full" key={id}><pre>{item}</pre></div>)}
  </div>
</div>
}


Cours.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
    </>
  )
}

export default Cours;