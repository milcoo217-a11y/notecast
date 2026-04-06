# NoteCast

비정형 메모나 회의 내용을 **전문적인 비즈니스 메시지**로 구조화해주는 Claude Code 커스텀 커맨드입니다.

---

## 커맨드 종류

| 커맨드 | 설명 |
|--------|------|
| `/notecast` | 메모를 구조화된 비즈니스 메시지로 변환 |
| `/notecast-save` | 메모 변환 + 결과를 Excel 히스토리 파일에 저장 |

---

## 주요 기능

- 메모 내용을 자동 분석해 **보고 / 지시 / 질문** 유형으로 분류
- 유형에 맞는 구조로 재정리 (현황 → 결정 사항 등)
- **Markdown 버전**과 **Plain Text 버전** 동시 출력
  - Markdown: Teams, Notion, GitHub 등 붙여넣기용
  - Plain Text: 카카오톡, 이메일, 일반 메신저용
- `/notecast-save` 사용 시 `notecast_history.xlsx`에 날짜별로 자동 저장

---

## 설치 방법

### 1. 파일 복사

이 저장소의 파일을 Claude Code 프로젝트의 `.claude/commands/` 폴더에 복사합니다.

```
your-project/
├── .claude/
│   └── commands/
│       ├── notecast.md        ← /notecast 커맨드
│       └── notecast-save.md   ← /notecast-save 커맨드
├── save_notecast.js           ← Excel 저장 스크립트
└── package.json
```

> `.claude/commands/` 폴더가 없으면 직접 만들어 주세요.

### 2. 의존성 설치 (`/notecast-save` 사용 시 필요)

```bash
npm install
```

> `xlsx` 패키지를 사용해 Excel 파일을 생성합니다.

---

## 사용 방법

### `/notecast` — 메모 구조화

```
/notecast [메모 내용]
```

태그를 붙이면 유형을 강제 지정할 수 있고, 없으면 자동으로 판단합니다.

```
/notecast 오늘 디자인 검토 회의 내용. 3안으로 가기로 했고 박팀장 최종 승인 필요. 예산은 500만원 초과 가능성 있어서 재무팀 확인도 받아야 함.
```

```
/notecast [보고] 서버 이슈로 오늘 오전 10시~11시 30분 서비스 일시 중단됨. 원인은 DB 연결 문제였고 현재 정상화.
```

```
/notecast [지시] 내일까지 Q2 보고서 초안 각자 작성해서 공유 폴더에 올려주세요.
```

```
/notecast [질문] 상무님이 PMS에 WBS랑 레드마인 태스크 관리 기능 추가해달라는 건지, 아니면 레드마인 일정 관리를 잘해달라는 건지 헷갈림.
```

---

### `/notecast-save` — 메모 구조화 + Excel 저장

```
/notecast-save [메모 내용]
```

`/notecast`와 동일하게 동작하되, 변환 결과를 `notecast_history.xlsx`에 자동 저장합니다.
Excel 파일은 월별 시트(예: `[2026-04]`)로 관리됩니다.

```
/notecast-save 영업노트 기능의 외부망 오픈 방식 검토 완료. nginx에서 IP/URL 허용 목록 관리 방식으로 진행 예정. 컨펌 요청.
```

---

## 출력 예시

```
📌 용도: 보고 및 결정 요청 (승인이 필요한 안건 포함)

---

✅ Markdown 버전

**[디자인 검토 회의 결과 보고]**

**현황**
- 디자인 3안으로 진행 방향 결정

**결정 필요 사항**
- 박팀장 최종 승인 요청
- 예산 500만원 초과 가능성 → 재무팀 확인 필요

---

📄 Plain Text 버전

[디자인 검토 회의 결과 보고]

현황
- 디자인 3안으로 진행 방향 결정

결정 필요 사항
- 박팀장 최종 승인 요청
- 예산 500만원 초과 가능성 → 재무팀 확인 필요
```

---

## 요구사항

- [Claude Code](https://claude.ai/code) CLI 설치 필요
- `/notecast-save` 사용 시 Node.js 및 `npm install` 필요
