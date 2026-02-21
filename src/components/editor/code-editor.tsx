"use client";

import { Check, Loader2, Play, RotateCcw, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Dynamically import Monaco to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  initialCode?: string;
  language?: "javascript" | "typescript" | "python" | "sql";
  expectedOutput?: string;
  onRun?: (code: string, output: string) => void;
}

async function executeJavaScript(codeToRun: string): Promise<string> {
  const logs: string[] = [];
  // biome-ignore lint/suspicious/noConsole: We intentionally override console.log here to capture user script outputs
  const originalLog = console.log;

  // biome-ignore lint/suspicious/noConsole: Overriding console.log for simulated execution
  console.log = (...args: unknown[]): void => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };

  try {
    const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
    const fn = new AsyncFunction(codeToRun);
    await fn();
    return logs.join("\n") || "Code executed successfully (no output)";
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  } finally {
    // biome-ignore lint/suspicious/noConsole: Reverting back to original
    console.log = originalLog;
  }
}

export const CodeEditor = ({
  initialCode = "// Write your code here\n",
  language = "javascript",
  expectedOutput,
  onRun,
}: CodeEditorProps): React.JSX.Element => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const runCode = useCallback(async () => {
    setRunning(true);
    setOutput("");
    setIsCorrect(null);

    try {
      if (language === "javascript" || language === "typescript") {
        const result = await executeJavaScript(code);
        setOutput(result);

        if (expectedOutput) {
          setIsCorrect(result.trim() === expectedOutput.trim());
        }

        if (onRun) {
          onRun(code, result);
        }
      } else {
        setOutput(
          `Language "${language}" execution is not supported in browser.\nPlease test locally.`,
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setOutput(`Error: ${errorMessage}`);
      setIsCorrect(false);
    } finally {
      setRunning(false);
    }
  }, [code, language, expectedOutput, onRun]);

  const resetCode = (): void => {
    setCode(initialCode);
    setOutput("");
    setIsCorrect(null);
  };

  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{language}</Badge>
          {isCorrect !== null && (
            <Badge variant={isCorrect ? "success" : "destructive"}>
              {isCorrect ? (
                <>
                  <Check className="h-3 w-3 mr-1" /> Correct
                </>
              ) : (
                <>
                  <X className="h-3 w-3 mr-1" /> Try Again
                </>
              )}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={resetCode}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={runCode}
            disabled={running}
            className="gap-2"
          >
            {running ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="h-[300px]">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Output */}
      {output ? (
        <div className="border-t border-slate-800">
          <div className="px-4 py-2 bg-slate-800/50 text-xs font-medium text-slate-400">
            Output
          </div>
          <pre
            className={`p-4 text-sm overflow-x-auto ${
              isCorrect === false ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {output}
          </pre>
        </div>
      ) : null}

      {/* Expected Output (if provided) */}
      {expectedOutput ? (
        <div className="border-t border-slate-800">
          <div className="px-4 py-2 bg-slate-800/50 text-xs font-medium text-slate-400">
            Expected Output
          </div>
          <pre className="p-4 text-sm text-slate-400 overflow-x-auto">
            {expectedOutput}
          </pre>
        </div>
      ) : null}
    </div>
  );
};
