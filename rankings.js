// ==========================================
// 1. 데이터 정의 (가상 유저 삭제 / 개인 기록 & 업적)
// ==========================================

const GAMES = [
  { id: 'wiring', name: '🔌 전선 연결' },
  { id: 'kanji', name: '🧩 한자 쓰기' },
  { id: 'fuse', name: '⚡ 퓨즈 박스' }
];

const ACHIEVEMENTS = [
  { id: 'first_clear', icon: '🐣', title: '첫 걸음', desc: '아무 퍼즐이나 1회 클리어' },
  { id: 'speed_demon', icon: '⚡', title: '스피드 레이서', desc: '3초 이내에 퍼즐 클리어' },
  { id: 'wiring_master', icon: '🔌', title: '전기기사', desc: '전선 연결 5초 이내 클리어' },
  { id: 'kanji_master', icon: '✍️', title: '서예가', desc: '한자 쓰기 7초 이내 클리어' },
  { id: 'fuse_master', icon: '🛠️', title: '엔지니어', desc: '퓨즈 박스 4초 이내 클리어' }
];


// ==========================================
// 2. 종목별 최고 기록 (Personal Best) UI 출력
// ==========================================

function renderBestRecords() {
  const container = document.getElementById('records-grid');
  if (!container) return;

  container.innerHTML = ''; // 초기화

  GAMES.forEach(game => {
    const bestRecord = localStorage.getItem(`best_${game.id}`);
    const timeText = bestRecord ? `${parseFloat(bestRecord).toFixed(2)}초` : '기록 없음';

    const card = document.createElement('div');
    card.className = 'record-card';
    card.innerHTML = `
      <span class="game-title">${game.name}</span>
      <span class="record-value">${timeText}</span>
    `;
    container.appendChild(card);
  });
}

// 게임 완료 시 호출하는 기록 저장 함수
function updateBestRecord(gameId, clearTime) {
  const currentBest = localStorage.getItem(`best_${gameId}`);
  let isNew = false;

  if (!currentBest || clearTime < parseFloat(currentBest)) {
    localStorage.setItem(`best_${gameId}`, clearTime);
    alert(`🎉 신기록 달성!\n소요 시간: ${clearTime.toFixed(2)}초`);
    isNew = true;
  } else {
    alert(`클리어! 소요 시간: ${clearTime.toFixed(2)}초 (최고 기록: ${parseFloat(currentBest).toFixed(2)}초)`);
  }

  renderBestRecords(); // UI 갱신
  checkAchievements(gameId, clearTime); // 업적 검사
  return isNew;
}


// ==========================================
// 3. 업적 (Achievements) UI 출력
// ==========================================

function renderAchievements() {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
  container.innerHTML = '';

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);

    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
      <div class="ach-info">
        <div class="ach-title">${ach.title}</div>
        <div class="ach-desc">${ach.desc}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function unlockAchievement(achievementId) {
  const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');

  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId);
    localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));

    const target = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (target) {
      alert(`🏆 업적 달성!: [${target.title}]`);
    }
    renderAchievements(); // UI 갱신
  }
}

function checkAchievements(gameId, clearTime) {
  unlockAchievement('first_clear');
  if (clearTime <= 3.0) unlockAchievement('speed_demon');
  if (gameId === 'wiring' && clearTime <= 5.0) unlockAchievement('wiring_master');
  if (gameId === 'kanji' && clearTime <= 7.0) unlockAchievement('kanji_master');
  if (gameId === 'fuse' && clearTime <= 4.0) unlockAchievement('fuse_master');
}


// ==========================================
// 4. 초기화
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  renderBestRecords();
  renderAchievements();
});
// ==========================================
// 1. 모달 열기 / 닫기 로직
// ==========================================

function openRankings() {
  const modal = document.getElementById('rankings-modal');
  if (modal) {
    modal.classList.add('active');
    renderBestRecords(); // 열 때 최신 기록 갱신
    renderAchievements(); // 열 때 최신 업적 갱신
  }
}

