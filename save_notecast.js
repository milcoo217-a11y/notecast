const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const tempFile = path.join(__dirname, '.notecast_temp.json');
const excelFile = path.join(__dirname, 'notecast_history.xlsx');

if (!fs.existsSync(tempFile)) {
  console.error('저장할 데이터가 없습니다. /notecast-save 를 통해 실행해주세요.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
const sheetName = data.date.substring(0, 7); // "2026-04"

let workbook;
if (fs.existsSync(excelFile)) {
  workbook = XLSX.readFile(excelFile);
} else {
  workbook = XLSX.utils.book_new();
}

if (!workbook.Sheets[sheetName]) {
  const ws = XLSX.utils.aoa_to_sheet([['날짜', '용도', '원문 메모', 'Markdown 결과', 'Plain Text 결과']]);
  // 컬럼 너비 설정
  ws['!cols'] = [
    { wch: 12 },
    { wch: 16 },
    { wch: 40 },
    { wch: 60 },
    { wch: 60 },
  ];
  XLSX.utils.book_append_sheet(workbook, ws, sheetName);
}

const worksheet = workbook.Sheets[sheetName];
XLSX.utils.sheet_add_aoa(worksheet, [[
  data.date,
  data.type,
  data.input,
  data.markdown,
  data.plain
]], { origin: -1 });

XLSX.writeFile(workbook, excelFile);

// 임시 파일 삭제
fs.unlinkSync(tempFile);

console.log(`✅ 저장 완료 — notecast_history.xlsx / [${sheetName}] 시트`);
