import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Content Factory — 一键生成全平台营销内容',
  description: 'AI 自动生成小红书笔记、抖音脚本、电商文案、朋友圈文案、Twitter 推文，5 秒搞定全平台营销内容',
  keywords: 'AI内容生成, 小红书笔记, 抖音脚本, 电商文案, AI营销工具, content generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
