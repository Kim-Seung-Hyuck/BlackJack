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
    result: 0,
  });

  // game start 버튼 클릭 시 랜덤 카드 2개 부여
  const onClickStart = () => {
    // const playerCardSha = [];
    // const playerCardNum = [];
    // const dealerCardSha = [];
    // const dealerCardNum = [];
    // const cardItems = cardList;
    // // 하나 뽑고 뽑은 카드 리스트에서 제거하고 다음 카드 뽑고 그 카드도 리스트에서 제거하고 다음 카드도 뽑고 리스트에서 제거하고 ~~
    // for (let i = 0; i < 2; i++) {
    //   playerCardSha.push(cardItems[Math.floor(Math.random() * cardItems.length)].sha);
    //   playerCardNum.push(cardItems[Math.floor(Math.random() * cardItems.length)].num);
    //   dealerCardSha.push(cardItems[Math.floor(Math.random() * cardItems.length)].sha);
    //   dealerCardNum.push(cardItems[Math.floor(Math.random() * cardItems.length)].num);
    //   cardItems.splice(playerCardNum[i], 1);
    //   cardItems.splice(dealerCardNum[i], 1);
    //   console.log(cardItems);
    // }

    const randomIndex = [];
    const playerCardSha = [];
    const playerCardNum = [];
    const dealerCardSha = [];
    const dealerCardNum = [];
    const cardItems = cardList;
    for (let i = 1; i < 5; i++) {
      const random = Math.floor(Math.random() * cardItems.length);
      randomIndex.push(random);
      if (i % 2 === 1) {
        playerCardSha.push(cardItems[randomIndex[i - 1]].sha);
        playerCardNum.push(cardItems[randomIndex[i - 1]].num);
        cardItems.splice(randomIndex[i - 1], 1);
      } else {
        dealerCardSha.push(cardItems[randomIndex[i - 1]].sha);
        dealerCardNum.push(cardItems[randomIndex[i - 1]].num);
        cardItems.splice(randomIndex[i - 1], 1);
      }
    }
    setPlayer({ ...player, sha: playerCardSha, num: playerCardNum });
    setDealer({ ...dealer, sha: dealerCardSha, num: dealerCardNum });
    setCardList(cardItems);

    // dealer 카드가 A, A가 나오는 경우
    if (dealerCardNum[0] === 'A' && dealerCardNum[1] === 'A') {
      setHitCard({ ...hitCard, result: 2 });
    }
  };

  // game reset
  const onClickReset = () => {
    setPlayer({ sha: '', num: 0 });
    setDealer({ sha: '', num: 0 });
    setCardList(card);
    setHitCard({ turnOnP: false, turnOnD: false, result: 0 });
  };

  // player hit(stay click)
  const onClickHitPlay = () => {
    const playerCardSha = player.sha;
    const playerCardNum = player.num;
    const cardItems = cardList;
    const random = Math.floor(Math.random() * cardItems.length);
    playerCardSha.push(cardItems[random].sha);
    playerCardNum.push(cardItems[random].num);
    cardItems.splice(random, 1);
    setPlayer({ sha: playerCardSha, num: playerCardNum });
    setHitCard({ ...hitCard, turnOnP: true });
    setCardList(cardItems);

    if (playerCardNum[2] === 'A') {
      if (playerScore > 10) {
        const playerCardNum = 1;
        if (playerScore + playerCardNum > 21) {
          setHitCard({ ...hitCard, result: 1, turnOnP: true });
        }
      } else {
        const playerCardNum = 11;
        if (playerScore + playerCardNum > 21) {
          setHitCard({ ...hitCard, result: 1, turnOnP: true });
        }
      }
    } else if (playerCardNum[2] === 'J' || playerCardNum[2] === 'Q' || playerCardNum[2] === 'K') {
      const playerCardNum = 10;
      if (playerScore + playerCardNum > 21) {
        setHitCard({ ...hitCard, result: 1, turnOnP: true });
      }
    }

    if (playerScore + playerCardNum[2] > 21) {
      setHitCard({ ...hitCard, result: 1, turnOnP: true });
    }
  };

  // dealer hit
  const onClickHitDeal = () => {
    // 경우 나누기 - 16 이하면 카드 추가, 17 이상이면 게임 끝
    const dealerCardSha = dealer.sha;
    const dealerCardNum = dealer.num;
    const cardItems = cardList;
    const random = Math.floor(Math.random() * cardItems.length);
    if (dealerScore <= 16) {
      dealerCardSha.push(cardItems[random].sha);
      dealerCardNum.push(cardItems[random].num);
      cardItems.splice(random, 1);
      setDealer({ sha: dealerCardSha, num: dealerCardNum });
      setHitCard({ ...hitCard, turnOnD: true });
      setCardList(cardItems);

      if (dealerCardNum[2] === 'A') {
        // 추가된 카드가 A 인 경우
        const dealerCardNum = 11;
        if (dealerScore + dealerCardNum <= 21) {
          if (dealerScore + dealerCardNum === playerScore) {
            // 무승부
            setHitCard({ ...hitCard, result: 3, turnOnD: true });
          } else if (dealerScore + dealerCardNum > playerScore) {
            // 딜러 win
            setHitCard({ ...hitCard, result: 1, turnOnD: true });
          } else {
            // 플레이어 win
            setHitCard({ ...hitCard, result: 2, turnOnD: true });
          }
        } else {
          // 딜러 21 초과 플레이어 win
          setHitCard({ ...hitCard, result: 2, turnOnD: true });
        }
      } else if (dealerCardNum[2] === 'J' || dealerCardNum[2] === 'Q' || dealerCardNum[2] === 'K') {
        // 추가된 카드가 J, Q, K 인 경우
        const dealerCardNum = 10;
        if (dealerScore + dealerCardNum <= 21) {
          if (dealerScore + dealerCardNum === playerScore) {
            // 무승부
            setHitCard({ ...hitCard, result: 3, turnOnD: true });
          } else if (dealerScore + dealerCardNum > playerScore) {
            // 딜러 win
            setHitCard({ ...hitCard, result: 1, turnOnD: true });
          } else {
            // 플레이어 win
            setHitCard({ ...hitCard, result: 2, turnOnD: true });
          }
        } else {
          // 딜러 21 초과 플레이어 win
          setHitCard({ ...hitCard, result: 2, turnOnD: true });
        }
      } else {
        // 추가된 카드가 A, J, Q, K가 아닌 경우
        if (dealerScore + dealerCardNum[2] <= 21) {
          if (dealerScore + dealerCardNum[2] === playerScore) {
            // 무승부
            setHitCard({ ...hitCard, result: 3, turnOnD: true });
          } else if (dealerScore + dealerCardNum[2] > playerScore) {
            // 딜러 win
            setHitCard({ ...hitCard, result: 1, turnOnD: true });
          } else {
            // 플레이어 win
            setHitCard({ ...hitCard, result: 2, turnOnD: true });
          }
        } else {
          // 딜러 21 초과 플레이어 win
          setHitCard({ ...hitCard, result: 2, turnOnD: true });
        }
      }
    } else {
      // 카드 합이 17 이상인 경우 - 승리/패배/무승부 판단하기
      if (dealerScore <= 21) {
        if (dealerScore === playerScore) {
          // 무승부
          setHitCard({ ...hitCard, result: 3 });
        } else if (dealerScore > playerScore) {
          // 딜러 win
          setHitCard({ ...hitCard, result: 1 });
        } else {
          // 플레이어 win
          setHitCard({ ...hitCard, result: 2 });
        }
      } else {
        // 딜러 21 초과 플레이어 win
        setHitCard({ ...hitCard, result: 2 });
      }
    }
  };

  // plaerScore 계산
  let playerScore = 0;
  for (let i = 0; i < player.num.length; i++) {
    if (player.num[i] == 'A') {
      if (playerScore > 10) {
        playerScore += 1;
      } else {
        playerScore += 11;
      }
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
    // 카드 세팅
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
        <div>
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
        <div className='marginB'>
          <button onClick={onClickHitPlay}>hit</button>
          <button onClick={onClickHitDeal}>stay</button>
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
      </div>
      <div>
        <h2>
          결과 :
          {hitCard.result === 1
            ? '딜러 승'
            : hitCard.result === 2
            ? '플레이어 승'
            : hitCard.result === 3
            ? '무승부'
            : ''}
        </h2>
      </div>
    </div>
  );
}
