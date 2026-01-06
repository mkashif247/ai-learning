'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Check, X, Loader2 } from 'lucide-react';

// Dynamically import Monaco to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeEditorProps {
  initialCode?: string;
  language?: 'javascript' | 'typescript' | 'python' | 'sql';
  expectedOutput?: string;
  onRun?: (code: string, output: string) => void;
}

export const CodeEditor = ({
  initialCode = '// Write your code here\n',
  language = 'javascript',
  expectedOutput,
  onRun,
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const runCode = useCallback(async () => {
    setRunning(true);
    setOutput('');
    setIsCorrect(null);

    try {
      // For JavaScript, we can run in browser
      if (language === 'javascript' || language === 'typescript') {
        const logs: string[] = [];
        const originalLog = console.log;

        // Override console.log to capture output
        console.log = (...args: unknown[]) => {
          logs.push(args.map((arg) => String(arg)).join(' '));
        };

        try {
          // Create a safe execution context
          const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
          const fn = new AsyncFunction(code);
          await fn();

          const result = logs.join('\n');
          setOutput(result || 'Code executed successfully (no output)');

          if (expectedOutput) {
            const correct = result.trim() === expectedOutput.trim();
            setIsCorrect(correct);
          }

          if (onRun) {
            onRun(code, result);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          setOutput(`Error: ${errorMessage}`);
          setIsCorrect(false);
        } finally {
          console.log = originalLog;
        }
      } else {
        setOutput(`Language "${language}" execution is not supported in browser.\nPlease test locally.`);
      }
    } finally {
      setRunning(false);
    }
  }, [code, language, expectedOutput, onRun]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setIsCorrect(null);
  };

  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{language}</Badge>
          {isCorrect !== null && (
            <Badge variant={isCorrect ? 'success' : 'destructive'}>
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
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-slate-800">
          <div className="px-4 py-2 bg-slate-800/50 text-xs font-medium text-slate-400">
            Output
          </div>
          <pre
            className={`p-4 text-sm overflow-x-auto ${
              isCorrect === false ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {output}
          </pre>
        </div>
      )}

      {/* Expected Output (if provided) */}
      {expectedOutput && (
        <div className="border-t border-slate-800">
          <div className="px-4 py-2 bg-slate-800/50 text-xs font-medium text-slate-400">
            Expected Output
          </div>
          <pre className="p-4 text-sm text-slate-400 overflow-x-auto">{expectedOutput}</pre>
        </div>
      )}
    </div>
  );
};
