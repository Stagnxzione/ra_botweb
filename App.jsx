import { useEffect } from "react";

function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const tg = window.Telegram?.WebApp;
    const initData = tg?.initData;

    const resp = await fetch("https://your-server.com/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Telegram-Init-Data": initData,
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();
    tg?.showAlert(`Заявка создана: ${result.ticket_id || "ошибка"}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Создать заявку</h3>
      <form onSubmit={handleSubmit}>
        <label>Тип происшествия:
          <select name="incident_type">
            <option value="DTP">ДТП</option>
            <option value="BREAK">Поломка</option>
          </select>
        </label><br /><br />
        <label>Марка:
          <select name="brand">
            <option value="KIA_CEED">Kia Ceed</option>
            <option value="SITRAK">Sitrak</option>
          </select>
        </label><br /><br />
        <label>Госномер ВАТС: <input name="plate_vats" /></label><br /><br />
        <label>Госномер рефа/пп: <input name="plate_ref" /></label><br /><br />
        <label>Локация: <input name="location" /></label><br /><br />
        <label>Описание: <textarea name="problem_desc" /></label><br /><br />
        <label>Заметки: <textarea name="notes" /></label><br /><br />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

export default App;
