#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--app' || !['workbuddy','codex'].includes(args[1])) {
  console.error('Usage: lingchuang-cut-install --app workbuddy|codex'); process.exit(2);
}
const root = path.resolve(__dirname, '..');
const target = path.join(os.homedir(), args[1] === 'workbuddy' ? '.workbuddy' : '.codex', 'skills', 'lingchuang-cut');
if (fs.existsSync(target)) { console.error(`技能目录已存在，未覆盖：${target}。请先备份，再手动更新。`); process.exit(1); }
if (!fs.existsSync(path.join(root, 'SKILL.md'))) { console.error('安装包缺少 SKILL.md'); process.exit(1); }
fs.mkdirSync(path.dirname(target), {recursive:true});
fs.cpSync(root, target, {recursive:true, errorOnExist:true, filter: (p) => !['node_modules','.git','local-config.json','.runtime'].includes(path.basename(p))});
console.log(`已安装至 ${target}。请重启应用或新建对话并检查技能识别。首次使用时请选择自己的素材库。`);
