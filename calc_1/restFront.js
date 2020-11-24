document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const num1 = e.target.num1.value;
  const num2 = e.target.num2.value;
  const cal = e.target.cal.value;
  if (!num1) { return alert('num1 입력하세요'); }
  if (!num2) { return alert('num2 입력하세요'); }

  try {
    let result = "";
    if (cal === 'plus') {
      result = await axios.post('/plus', { num1, num2 });
    } else if (cal === 'minus') {
      result = await axios.post('/minus', { num1, num2 });
    } else if (cal === 'multi') {
      result = await axios.post('/multi', { num1, num2 });
    }

    alert('결과 : ' + JSON.stringify(result.data))
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
});
