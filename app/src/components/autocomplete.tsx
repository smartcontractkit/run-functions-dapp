'use client'

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from '@/components/ui/command'
import Loader from '@/components/loading-spinner'
import { Command as CommandPrimitive } from 'cmdk'
import { useState, useRef, useCallback, type KeyboardEvent } from 'react'

export type Option = Record<'value' | 'label', string> & Record<string, string>

type AutoCompleteProps = {
  options: Option[]
  inputValue: string
  setInputValue: (value: string) => void
  value?: Option
  onValueChange?: (value: Option) => void
  onInputChange?: (value: string) => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
}

const AutoComplete = ({
  options,
  placeholder,
  value,
  onValueChange,
  onInputChange,
  disabled,
  isLoading = false,
  inputValue,
  setInputValue,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<Option>(value as Option)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (!input) {
        return
      }

      if (!isOpen) {
        setOpen(true)
      }

      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        )
        if (optionToSelect) {
          setSelected(optionToSelect)
          onValueChange?.(optionToSelect)
        }
      }

      if (event.key === 'Escape') {
        input.blur()
      }
    },
    [isOpen, options, onValueChange],
  )

  const handleBlur = useCallback(() => {
    setOpen(false)
    setInputValue(selected?.label)
  }, [selected, setInputValue])

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label)

      setSelected(selectedOption)
      onValueChange?.(selectedOption)

      setTimeout(() => {
        inputRef?.current?.blur()
      }, 0)
    },
    [onValueChange, setInputValue],
  )

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={(value) => {
            setInputValue(value)
            onInputChange?.(value)
          }}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="my-2 bg-[#181D29]"
        />
      </div>
      <div className="relative mt-1">
        {isOpen ? (
          <div className="absolute top-0 z-10 w-full rounded-md border border-input bg-[#181D29] outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList>
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="flex items-center justify-center p-2">
                    <Loader />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup>
                  {options.map((option) => {
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onMouseDown={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className="flex w-full items-center gap-2"
                      >
                        {option.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  )
}

export default AutoComplete
