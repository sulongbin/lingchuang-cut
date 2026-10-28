const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

test('packed installer installs both hosts, includes assets and protects existing settings', () => {
  const root = path.resolve(__dirname, '..');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cut-installer-test-'));
  const npm = process.env.npm_execpath;
  assert.ok(npm, 'Run via npm test so npm_execpath identifies the npm CLI');
  const run = (args, cwd, env = process.env) => spawnSync(process.execPath, [npm, ...args], {
    cwd, env, encoding: 'utf8', timeout: 60000,
  });
  try {
    const pack = run(['pack', '--json', '--pack-destination', temp], root);
    assert.equal(pack.status, 0, pack.stderr);
    const manifest = JSON.parse(pack.stdout)[0];
    const archive = path.join(temp, manifest.filename);
    assert.ok(!manifest.files.some(f => /(^|\/)(local-config\.json|\.runtime|node_modules|\.git)(\/|$)/.test(f.path)));
    const env = { ...process.env, USERPROFILE: temp, HOME: temp,
      npm_config_cache: path.join(temp, 'cache'), npm_config_update_notifier: 'false' };
    const digest = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
    for (const app of ['workbuddy', 'codex']) {
      const args = ['exec', '--offline', '--yes', `--package=${archive}`, '--', 'lingchuang-cut-install', '--app', app];
      const installed = run(args, temp, env);
      assert.equal(installed.status, 0, installed.stdout + installed.stderr);
      const target = path.join(temp, `.${app}`, 'skills', 'lingchuang-cut');
      for (const file of manifest.files) {
        assert.equal(digest(path.join(target, file.path)), digest(path.join(root, file.path)), file.path);
      }
      for (const m of JSON.parse(fs.readFileSync(path.join(target, 'modules.json')))) {
        assert.equal(digest(path.join(target, m.archive)), m.sha256);
      }
      for (const t of JSON.parse(fs.readFileSync(path.join(target, 'templates.json')))) {
        assert.equal(digest(path.join(target, t.file)), t.sha256);
      }
      const config = path.join(target, 'local-config.json');
      fs.writeFileSync(config, '{"asset_library":"member-selected-folder"}');
      const before = fs.readFileSync(config, 'utf8');
      const repeated = run(args, temp, env);
      assert.equal(repeated.status, 1, repeated.stdout + repeated.stderr);
      assert.equal(fs.readFileSync(config, 'utf8'), before);
    }
    const invalid = spawnSync(process.execPath, [path.join(root, 'bin/install.cjs'), '--app', 'unknown'], { env, encoding: 'utf8' });
    assert.equal(invalid.status, 2);
  } finally {
    const resolved = path.resolve(temp);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.ok(path.basename(resolved).startsWith('cut-installer-test-'));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});
