import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import performRequest from './api';

const Roulette = () => {
  const [wheel, setWheel] = useState(null);
  const [groupData, setGroupData] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [data, error] = await performRequest(`http://localhost:8000/api/foods/?eatgroup_id=${id}&Sh=1`);
      if (!error && data) {
        const segments = data.map((item, index) => ({
          'fillStyle': ['#eae56f', '#89f26e', '#7de6ef', '#e7706f'][index % 4],
          'text': item.Food,
        }));
        const newWheel = new window.Winwheel({
          'numSegments': data.length,
          'outerRadius': 300,
          'textFontSize': 20,
          'segments': segments,
          'animation': {
            'type': 'spinToStop',
            'duration': 5,
            'spins': 8,
            'callbackFinished': async (indicatedSegment) => {
              alert("你抽中了：" + indicatedSegment.text);
              // 假设你有一个变量customerName表示当前用户
              const customerName = data[0].Eatgroup_name;
              const foodName = indicatedSegment.text;

              const [test, error] = await performRequest(
                'http://localhost:8000/api/eatlogs/', 
                'POST', 
                { body: { Customer: customerName, Food: foodName } }
              );

              if (error) {
                console.error("Failed to save the winning food:", error);
              } else {
                console.log("Winning food saved successfully:", data);
              }
            }
          }
        });
        setWheel(newWheel);
      }
    };

    fetchData();
  }, [id]); // 依赖项包括id，确保id变化时重新获取数据
  useEffect(() => {
    const fetchGroupData = async () => {
      const [data, error] = await performRequest(`http://localhost:8000/api/foods/?eatgroup_id=${id}`);
      if (!error) {
        setGroupData(data); // 更新状态
      } else {
        console.error("Failed to fetch group data:", error);
      }
    };

    fetchGroupData(); // 调用函数来执行异步请求
  }, [id]); // 当id变化时重新执行

  const startSpin = () => {
    wheel?.startAnimation();

  };

  const Group = async () => {
    const [data, error] = await performRequest(`http://localhost:8000/api/eatgroups/?id=${id}`);
    return data
  }

  return (
    <div>
      <h1>       {groupData ? (
        <div>{groupData[0].Eatgroup_name}</div>
      ) : (
        <div>Loading...</div>
      )}</h1>
      <div>
      <canvas id="canvas" width="900" height="900">
        Canvas not supported, use another browser.
      </canvas>
      </div>
      <button onClick={startSpin}>開始</button>
    </div>
  );
};

export default Roulette;
