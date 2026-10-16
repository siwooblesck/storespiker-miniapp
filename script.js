(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready(); tg.expand();
    try { tg.setHeaderColor('#090b12'); tg.setBackgroundColor('#090b12'); } catch (_) {}
  }
  // Demo values only. Never use frontend values for real currency/card transactions.
  const demo = {coins:1250,cards:27,level:4};
  const $ = s => document.querySelector(s);
  function toast(message) {
    const el=$('#toast'); el.textContent=message; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2600);
    try { tg?.HapticFeedback?.impactOccurred('light'); } catch (_) {}
  }
  $('#heroCoins').textContent=demo.coins.toLocaleString('ru-RU');
  $('#heroCards').textContent=demo.cards;
  $('#heroLevel').textContent=demo.level;
  const info={
    home:'Главная StoreSpiker',
    collection:'Коллекция будет подключена к каталогу cards.json.',
    team:'Здесь появится выбор состава и расчёт химии команды.',
    awakening:'Здесь появятся пробуждение карт и осколки.',
    camp:'Здесь появятся задания лагеря и сбор наград.',
    boss:'Здесь будет общая шкала здоровья босса недели.',
    league:'Здесь будут дивизионы и сезонный рейтинг.',
    shop:'Магазин подключим к балансу на сервере бота.',
    quests:'Задания синхронизируем с ботом.',
    profile:'Профиль подключим к Telegram ID и данным бота.'
  };
  function openScreen(name) {
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));
    if(name==='home') { window.scrollTo({top:0,behavior:'smooth'}); return; }
    toast(info[name]||'Раздел готовится к подключению.');
  }
  function draw() {
    const message='Получение карты будет подключено через защищённый API StoreSpiker. Этот прототип не выдаёт карты и не изменяет баланс.';
    if(tg?.showPopup) tg.showPopup({title:'Получить карту',message,buttons:[{type:'ok',text:'Понятно'}]});
    else toast('Открой приложение из Telegram-бота для полной интеграции.');
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b)return;
    if(b.dataset.action==='draw') return draw();
    if(b.dataset.screen) return openScreen(b.dataset.screen);
  });
  $('#profileShortcut')?.addEventListener('click',()=>openScreen('profile'));
})();