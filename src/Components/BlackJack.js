import React, { useEffect } from 'react';
import { useState } from 'react';
import './BlackJack.css';

export default function BlackJack() {
  // 카드 문양
  const shape = ['spade', 'club', 'dia', 'heart'];
  // 카드 숫자
  const number = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  // 전체 카드
  const card = [];
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < number.length; j++) {
      let data = { sha: shape[i], num: number[j] };
      // let data = shape[i] + number[j];
      card.push(data);
    }
  }

  // 플레이어 1, 2
  const [player, setPlayer] = useState({ sha: '', num: 0 });
  const [dealer, setDealer] = useState({ sha: '', num: 0 });
  const [cardList, setCardList] = useState();
  const [hitCard, setHitCard] = useState({
    turnOnP: false,
    turnOnD: false,
  });

  // 렌덤으로 index 뽑기
  // const random = Math.floor(Math.random() * card.length + 1);

  // game start 버튼 클릭 시 랜덤 카드 2개 부여
  const onClickStart = () => {
    const playerCardSha = [];
    const playerCardNum = [];
    const dealerCardSha = [];
    const dealerCardNum = [];
    // 하나 뽑고 뽑은 카드 리스트에서 제거하고 다음 카드 뽑고 그 카드도 리스트에서 제거하고 다음 카드도 뽑고 리스트에서 제거하고 ~~
    for (let i = 0; i < 2; i++) {
      playerCardSha.push(cardList[Math.floor(Math.random() * cardList.length)].sha);
      playerCardNum.push(cardList[Math.floor(Math.random() * cardList.length)].num);
      dealerCardSha.push(cardList[Math.floor(Math.random() * cardList.length)].sha);
      dealerCardNum.push(cardList[Math.floor(Math.random() * cardList.length)].num);
    }
    setPlayer({ ...player, sha: playerCardSha, num: playerCardNum });
    setDealer({ ...dealer, sha: dealerCardSha, num: dealerCardNum });
    // setDealer(dealerCard);
  };

  const onClickReset = () => {
    setPlayer({ sha: '', num: 0 });
    setDealer({ sha: '', num: 0 });
    setHitCard({ turnOnP: false, turnOnD: false });
  };

  // player hit
  const onClickHit1 = () => {
    const playerCardSha = player.sha;
    const playerCardNum = player.num;
    playerCardSha.push(card[Math.floor(Math.random() * card.length)].sha);
    playerCardNum.push(card[Math.floor(Math.random() * card.length)].num);
    setPlayer({ sha: playerCardSha, num: playerCardNum });
    setHitCard({ ...hitCard, turnOnP: true });
  };

  // dealer hit
  const onClickHit2 = () => {
    const dealerCardSha = dealer.sha;
    const dealerCardNum = dealer.num;
    dealerCardSha.push(card[Math.floor(Math.random() * card.length)].sha);
    dealerCardNum.push(card[Math.floor(Math.random() * card.length)].num);
    setDealer({ sha: dealerCardSha, num: dealerCardNum });
    setHitCard({ ...hitCard, turnOnD: true });
  };

  // plaerScore 계산
  let playerScore = 0;
  for (let i = 0; i < player.num.length; i++) {
    if (player.num[i] == 'A') {
      playerScore += 11;
    } else if (player.num[i] === 'J' || player.num[i] === 'Q' || player.num[i] === 'K') {
      playerScore += 10;
    } else {
      playerScore += player.num[i];
    }
  }

  // dealerScore 계산
  let dealerScore = 0;
  for (let i = 0; i < dealer.num.length; i++) {
    if (dealer.num[i] == 'A') {
      dealerScore += 11;
    } else if (dealer.num[i] === 'J' || dealer.num[i] === 'Q' || dealer.num[i] === 'K') {
      dealerScore += 10;
    } else {
      dealerScore += dealer.num[i];
    }
  }

  useEffect(() => {
    setCardList(card);
  }, []);

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>BlackJack</h2>
      <div className='marginB'>
        <button onClick={onClickStart}>Game Start</button>
        <button onClick={onClickReset}>Reset</button>
      </div>
      <div className='wrap1'>
        <div className='marginB'>
          <button onClick={onClickHit1}>hit</button>
          <h4>player</h4>
          <br />
          <div className='wrap2'>
            <div className='cardStyle'>
              <div className='cardItem'>
                {player.sha[0]} {player.num[0]}
              </div>
            </div>
            <br />
            <div className='cardStyle'>
              <div className='cardItem'>
                {player.sha[1]} {player.num[1]}
              </div>
            </div>
            <br />
            {hitCard.turnOnP === true ? (
              <div className='cardStyle'>
                <div className='cardItem'>
                  {player.sha[2]} {player.num[2]}
                </div>
              </div>
            ) : null}
          </div>
          <br />
          숫자 합: {playerScore}
        </div>
        <div>
          <button onClick={onClickHit2}>hit</button>
          <h4>dealer</h4>
          <br />
          <div className='wrap2'>
            <div className='cardStyle'>
              <div className='cardItem'>
                {dealer.sha[0]} {dealer.num[0]}
              </div>
            </div>
            <br />
            <div className='cardStyle'>
              <div className='cardItem'>
                {dealer.sha[1]} {dealer.num[1]}
              </div>
            </div>
            <br />
            {hitCard.turnOnD === true ? (
              <div className='cardStyle'>
                <div className='cardItem'>
                  {dealer.sha[2]} {dealer.num[2]}
                </div>
              </div>
            ) : null}
          </div>
          <br />
          숫자 합: {dealerScore}
        </div>
      </div>
    </div>
  );
}
