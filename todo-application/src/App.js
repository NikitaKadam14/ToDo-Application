import './App.css';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import InputComponent from './Components/InputComponent';
import PrimaryButtonComponent from './Components/PrimaryButtonComponent';
import { apiCall } from './Utils/ApiCall';
import { API_URLS } from './Utils/AppConst';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  const [addData, setAddData] = useState({
    title: "",
    description: ""
  });
  const [todos, setTodos] = useState([]);
  const handleInputChange = (event) => {

    setAddData({
      ...addData,
      [event.target.name]: event.target.value
    });

  };
  const getTodoCallBack = (response) => {
    console.log(response);
    if (response.status === 200) {
      setTodos(response.data);
    } else {
      console.log("Error");
    }
  };
  const getTodos = () => {
    apiCall({
      method: "GET",
      url: API_URLS.GET_TODOS,
      data: {},
      callback: getTodoCallBack,
    });

  };
  const addTodoCallBack = (response) => {
    console.log(response);
    if (response.status === 201) {
      getTodos();
      setAddData({
        title: "",
        description: ""
      });
    } else {
      console.log("Error");
    }
  };
  const handleAddTodo = () => {
    apiCall({
      method: "POST",
      url: API_URLS.ADD_TODO,
      data: addData,
      callback: addTodoCallBack,
    });
  };
  const completeTodoCallBack = (response) => {
    console.log(response);
    if (response.status === 200) {
      getTodos();
    } else {
      console.log("Error");
    }
  };
  const handleComplete = (id) => {

    apiCall({
      method: "PUT",
      url: `${API_URLS.COMPLETE_TODO}/${id}`,
      data: {},
      callback: completeTodoCallBack,
    });
  };
  const deleteTodoCallBack = (response) => {
    console.log(response);
    if (response.status === 200) {
      getTodos();
    } else {
      console.log("Error");
    }
  };
  const handleDelete = (id) => {

    apiCall({
      method: "DELETE",
      url: `${API_URLS.DELETE_TODO}/${id}`,
      data: {},
      callback: deleteTodoCallBack,
    });
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (

    <div className='p-10 bg-gray-100 min-h-screen'>
      <div className='font-bold text-center text-3xl mb-5'>
        TO-DO APP
      </div>
      <div className="bg-white w-[400px] mx-auto p-5 rounded-lg shadow-md">

        <InputComponent
          type="text"
          name="title"
          placeholder="Enter Title"
          value={addData.title}
          onChange={handleInputChange}
        />
        <InputComponent
          type="text"
          name="description"
          placeholder="Enter Description"
          value={addData.description}
          onChange={handleInputChange}
        />
        <PrimaryButtonComponent
          label="Add Todo"
          onClick={handleAddTodo}
        />

      </div>
      <div className='w-[400px] mx-auto mt-5'>

        {
          todos.map((item) => (

            <div
              key={item._id}
              className='bg-white shadow-md rounded-lg p-4 mb-3 flex justify-between items-center'
            >
              <div>

                <h1
                  className={`font-bold text-xl ${item.completed ? "line-through" : ""
                    }`}
                >
                  {item.title}
                </h1>

                <p
                  className={`${item.completed ? "line-through" : ""
                    }`}
                >
                  {item.description}
                </p>

              </div>
              <div className='flex gap-4 text-lg'>

                <i
                  className="fa fa-check text-green-500 cursor-pointer"
                  onClick={() => handleComplete(item._id)}
                ></i>

                <i
                  className="fa fa-trash text-red-500 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                ></i>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default App;