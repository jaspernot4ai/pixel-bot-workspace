# at-scheduler skill

使用 `at` 命令設定一次性排程，透過 `openclaw message send` 發送 Discord 訊息通知。

## 前置需求

- `at` 命令可用（macOS 內建）
- `openclaw` 已安裝並可執行
- Discord 頻道 ID 已知道

## 使用方式

### 基本語法

```bash
at <時間> << 'EOF'
/opt/homebrew/bin/openclaw message send --channel discord --target <頻道ID> --message "<訊息內容>" --account <帳號>
EOF
```

### 時間格式

- `at 10:00 March 22 2026` — 特定日期和時間
- `at 10:00` — 今天 10:00（若已過則明天）
- `at noon` — 中午
- `at midnight` — 午夜

### 範例：設定 12:00 排程

```bash
at 12:00 March 22 2026 << 'EOF'
/opt/homebrew/bin/openclaw message send --channel discord --target 1484968663953047602 --message "🔄 [更新] 像素風格介面 - 預計完成：12:00" --account backend
EOF
```

### 確認排程

```bash
atq
```

輸出範例：
```
3	Sun Mar 22 12:00:00 2026
```

### 刪除排程

```bash
atrm <job編號>
```

例如刪除 job 3：
```bash
atrm 3
```

## 常用排程範例

### 工作進度回報

```bash
# 設定 10:00 回報
at 10:00 << 'EOF'
/opt/homebrew/bin/openclaw message send --channel discord --target 1484968663953047602 --message "🔄 [更新] 任務名稱 - 預計完成：10:00" --account frontend
EOF
```

### 鬧鐘提醒

```bash
# 設定 15 分鐘後提醒
at now + 15 minutes << 'EOF'
/opt/homebrew/bin/openclaw message send --channel discord --target 1484968663953047602 --message "⏰ 提醒：15分鐘已過" --account frontend
EOF
```

## 限制

- `at` 只能執行一次，若需要循環排程可使用 `cron`
- 訊息內容需用引號包起來
- heredoc 的 `EOF` 前面不能有空白
