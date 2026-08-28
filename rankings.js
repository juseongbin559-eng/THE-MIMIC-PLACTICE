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
