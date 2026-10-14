export interface Project {
  name: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
}

export const projects: Project[] = [
  {
    name: 'TinyHarness',
    category: 'Coding Agent Harness',
    description: '一个轻量 Coding Agent Harness，重点涉及工具执行、权限控制、上下文管理、故障恢复及 SWE-bench 评测。',
    tags: ['Tool Execution', 'Permissions', 'Context Management', 'Recovery', 'SWE-bench'],
    url: 'https://github.com/729194587/tiny_harness',
  },
];
