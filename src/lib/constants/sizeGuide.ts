/**
 * Bảng hướng dẫn chọn size chuẩn cho bé theo tháng tuổi, cân nặng và chiều cao
 */

export interface SizeChartRow {
  size: string;
  age: string;
  weight: string;
  height: string;
}

export const SIZE_CHART_BABY: SizeChartRow[] = [
  { size: "0 - 3M", age: "0 - 3 tháng", weight: "3.5 - 5.5 kg", height: "50 - 59 cm" },
  { size: "3 - 6M", age: "3 - 6 tháng", weight: "5.5 - 7.5 kg", height: "60 - 66 cm" },
  { size: "6 - 9M", age: "6 - 9 tháng", weight: "7.5 - 9.0 kg", height: "67 - 72 cm" },
  { size: "9 - 12M", age: "9 - 12 tháng", weight: "9.0 - 10.5 kg", height: "73 - 78 cm" },
];

export const SIZE_CHART_KIDS: SizeChartRow[] = [
  { size: "Size 1", age: "9 - 18 tháng", weight: "8 - 10 kg", height: "75 - 83 cm" },
  { size: "Size 2", age: "18 - 24 tháng", weight: "10 - 12 kg", height: "84 - 90 cm" },
  { size: "Size 3", age: "2 - 3 tuổi", weight: "12 - 15 kg", height: "91 - 98 cm" },
  { size: "Size 4", age: "3 - 4 tuổi", weight: "15 - 18 kg", height: "99 - 106 cm" },
  { size: "Size 5", age: "4 - 5 tuổi", weight: "18 - 22 kg", height: "107 - 115 cm" },
];
