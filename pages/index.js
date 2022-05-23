import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";

const url = "http://localhost:3000/api/todoList";
export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/todoList/getTodoList`)
      .then((jsonRes) => {
        console.log(jsonRes);
        setTasks(jsonRes.data.tasks);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const addTask = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/todoList/addTodoList`,
        { task: newTask }
      )
      .then((jsonRes) => {
        setTasks((prev) => {
          return [jsonRes.data.new_task, ...prev];
        });
        setNewTask("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/todoList/${id}`
      );
      setTasks((prev) => {
        return prev.filter((obj) => {
          return obj._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async (id) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/user/logoutUser`
      );
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex mx-10 md:flex-row xs:flex-col gap-3 items-center justify-center mt-[5%]">
        <input
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
          value={newTask}
          type="text"
          className="py-[11px] px-5 max-w-[700px] flex-grow outline-brand-5 font-poppins text-sm border-brand-5 border rounded-lg"
        />
        <button
          onClick={addTask}
          className="py-[11px] px-5 flex bg-brand-4 w-fit text-sm text-white font-poppins rounded-lg"
        >
          Add Task
        </button>
        <button
          onClick={logoutUser}
          className="py-[11px] px-5 flex bg-brand-4 w-fit text-sm text-white font-poppins rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="flex items-center justify-center mt-[3%]">
        <div className="">
          {tasks.map((t) => {
            return (
              <>
                <p
                  key={t}
                  className="sm:w-[500px] xs:w-[300px] bg-brand-3 mb-3 bg-opacity-20 h-11 flex justify-between rounded text-brand-3 font-bold font-poppins p-2.5"
                >
                  {t.task}
                  <MdDeleteForever
                    onClick={() => deleteTask(t._id)}
                    className="float-right text-red-600 text-[25px] hover:scale-125"
                  />
                </p>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
