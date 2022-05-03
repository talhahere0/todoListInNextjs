import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [getTask, setGetTask] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/todoList/getTodoList`)
      .then((jsonRes) => {
        console.log(jsonRes);
        setGetTask(jsonRes.data.get_task);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const addTask = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/todoList/addTodoList`,
        { task: task }
      )
      .then((jsonRes) => {
        setList((prev) => {
          return jsonRes.send_task;
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center mt-[5%]">
        <input
          onChange={(event) => {
            setTask(event.target.value);
          }}
          type="text"
          className="h-11 w-[500px] outline-brand-5 font-poppins text-[25px] border-brand-5 border-2 rounded"
        />
        <button
          onClick={addTask}
          className="bg-brand-4 ml-3 p-2 text-white font-poppins rounded"
        >
          Add Task
        </button>
      </div>
      <div className="flex items-center justify-center mt-[3%]">
        <div className="">
          {getTask.map((t) => {
            return (
              <p
                key={t}
                className=" bg-brand-3 mb-3 bg-opacity-20 h-11 w-[590px] rounded text-brand-3 font-bold font-poppins p-2.5"
              >
                {t.task}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
