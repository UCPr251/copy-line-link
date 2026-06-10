import vscode from 'vscode'
import path from 'path'

/**
 * 将文件路径转换为 vscode://file 协议链接。
 * 对路径中的特殊字符（空格、中文等）进行 encodeURIComponent 编码，
 * 但保留路径分隔符和盘符冒号。
 */
function buildFileUri(filePath: string, line: number, column?: number): string {
  // 在 Windows 上，路径可能包含反斜杠，统一转为正斜杠
  const normalized = filePath.replace(/\\/g, '/')

  // 拆分盘符（如 e:）和其余路径
  const match = normalized.match(/^([a-zA-Z]):(.+)$/)
  let encoded: string
  if (match) {
    // 盘符冒号编码为 %3A，其余路径逐段编码但保留 /
    const drive = encodeURIComponent(match[1] + ':')
    const rest = match[2]
      .split('/')
      .map(encodeURIComponent)
      .join('/')
    encoded = drive + rest
  } else {
    // 非 Windows 路径
    encoded = normalized
      .split('/')
      .map(encodeURIComponent)
      .join('/')
  }
  return `vscode://file/${encoded}:${line}${column ? `:${column}` : ''}`
}

function getEditorInfo() {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    vscode.window.showWarningMessage('没有打开的编辑器。')
    return null
  }
  return {
    filePath: editor.document.uri.fsPath,
    line: editor.selection.start.line + 1,
    column: editor.selection.start.character + 1,
  }
}

export function activate(context: vscode.ExtensionContext) {
  // 复制行链接（仅行号，不含列号）
  const copyLineCmd = vscode.commands.registerCommand(
    'copy-line-link.copyLink',
    () => {
      const info = getEditorInfo()
      if (!info) return

      const link = buildFileUri(info.filePath, info.line)
      vscode.env.clipboard.writeText(link).then(
        () =>
          vscode.window.showInformationMessage(
            `已复制行链接: ${path.basename(info.filePath)}:${info.line}`
          ),
        (err) => vscode.window.showErrorMessage(`复制失败: ${err}`)
      )
    }
  )

  // 复制行列链接（行号 + 列号）
  const copyLineColCmd = vscode.commands.registerCommand(
    'copy-line-link.copyLinkWithColumn',
    () => {
      const info = getEditorInfo()
      if (!info) return

      const link = buildFileUri(info.filePath, info.line, info.column)
      vscode.env.clipboard.writeText(link).then(
        () =>
          vscode.window.showInformationMessage(
            `已复制行列链接: ${path.basename(info.filePath)}:${info.line}:${info.column}`
          ),
        (err) => vscode.window.showErrorMessage(`复制失败: ${err}`)
      )
    }
  )

  context.subscriptions.push(copyLineCmd, copyLineColCmd)
}

export function deactivate() { }
