import { useState } from 'react';
import { detailContent, question } from './libs';
import { everyLanguage, Language } from './types';

export function ResultDetail({ detailModal, close }: { detailModal: Language; close: () => void }) {
  return (
    <div className='detail-container'>
      <div className='detail'>
        <div className='header'>
          <div className='title'>{detailModal}</div>
          <div>
            <button
              onClick={() => {
                close();
              }}
            >
              닫기
            </button>
          </div>
        </div>
        <div className='body'>{detailContent[detailModal]}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [qNumber, setQNumber] = useState<number>(0);
  const [questionOrder, setQuastionOrder] = useState<{ [x in number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [answer, setAnswer] = useState<{ [x in number]: number }>({});
  const [detailModal, setDetailModal] = useState<Language>();

  const qMap: [number, number][] = [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],

    [2, 3],
    [2, 4],
    [2, 5],

    [3, 4],
    [3, 5],

    [4, 5],

    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],

    [2, 3],
    [2, 4],
    [2, 5],

    [3, 4],
    [3, 5],

    [4, 5],

    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],

    [2, 3],
    [2, 4],
    [2, 5],

    [3, 4],
    [3, 5],

    [4, 5],
  ];

  return (
    <>
      <main>
        {result ? (
          <section className='result'>
            <div className='result-title'>점수 확인</div>
            <div className='result-table'>
              {([1, 2, 3, 4, 5] as const)
                .map((languageId) =>
                  Object.values(answer).reduce((pre, cur) => {
                    return cur === languageId ? pre + 1 : pre;
                  }, 0)
                )
                .map((pt, i) => {
                  const l = everyLanguage[i];
                  return (
                    <div key={i} style={{ order: `${13 - pt}` }}>
                      <div>{l}</div>
                      <div>{pt}pt</div>
                      <div>
                        <div
                          onClick={() => {
                            setDetailModal(l);
                          }}
                        >
                          상세
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {detailModal && (
              <ResultDetail
                detailModal={detailModal}
                close={() => {
                  setDetailModal(undefined);
                }}
              />
            )}
          </section>
        ) : (
          <section>
            {started ? (
              <article>
                {/* <div style={{ color: 'var(--secondary-color)', textAlign: 'center' }}>
                  더 의미있는 상황(또는 중요한 행동)을 선택해주세요.
                </div> */}
                <div className='contents'>
                  <div
                    data-selected={answer[qNumber] === qMap[qNumber][0]}
                    onClick={() => {
                      setAnswer({ ...answer, [qNumber]: qMap[qNumber][0] });
                    }}
                  >
                    {question[qMap[qNumber][0]][questionOrder[qMap[qNumber][0]]]}
                  </div>
                  <div className='separator'>
                    <span>VS</span>
                  </div>
                  <div
                    data-selected={answer[qNumber] === qMap[qNumber][1]}
                    onClick={() => {
                      setAnswer({ ...answer, [qNumber]: qMap[qNumber][1] });
                    }}
                  >
                    {question[qMap[qNumber][1]][questionOrder[qMap[qNumber][1]]]}
                  </div>
                </div>
                <div className='controler'>
                  {qNumber > 0 ? (
                    <div
                      className='pre'
                      onClick={() => {
                        const preOrder = questionOrder;
                        qMap[qNumber - 1].forEach((i) => {
                          preOrder[i]--;
                        });
                        setQuastionOrder(preOrder);
                        setQNumber(qNumber - 1);
                      }}
                    >
                      이전
                    </div>
                  ) : undefined}
                  {answer[qNumber] ? (
                    qMap[qNumber + 1] ? (
                      <div
                        className='next'
                        onClick={() => {
                          const nextOrder = questionOrder;
                          qMap[qNumber].forEach((i) => {
                            nextOrder[i]++;
                          });
                          setQuastionOrder(nextOrder);
                          setQNumber(qNumber + 1);
                        }}
                      >
                        다음
                      </div>
                    ) : (
                      <div
                        style={{ backgroundColor: 'var(--tertiary-color)' }}
                        className='result'
                        onClick={() => {
                          setResult(true);
                        }}
                      >
                        결과 보기
                      </div>
                    )
                  ) : undefined}
                </div>
              </article>
            ) : (
              <>
                <div className='start'>
                  <div>사랑 언어 테스트</div>
                  <button
                    onClick={() => {
                      setStarted(true);
                    }}
                  >
                    START!
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </main>
      <footer>
        <h5>
          <div
            onClick={() => {
              window.location.href = 'https://brunch.co.kr/@jazz0814/58';
            }}
          >
            출처: 5가지 사랑의 언어 테스트, 당신의 사랑의 언어는?
          </div>
        </h5>
      </footer>
    </>
  );
}
