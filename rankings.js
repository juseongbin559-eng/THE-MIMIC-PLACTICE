// ==========================================
// 1. 종목별 최고 기록 (Personal Best) 시스템
// ==========================================

// 화면의 최고 기록 UI 업데이트
function loadBestRecords() {
  const games = ['wiring', 'kanji', 'fuse'];

  games.forEach(gameType => {
    const bestRecord = localStorage.getItem(`best_${gameType}`);
    const recordElement = document.getElementById(`record-${gameType}`);

    if (recordElement) {
      recordElement.textContent = bestRecord ? `${parseFloat(bestRecord).toFixed(2)}초` : '기록 없음';
    }
  });
}

// 새로운 기록 달성 판정 및 저장
function updateBestRecord(gameType, clearTime) {
  const currentBest = localStorage.getItem(`best_${gameType}`);
  let isNewRecord = false;

  // 기존 기록이 없거나 더 빠른 시간 달성 시
  if (!currentBest || clearTime < parseFloat(currentBest)) {
    localStorage.setItem(`best_${gameType}`, clearTime);
    alert(`🎉 [${getGameTitle(gameType)}] 신기록 달성!\n기록: ${clearTime.toFixed(2)}초`);
    isNewRecord = true;
  } else {
    alert(`클리어! 소요 시간: ${clearTime.toFixed(2)}초\n(최고 기록: ${parseFloat(currentBest).toFixed(2)}초)`);
  }

  loadBestRecords(); // UI 즉시 갱신
  checkAchievements(gameType, clearTime); // 업적 달성 여부 검사
  return isNewRecord;
}

// 종목 ID -> 한글 이름 변환
function getGameTitle(gameType) {
  const titles = {
    wiring: '전선 연결',
    kanji: '한자 쓰기',
    fuse: '퓨즈 박스'
  };
  return titles[gameType] || '미니게임';
}


// ==========================================
// 2. 업적 (Achievements) 시스템
// ==========================================

// 업적 정의 목록
const ACHIEVEMENTS = [
  { id: 'first_clear', title: '첫 걸음', desc: '아무 미니게임이나 1회 클리어' },
  { id: 'speed_demon', title: '스피드 레이서', desc: '아무 미니게임 3초 이내 클리어' },
  { id: 'wiring_master', title: '전기 기사', desc: '전선 연결 5초 이내 클리어' },
  { id: 'kanji_master', title: '서예가', desc: '한자 쓰기 7초 이내 클리어' },
  { id: 'fuse_master', title: '엔지니어', desc: '퓨즈 박스 4초 이내 클리어' }
];

// 업적 획득 처리 함수
function unlockAchievement(achievementId) {
  const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');

  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId);
    localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));

    const target = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (target) {
      alert(`🏆 업적 달성!: [${target.title}]\n- ${target.desc}`);
    }
    loadAchievements(); // UI 업데이트
  }
}

// 게임 클리어 후 조건 판단
function checkAchievements(gameType, clearTime) {
  // 1. 첫 클리어 업적
  unlockAchievement('first_clear');

  // 2. 3초 이내 클리어 업적
  if (clearTime <= 3.0) {
    unlockAchievement('speed_demon');
  }

  // 3. 종목별 타임어택 업적
  if (gameType === 'wiring' && clearTime <= 5.0) unlockAchievement('wiring_master');
  if (gameType === 'kanji' && clearTime <= 7.0) unlockAchievement('kanji_master');
  if (gameType === 'fuse' && clearTime <= 4.0) unlockAchievement('fuse_master');
}

// 업적 UI 업데이트
function loadAchievements() {
  const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
  const container = document.getElementById('achievements-list');

  if (!container) return;

  container.innerHTML = ''; // 기존 목록 초기화

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    const item = document.createElement('div');
    item.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    item.innerHTML = `
      <div class="ach-title">${isUnlocked ? '🏆' : '🔒'} ${ach.title}</div>
      <div class="ach-desc">${ach.desc}</div>
    `;
    container.appendChild(item);
  });
}


// ==========================================
// 3. 페이지 로드 시 초기화
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  loadBestRecords();
  loadAchievements();
});
