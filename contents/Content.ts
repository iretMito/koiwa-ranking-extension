// Content script

// 送信済みかどうかを管理するフラグ
let isSent = false;
// 次の問題へ進む右矢印ボタンを押した時
document.getElementById('mtq_next_button-1')?.addEventListener('click', function (): void {

  const text = (document.getElementById('mtq_quiz_status-1')?.textContent) || '';

  if (text.includes('現在のあなたの成績')) {
    const matchResult: RegExpMatchArray | null = text.match(/\d+\/\d+/);
    const result = matchResult ? matchResult[0] : '';
    // resultの1文字目を取得
    const matchScore: RegExpMatchArray | null = result.match(/\d/);
    const score = matchScore ? matchScore[0] : '';
    // resultの最後の数字を取得
    const matchCount: RegExpMatchArray | null = result.match(/\d+$/);
    const count = matchCount ? matchCount[0] : '';

    if (count === '7' && !isSent) {
      // 7問回答済み かつ 未送信であればAPIに送る
      const headerElement = document.querySelector('header.entry-header h1.entry-title');
      let exam = '';
      if (headerElement) {
        exam = headerElement.textContent ? headerElement.textContent.split('#')[0] : '';
      }
      // const exam: string = $('header.entry-header h1.entry-title').text().split('#')[0];
      console.log('EXAM: ' + exam);
      console.log('SCORE: ' + score);

      const today= getNowYMDStr()
      console.log('DATE: ' + today);
      // APIに投げる
      const request: { [key: string]: string | number } = {
        'name': 'ryota', //仮
        'exam': exam,
        'score': parseInt(score),
        'date': today
      };

      // https://i5kya0dprh.execute-api.ap-northeast-1.amazonaws.com/ProdにPost
      const url = 'https://i5kya0dprh.execute-api.ap-northeast-1.amazonaws.com/Prod/save_score'; // 送信先のURL
      fetch(url, {
        method: 'POST', // メソッドをPOSTに設定
        headers: {
          'Content-Type': 'application/json' // ヘッダーにContent-Typeを設定
        },
        body: JSON.stringify(request) // リクエストボディにJSONを設定
      })
          .then(response => response.json()) // レスポンスをJSONとして解析
          .then(data => console.log(data)) // レスポンスデータをコンソールに出力
          .then(() => { isSent = true }) // 'isSent' を true に設定
          .catch(error => console.error('Error:', error)); // エラーをコンソールに出力
    }
  }
});

/**
 * 今日の日付をYYYY-MM-DD形式で返す
 * @returns {string}
 */
function getNowYMDStr(): string {
  const date: Date = new Date();
  // yyyy-mm-dd形式で返す
  const Y: number = date.getFullYear();
  const M: string = ('00' + (date.getMonth() + 1).toString()).slice(-2);
  const D: string = ('00' + date.getDate().toString()).slice(-2);

  return `${Y}-${M}-${D}`;
}