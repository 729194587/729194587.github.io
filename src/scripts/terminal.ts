import { commands, profile } from '../data/profile';

const history = document.querySelector<HTMLDivElement>('#history')!;
const scroll = document.querySelector<HTMLDivElement>('.output-scroll')!;
const input = document.querySelector<HTMLInputElement>('#command-input')!;
const suggestions = document.querySelector<HTMLDivElement>('#suggestions')!;
const announcement = document.querySelector<HTMLDivElement>('#announcement')!;
const form = document.querySelector<HTMLFormElement>('#command-form')!;
const initialAbout = history.querySelector('.output')!.cloneNode(true);
const known = [...commands, { name: '/help', label: '使用指南' }, { name: '/clear', label: '清空屏幕' }];
const inputHistory: string[] = [];
let historyIndex = 0;
let draft = '';
let count = 1;
let composing = false;
let feedbackTimer: ReturnType<typeof setTimeout>;

function submissionFeedback() {
  clearTimeout(feedbackTimer);
  form.classList.add('is-submitted');
  feedbackTimer = setTimeout(() => form.classList.remove('is-submitted'), 180);
}

function say(message: string) { announcement.textContent = message; }
function closeSuggestions() { suggestions.hidden = true; suggestions.replaceChildren(); }
function showSuggestions() {
  closeSuggestions();
  const value = input.value.trim().toLowerCase();
  if (!value) return;
  const prefix = value.startsWith('/') ? value : `/${value}`;
  const matches = known.filter(command => command.name.startsWith(prefix) && command.name !== prefix);
  for (const command of matches) {
    const button = document.createElement('button');
    button.type = 'button'; button.dataset.command = command.name;
    const name = document.createElement('span'); name.textContent = command.name;
    const label = document.createElement('small'); label.textContent = command.label;
    button.append(name, label); suggestions.append(button);
  }
  suggestions.hidden = !matches.length;
}

function execute(raw: string, fromInput = false) {
  submissionFeedback();
  const value = raw.trim();
  if (!value) {
    input.value = '';
    closeSuggestions();
    if (fromInput) input.focus({ preventScroll: true });
    return;
  }
  const normalized = value.toLowerCase();
  const command = normalized.startsWith('/') ? normalized : `/${normalized}`;
  inputHistory.push(value); historyIndex = inputHistory.length; draft = '';
  input.value = ''; closeSuggestions();
  if (command === '/clear') {
    history.replaceChildren(); count = 0;
    document.querySelectorAll('.nav-command').forEach(button => button.classList.remove('is-active'));
    say('终端历史已清空。输入 /help 或点击快捷命令继续探索。');
  } else {
    count++;
    const entry = document.createElement('article');
    entry.className = 'entry entry-new'; entry.dataset.entry = command;
    const line = document.createElement('div'); line.className = 'command-line';
    line.innerHTML = '<span>visitor<span class="prompt-path">@xingyu:~</span></span><b>❯</b>';
    const commandText = document.createElement('span'); commandText.textContent = raw;
    const index = document.createElement('span'); index.className = 'entry-index'; index.textContent = String(count).padStart(3, '0');
    line.append(commandText, index); entry.append(line);
    const template = document.getElementById(`content-${command.slice(1)}`);
    if (command === '/about') {
      const about = initialAbout.cloneNode(true) as HTMLElement;
      const heading = about.querySelector('h1')!;
      const replacement = document.createElement('h2'); replacement.className = 'about-name'; replacement.innerHTML = heading.innerHTML;
      heading.replaceWith(replacement); entry.append(about);
    } else if (template instanceof HTMLTemplateElement) {
      const output = document.createElement('div'); output.className = 'output';
      output.append(template.content.cloneNode(true)); entry.append(output);
    } else {
      const output = document.createElement('div'); output.className = 'output error-output';
      const message = document.createElement('p'); message.textContent = `未找到命令「${value}」。试试下面的命令：`;
      const help = document.createElement('button'); help.type = 'button'; help.dataset.command = '/help'; help.textContent = '/help ↗';
      output.append(message, help); entry.append(output);
    }
    history.append(entry);
    document.querySelectorAll<HTMLButtonElement>('.nav-command').forEach(button => button.classList.toggle('is-active', button.dataset.command === command));
    requestAnimationFrame(() => {
      const top = entry.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop;
      scroll.scrollTo({ top: top - 12, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    say(`${command} 输出已追加至终端。可在终端历史区域阅读。`);
  }
  document.querySelector('#command-count')!.textContent = `${count} command${count === 1 ? '' : 's'}`;
  if (fromInput) input.focus({ preventScroll: true });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!composing) execute(input.value, true);
});
// Only the input row owns click-to-focus; reading and selecting output must stay undisturbed.
form.addEventListener('click', event => {
  if (!(event.target as Element).closest('button') && !window.getSelection()?.toString()) {
    input.focus({ preventScroll: true });
  }
});
input.addEventListener('compositionstart', () => { composing = true; closeSuggestions(); });
input.addEventListener('compositionend', () => { composing = false; showSuggestions(); });
form.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (!document.querySelector('.input-area')!.contains(document.activeElement)) closeSuggestions();
  });
});
document.addEventListener('click', async event => {
  const target = event.target as Element;
  const button = target.closest<HTMLButtonElement>('[data-command]');
  if (button?.dataset.command) {
    const fromSuggestion = suggestions.contains(button);
    // Pointer shortcuts on desktop return to the prompt. Touch navigation never summons a keyboard.
    const focusPrompt = fromSuggestion || (event.detail > 0 && matchMedia('(hover: hover) and (pointer: fine)').matches);
    execute(button.dataset.command, focusPrompt);
  }
  const copy = target.closest<HTMLButtonElement>('[data-copy-email]');
  if (copy) {
    try { await navigator.clipboard.writeText(profile.email); copy.textContent = '已复制'; say('邮箱地址已复制。'); }
    catch { copy.textContent = '请选中邮箱复制'; say('复制失败，请选中邮箱地址手动复制。'); }
  }
  if (!target.closest('.input-area')) closeSuggestions();
});
input.addEventListener('input', () => { historyIndex = inputHistory.length; draft = input.value; if (!composing) showSuggestions(); });
input.addEventListener('keydown', event => {
  if (event.isComposing || composing || event.keyCode === 229) return;
  if (event.key === 'Escape') closeSuggestions();
  if (event.key === 'Tab' && !event.shiftKey && input.value.trim()) {
    const value = input.value.trim().toLowerCase();
    const prefix = value.startsWith('/') ? value : `/${value}`;
    const match = known.find(command => command.name.startsWith(prefix));
    if (match && match.name !== input.value) { event.preventDefault(); input.value = match.name; closeSuggestions(); }
  }
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault(); closeSuggestions();
    if (historyIndex === inputHistory.length) draft = input.value;
    historyIndex = Math.max(0, Math.min(inputHistory.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = historyIndex === inputHistory.length ? draft : inputHistory[historyIndex];
    input.setSelectionRange(input.value.length, input.value.length);
  }
});
