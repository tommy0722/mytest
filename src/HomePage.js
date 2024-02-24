// HomePage.js

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function HomePage() {
  const [eatGroupData, setEatGroupData] = useState([]);
  const goToRoulette = (id) => {
    navigate(`/roulette/${id}`); 
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/eatgroups/")
      .then((response) => response.json())
      .then((data) => setEatGroupData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/eatgroups/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setEatGroupData(eatGroupData.filter((item) => item.id !== id));
        } else {
          alert("刪除失敗");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const navigate = useNavigate();


  return (
    <div>
      <h1>今天吃甚麼</h1>
      <table className="table">
        <thead>
          <tr>
            <th>群組</th>
            <th>修改</th>
          </tr>
        </thead>
        <tbody>
          {eatGroupData.map((item) => (
            <tr key={item.id}>
              <td>{item.Customer}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleUpdate(item.id)}>修改</button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => goToRoulette(item.id)}>進入輪盤</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default HomePage;
