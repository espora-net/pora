import * as React from "react"
import { type Editor } from "@tiptap/react"

import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { SparklesIcon } from "@/components/tiptap-icons/sparkles-icon"
import { generateCompletion, type LLMOptions } from "@/lib/llm-service"

export interface LLMButtonProps extends Omit<ButtonProps, "type"> {
  editor?: Editor | null
  options: LLMOptions
  prompt?: string
}

export const LLMButton = React.forwardRef<HTMLButtonElement, LLMButtonProps>(
  (
    {
      editor: providedEditor,
      options,
      prompt,
      className = "",
      disabled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const editor = useTiptapEditor(providedEditor)

    const handleClick = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)

        if (!e.defaultPrevented && editor && !disabled) {
          const text =
            prompt ||
            editor.state.doc.textBetween(0, editor.state.doc.content.size, "\n")
          try {
            const completion = await generateCompletion(text, options)
            editor.commands.insertContent(completion)
          } catch (error) {
            console.error("LLM request failed:", error)
          }
        }
      },
      [onClick, editor, disabled, options, prompt]
    )

    if (!editor || !editor.isEditable) {
      return null
    }

    return (
      <Button
        type="button"
        className={className.trim()}
        disabled={disabled}
        data-style="ghost"
        role="button"
        tabIndex={-1}
        aria-label="AI"
        tooltip="AI"
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children || <SparklesIcon className="tiptap-button-icon" />}
      </Button>
    )
  }
)

LLMButton.displayName = "LLMButton"
