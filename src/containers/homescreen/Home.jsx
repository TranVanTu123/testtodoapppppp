import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [list, setList] = useState([]);
  const [err, setErr] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [currrtodo, setCurrrtodo] = useState("");

  const handleupdate = (item) => {
    setShow(!show);
    setCurrrtodo(item);
  };

  const onchange = (e) => {
    setValue(e.target.value);
  };
  const onchange1 = (e) => {
    setValue1(e.target.value);
  };
  const onclick = () => {
    if (list.filter((e) => e.name === value).length > 0) {
      setErr(true);
      setDisabled(true);
    } else {
      const a = [
        ...list,
        {
          name: value,
          id: Date.now(),
        },
      ];
      setErr(false);
      setList(a);
    }
  };
  const retype = (id) => {
    //console.log(id);
    const tepList = list.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          name: value1,
        };
      }

      return e;
    });

    setList(tepList);
  };
  const delete1 = (id) => {
    let newarr = list.filter((e) => e.id !== id);
    setList(newarr);
  };
  const listItems = list.map((item) => (
    <li key={item.id}>
      {item.name}
      <button
        onClick={() => {
          delete1(item.id);
        }}
      >
        Clear
      </button>
      <button style={{ margin: 10 }} onClick={() => handleupdate(item)}>
        Update
      </button>
    </li>
  ));
  const asset = window.localStorage.getItem("asstoken");
  console.log(asset);
  const config = {
    headers: {
      Authorization: "Bearer " + asset,
    },
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.23:3000/todo?page=1", config)
      .then((response) => {
        console.log(response);
      }, []);
  });

  return (
    <div>
      <h1></h1>
      <input style={{ margin: 10 }} type="text" onChange={onchange} />
      <button onClick={() => onclick()} disabled={isDisabled}>
        Add
      </button>

      <div>
        <ul>
          {listItems}
          <h1>{err && <p>loiiiii</p>}</h1>
        </ul>
      </div>

      {show && (
        <>
          <input
            type="text"
            defaultValue={currrtodo.name}
            onChange={onchange1}
          />
          <button onClick={() => retype(currrtodo.id)}>Change</button>
        </>
      )}
    </div>
  );
}
export default Home;