function closeRankings() {
  const modal = document.getElementById('rankings-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// 배경 검은 영역 클릭 시 닫기
window.addEventListener('click', (e) => {
  const modal = document.getElementById('rankings-modal');
  if (e.target === modal) {
    closeRankings();
  }
});


// ==========================================
// 2. 종목별 최고 기록 & 업적 데이터/UI
// ==========================================

const GAMES = [
  { id: 'memory1', name: '기억력 퍼즐 1' },
  { id: 'memory2', name: '기억력 퍼즐 2' },
  { id: 'kanji', name: '한자 정화' },
  { id: 'numbers', name: '1~4 숫자' },
  { id: 'fuse', name: '퓨즈박스' },
  { id: 'wiring', name: '발전기 전선' }
];

const ACHIEVEMENTS = [
  { id: 'first_clear', icon: '🐣', title: '첫 걸음', desc: '아무 퍼즐이나 1회 클리어' },
  { id: 'speed_demon', icon: '⚡', title: '스피드 레이서', desc: '3초 이내 퍼즐 클리어' },
  { id: 'fuse_master', icon: '🛠️', title: '엔지니어', desc: '퓨즈박스 10초 이내 클리어' }
];

function renderBestRecords() {
  const container = document.getElementById('records-grid');
  if (!container) return;

  container.innerHTML = '';

  GAMES.forEach(game => {
    const bestRecord = localStorage.getItem(`best_${game.id}`);
    const timeText = bestRecord ? `${parseFloat(bestRecord).toFixed(2)}초` : '기록 없음';

    const card = document.createElement('div');
    card.className = 'record-card';
    card.innerHTML = `
      <span class="game-title">${game.name}</span>
      <span class="record-value">${timeText}</span>
    `;
    container.appendChild(card);
  });
}

function updateBestRecord(gameId, clearTime) {
  const currentBest = localStorage.getItem(`best_${gameId}`);

  if (!currentBest || clearTime < parseFloat(currentBest)) {
    localStorage.setItem(`best_${gameId}`, clearTime);
    alert(`🎉 신기록 달성!\n소요 시간: ${clearTime.toFixed(2)}초`);
  }

  checkAchievements(gameId, clearTime);
}

function renderAchievements() {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
  container.innerHTML = '';

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);

    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
      <div class="ach-info">
        <div class="ach-title">${ach.title}</div>
        <div class="ach-desc">${ach.desc}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function checkAchievements(gameId, clearTime) {
  unlockAchievement('first_clear');
  if (clearTime <= 3.0) unlockAchievement('speed_demon');
  if (gameId === 'fuse' && clearTime <= 10.0) unlockAchievement('fuse_master');
}

function unlockAchievement(achievementId) {
  const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');

  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId);
    localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
    alert(`🏆 업적 달성!`);
  }
}// Web Audio API 효과음 엔진
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'shoot') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(10, now + 0.12);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.start(now); osc.stop(now + 0.12);
  } else if (type === 'hit') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.start(now); osc.stop(now + 0.15);
  } else if (type === 'spider_dead') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523, now);
    osc.frequency.setValueAtTime(659, now + 0.1);
    osc.frequency.setValueAtTime(783, now + 0.2);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.start(now); osc.stop(now + 0.4);
  } else if (type === 'monster_appear') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(30, now + 0.5);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.start(now); osc.stop(now + 0.5);
  } else if (type === 'timing_success') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.start(now); osc.stop(now + 0.15);
  } else if (type === 'fail') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now); osc.stop(now + 0.3);
  }
}

// 거미 퍼즐 변수
let ammo = 15;
let spiderHp = 15;
let isHiddenGame = false;
let timingSuccessCount = 0;
let hiddenTimer = 10;
let timerInterval = null;

let angle = 0;
const centerX = 400;
const centerY = 275;
const scaleX = 250;
const scaleY = 120;
const speed = 0.055;

const spider = document.getElementById('spider');
const monster = document.getElementById('monster');
const ammoDisplay = document.getElementById('ammo');
const hpDisplay = document.getElementById('hp');
const gameContainer = document.getElementById('game-container');
const timingContainer = document.getElementById('timing-container');
const whiteZone = document.getElementById('white-zone');
const redBar = document.getElementById('red-bar');
const timingStatus = document.getElementById('timing-status');
const successCountDisplay = document.getElementById('success-count');
const hiddenTimerDisplay = document.getElementById('hidden-timer');
const overlay = document.getElementById('spider-overlay');

function openSpiderGame() {
  document.getElementById('spider-modal').classList.add('active');
  restartSpiderGame();
}

function closeSpiderGame() {
  document.getElementById('spider-modal').classList.remove('active');
  clearInterval(timerInterval);
  isHiddenGame = false;
}

