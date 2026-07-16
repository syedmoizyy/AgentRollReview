type LogContext = Record<string, unknown>;

function write(level: "info" | "error", event: string, context: LogContext = {}) {
  const record = { level, event, timestamp: new Date().toISOString(), ...context };
  const output = JSON.stringify(record);
  if (level === "error") console.error(output); else console.info(output);
}

export const logger = {
  info: (event: string, context?: LogContext) => write("info", event, context),
  error: (event: string, context?: LogContext) => write("error", event, context),
};
