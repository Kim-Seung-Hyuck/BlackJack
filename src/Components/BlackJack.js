import React from 'react';
import { useState } from 'react';

// git test
export default function BlackJack() {
  // 카드 문양
  const shape = ['spade', 'club', 'dia', 'heart'];
  // 카드 숫자
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
  // 전체 카드
  const card = [];
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < number.length; j++) {
      //   let data = { sha: shape[i], num: number[j] };
      let data = shape[i] + number[j];
      card.push(data);
    }
  }

  // 플레이어 1, 2
  //   const [user1, setUser1] = useState({ cardList: [] });
  const [user1, setUser1] = useState([]);
  const [user2, setUser2] = useState([]);

  // 렌덤으로 index 뽑기
  const random = Math.floor(Math.random() * card.length + 1);

  // game start 버튼 클릭 시 랜덤 카드 2개 부여
  const onClickStart = () => {
    const user1Card = [];
    const user2Card = [];
    for (let i = 0; i < 2; i++) {
      user1Card.push(card[Math.floor(Math.random() * card.length)]);
      user2Card.push(card[Math.floor(Math.random() * card.length)]);
    }
    // setUser1({ cardList: user1Card });
    setUser1(user1Card);
    setUser2(user2Card);
  };

  const onClickHit1 = () => {
    const user1Card = [];
    user1Card.push(user1);
    user1Card.push(card[Math.floor(Math.random() * card.length)]);
    setUser1(user1Card);
  };
  const onClickHit2 = () => {
    const user2Card = [];
    user2Card.push(user2);
    user2Card.push(card[Math.floor(Math.random() * card.length)]);
    setUser2(user2Card);
  };

  return (
    <div>
      <h2>BlackJack</h2>
      <div>
        <button onClick={onClickStart}>Game Start</button>
      </div>
      <div>
        <button onClick={onClickHit1}>hit</button>
        <h4>player1 : {user1}</h4>
      </div>
      <div>
        <button onClick={onClickHit2}>hit</button>
        <h4>player2 : {user2}</h4>
      </div>
    </div>
  );
}
