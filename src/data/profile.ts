export const profile = {
  name: '钱星宇',
  englishName: 'Xingyu Qian',
  title: '软件工程硕士在读 · 北京大学',
  description: '钱星宇（Xingyu Qian），北京大学软件工程硕士在读，关注 Agent Harness、Coding Agent Runtime、Context Engineering 与 Agent Reliability。',
  about: '目前就读于北京大学软件与微电子学院，关注 Coding Agent 的运行机制，以及支撑其可靠执行任务的基础设施。',
  email: '729194587@qq.com',
  github: 'https://github.com/729194587',
};

export const navigation = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '教育', href: '#education' },
  { label: '技术', href: '#skills' },
  { label: '联系', href: '#contact' },
];

export const education = [
  { school: '北京大学', department: '软件与微电子学院', degree: '软件工程 · 硕士在读', start: '2025-09', end: '2028-06', period: '2025.09 — 2028.06（预计）' },
  { school: '辽宁大学', department: '', degree: '计算机科学与技术 · 本科', start: '2021-09', end: '2025-06', period: '2021.09 — 2025.06' },
];

// 仅列出已确认的关注方向，不推断技术栈或熟练程度。
export const skills = [
  { name: 'Agent Harness', detail: '工具执行与权限控制' },
  { name: 'Coding Agent Runtime', detail: 'Agent 运行机制' },
  { name: 'Context Engineering', detail: '上下文管理' },
  { name: 'Agent Reliability', detail: '故障恢复与 SWE-bench 评测' },
];