function moveSpider() {
  const modal = document.getElementById('spider-modal');
  if (modal && modal.classList.contains('active') && !isHiddenGame && spiderHp > 0) {
    angle += speed;
    const x = centerX + (scaleX * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
    const y = centerY + (scaleY * Math.sin(angle) * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
    spider.style.left = `${x}px`;
    spider.style.top = `${y}px`;
  }
  requestAnimationFrame(moveSpider);
}
moveSpider();

if (gameContainer) {
  gameContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-modal-btn')) return;
    if (isHiddenGame || ammo <= 0 || spiderHp <= 0) return;

    ammo--;
    ammoDisplay.textContent = ammo;

    if (e.target === spider) {
      spiderHp--;
      hpDisplay.textContent = spiderHp;
      playSound('hit');

      spider.style.filter = 'brightness(3) contrast(1.5)';
      setTimeout(() => {
        spider.style.filter = 'brightness(1.7) contrast(1.2) grayscale(0.1)';
      }, 100);

      if (spiderHp <= 0) {
        playSound('spider_dead');
        spider.style.display = 'none';
        overlay.style.display = 'flex';
        const recordElem = document.getElementById('card-spider-record');
        if (recordElem) recordElem.textContent = '최고 기록: 클리어!';
        return;
      }
    } else {
      playSound('shoot');
    }

    if (ammo === 0 && spiderHp > 0) {
      startHiddenGame();
    }
  });
}

let redBarPos = 0;
let redBarSpeed = 10;
let redBarDir = 1;
let timingAnimationId = null;
let whiteZoneLeft = 0;

function startHiddenGame() {
  isHiddenGame = true;
  timingSuccessCount = 0;
  hiddenTimer = 10;

  playSound('monster_appear');

  monster.classList.add('active');
  timingContainer.classList.add('active');
  timingStatus.classList.add('active');
  successCountDisplay.textContent = timingSuccessCount;
  hiddenTimerDisplay.textContent = hiddenTimer;

  resetTimingBar();
  animateRedBar();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    hiddenTimer--;
    hiddenTimerDisplay.textContent = hiddenTimer;

    if (hiddenTimer <= 0) {
      clearInterval(timerInterval);
      playSound('fail');
      alert('⏰ 시간이 초과되었습니다!');
      startHiddenGame();
    }
  }, 1000);
}

function resetTimingBar() {
  whiteZoneLeft = Math.floor(Math.random() * (480 - 75 - 40)) + 20;
  whiteZone.style.left = `${whiteZoneLeft}px`;
  redBarPos = 0;
}

function animateRedBar() {
  if (!isHiddenGame) return;

  redBarPos += redBarSpeed * redBarDir;
  if (redBarPos >= 470) { redBarPos = 470; redBarDir = -1; }
  else if (redBarPos <= 0) { redBarPos = 0; redBarDir = 1; }

  redBar.style.left = `${redBarPos}px`;
  timingAnimationId = requestAnimationFrame(animateRedBar);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && isHiddenGame) {
    e.preventDefault();

    const redBarCenter = redBarPos + 5;
    const isSuccess = redBarCenter >= whiteZoneLeft && redBarCenter <= (whiteZoneLeft + 75);

    if (isSuccess) {
      playSound('timing_success');
      timingSuccessCount++;
      successCountDisplay.textContent = timingSuccessCount;

      if (timingSuccessCount >= 3) {
        endHiddenGame();
      } else {
        resetTimingBar();
      }
    } else {
      playSound('fail');
    }
  }
});

function endHiddenGame() {
  isHiddenGame = false;
  clearInterval(timerInterval);
  cancelAnimationFrame(timingAnimationId);

  monster.classList.remove('active');
  timingContainer.classList.remove('active');
  timingStatus.classList.remove('active');

  ammo = 15;
  ammoDisplay.textContent = ammo;
}

function restartSpiderGame() {
  ammo = 15;
  spiderHp = 15;
  isHiddenGame = false;
  clearInterval(timerInterval);

  ammoDisplay.textContent = ammo;
  hpDisplay.textContent = spiderHp;
  spider.style.display = 'block';
  overlay.style.display = 'none';

  monster.classList.remove('active');
  timingContainer.classList.remove('active');
  timingStatus.classList.remove('active');
}
