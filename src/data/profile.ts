// Transcribed and visually verified against public/resume.pdf.
export const profile = {
  name: '钱星宇', englishName: 'Xingyu Qian',
  description: '钱星宇，北京大学软件工程硕士研究生。关注 Agent Harness、Coding Agent Runtime、Context Engineering 与 Agent Reliability。',
  email: '729194587@qq.com',
  github: 'https://github.com/729194587', // Profile link supplied by the owner.
  about: '关注 Agent Harness、Context Engineering 与 Agent Reliability，具备 Coding Agent Runtime 的设计、实现与评测实践。重点关注长程 Agent 中的上下文管理、故障恢复、任务验证与运行时可观测性。',
};
export const commands = [
  { name: '/about', label: '关于我', hint: '关于' },
  { name: '/projects', label: '项目经历', hint: '项目' },
  { name: '/education', label: '教育背景', hint: '教育' },
  { name: '/skills', label: '技术能力', hint: '技能' },
  { name: '/contact', label: '联系我', hint: '联系' },
];
export const contributions = [
  { title: 'Runtime 架构与执行控制', text: '围绕最小 Agent Loop 构建轻量 Coding Agent Harness，实现 Function Calling、Tool Execution、Permission、Hooks 与 Skills 等运行时能力，由 Runtime 统一管理工具执行与权限约束。' },
  { title: 'Context Engineering 与成本优化', text: '实现 Tool Result Spill、Token Budget 与 Provider Usage Anchor，采用 cache-first 的上下文管理策略：正常路径保持 history append-only，仅在接近 Context Budget 时按需 compaction。结合 Provider usage 观测 Token/Cache 成本，在固定任务集上将 Prefix Cache Hit Rate 提升至 95.5%。' },
  { title: 'SWE-bench 评测体系', text: '打通 SWE-bench Task → Docker Workspace → TinyHarness/DeepSeek → Patch → Official Evaluator 评测链路。对 23 个 Dev candidate 进行 evaluator-only calibration，筛选 15 个可复现任务作为固定 regression / A/B 评测集，取得 14/15 Official Resolved。' },
  { title: 'Observability 与 Failure Analysis', text: '记录 trajectory、Tool Call、首次代码修改及 Context/Token/Cache 等运行指标。基于固定任务 A/B 进行 Failure Analysis，定位 compaction 信息损失、探索过度与 fail-to-act 等长程 Agent failure mode，并验证 Harness 策略改动。' },
];
export const skills = [
  { name: 'Agent Harness', items: ['Agent Loop', 'Function Calling', 'Tool Execution', 'Permission / Hooks', 'Context Management'] },
  { name: 'Eval & Reliability', items: ['SWE-bench', 'Trajectory Analysis', 'Task Verification', 'Failure Analysis', 'Token / Cache Observability'] },
];
